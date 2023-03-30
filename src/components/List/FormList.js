import React, { useEffect, useState } from "react";
import { Col, Dropdown, Modal, Row } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../Form/FormInput";
import {
  deleteUser,
  getUserById,
  getUsers,
} from "../../Redux/action/TestActions";
import { Toast } from "react-bootstrap";
import ToasterCom from "../Toast/Toast";

export default function ReduxForm() {
  const dispatch = useDispatch();

  //sorting

  const [title, setTitle] = useState("name");
  const [order, setOrder] = useState("Sort By");

  const [isLoading, setLoading] = useState(true);

  const paginationClick = (activeNum) => {
    dispatch(getUsers(activeNum, "", "", ""));
    setActiveNum(activeNum);
  };

  const [activeNum, setActiveNum] = useState(1);

  let active = activeNum;
  let items = [];
  for (let activeNum = 1; activeNum <= 5; activeNum++) {
    items.push(
      <Pagination.Item
        key={activeNum}
        onClick={(e) => {
          e.preventDefault();
          paginationClick(activeNum);
        }}
        active={activeNum === active}
      >
        {activeNum}
      </Pagination.Item>
    );
  }
  //end

  const user = useSelector((state) => state.Test.users);

  const loading = useSelector((state) => state.Test.loading);

  const userAddSuccess = useSelector((state) => state.Test.userAddSuccess);

  const userAddError = useSelector((state) => state.Test.userAddError);

  const deleteMessage = useSelector((state) => state.Test.deleteMessage);

  console.log(userAddSuccess);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  // delete modal
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const handleCloseDeleteBox = () => setShowDeleteBox(false);
  const handleShowDeleteBox = () => setShowDeleteBox(true);

  // form modal
  const [show, setShow] = useState(false);
  const [myStyle, setMyStyle] = useState();
  const handleToastClose = () => {
    setMyStyle({ display: "none" });
  };

  //search field

  const handleInputChange = (e) => {
    dispatch(getUsers(activeNum, e.target.value, "", ""));
  };

  //end

  // handle update

  const handleUpdateUser = async (id) => {
    try {
      setLoading(true);
      await dispatch(getUserById(id));
      setShow(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="formikForm">
        <FormInput name={show} />
        <div>
          {/* dropdown shorting */}
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sort By
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={(e) => {
                  e.preventDefault();
                  setTitle("name");
                  dispatch(getUsers(1, "", "", title));
                  console.log(title);
                }}
                href="/"
              >
                Name
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  e.preventDefault();

                  setTitle("Email");
                  dispatch(getUsers(1, "", "", title));
                }}
                href="/"
              >
                Email
              </Dropdown.Item>

              <Dropdown.Item
                onClick={(e) => {
                  e.preventDefault();
                  setOrder("asc");
                  dispatch(getUsers(1, "", order, ""));
                }}
                href="/"
              >
                Ascending
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  e.preventDefault();
                  setOrder("desc");
                  dispatch(getUsers(1, "", order, ""));
                }}
                href="/"
              >
                Descending
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="serachInput">
        <input
          placeholder="Search..."
          type="text"
          name="text"
          onChange={handleInputChange}
        />
      </div>

      {isLoading ? (
        <div class="loadera">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <div>{null}</div>
      )}

      <div>
        {user &&
          user.map((item, index) => (
            <div key={index} className="items">
              <p>{item.name}</p>
              <p>{item.Email}</p>
              <p>{item.Phone}</p>
              <p>{item.Country}</p>
              <p>{item.ZipCode}</p>
              <p>{item.CountryCode}</p>
              <p>{item.Address}</p>
              <div className="item">
                <button
                  className="item_button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdateUser(item.id);
                  }}
                >
                  Edit
                </button>{" "}
                <button
                  className="item_button"
                  onClick={() => handleShowDeleteBox()}
                >
                  Delete
                </button>
              </div>
              <Modal show={showDeleteBox} onHide={handleCloseDeleteBox}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you really want to delete item from your lists!
                </Modal.Body>
                <Modal.Footer>
                  <button
                    className="item_button"
                    onClick={() => {
                      dispatch(deleteUser(item.id));
                      handleCloseDeleteBox();
                      setShowToast(true);
                    }}
                  >
                    Delete
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          ))}
      </div>

      <div className="pagination">
        <Pagination size="lg">{items}</Pagination>
      </div>

      {userAddSuccess && (
        <Toast
          style={myStyle}
          className="toast"
          bg="success"
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
        >
          <Toast.Body>{userAddSuccess}</Toast.Body>
        </Toast>
      )}

      {/* error  */}
      {userAddError ? (
        <Toast style={myStyle} className="toast" bg="Danger">
          <Toast.Header
            closeButton={true}
            onClick={handleToastClose}
          ></Toast.Header>
          <Toast.Body style={{ background: "red" }}>{userAddError}</Toast.Body>
        </Toast>
      ) : (
        <Toast style={{ display: "none" }} className="toast" bg="success">
          <Toast.Header closeButton={false}></Toast.Header>
          <Toast.Body>{userAddError}</Toast.Body>
        </Toast>
      )}

      {/* delete */}

      {deleteMessage && (
        <Row>
          <Col xs={6}>
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={3000}
              autohide
              style={{ background: "red" }}
            >
              <Toast.Body>{deleteMessage}</Toast.Body>
            </Toast>
          </Col>
        </Row>
      )}

      {/* <ToasterCom /> */}
    </div>
  );
}
