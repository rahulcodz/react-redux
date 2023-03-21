import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  deleteUser,
  getUserById,
  postUser,
  updateUser,
} from "./store/action/TestActions";

export default function ReduxForm({ match }) {
  const user = useSelector((state) => state.Test.users);
  const currentUserData = useSelector((state) => state.Test.currentUser);

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    Phone: Yup.string().required("Phone is required"),
    Email: Yup.string().email("Invalid email").required("Email Required"),
    CountryCode: Yup.string().required("Country Code Required!"),
    ZipCode: Yup.string().required("Zip Code Required"),
    Address: Yup.string().required("Address Required"),
    Country: Yup.string().required("Country Name Required"),
  });

  const dispatch = useDispatch();
  console.log(currentUserData);
  // delete modal
  const [showDeleteBox, setShowDeleteBox] = useState(false);

  const handleCloseDeleteBox = () => setShowDeleteBox(false);
  const handleShowDeleteBox = () => setShowDeleteBox(true);
  // const dispatchDelete = useDispatch();

  // form modal
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    dispatch({
      type: "REMOVE_CURRENT_USER",
      payload: null,
    });
  };

  // edit or upate

  // const { userId } = match.params;

  // const singleUser = useSelector((state) =>
  //   state.singleUser.find((user) => user.id === userId)
  // );

  // console.log(singleUser);

  // const [singleUser, setSingleUser] = useState(null);
  // const singleUserData = useSelector((state) => state.Test.singleUser);

  // useEffect(() => {
  //   setSingleUser(singleUserData[id]);
  // }, [singleUserData, id]);

  // console.log(singleUser);

  // handle create

  const handleCreateItem = async (values) => {
    try {
      await dispatch(postUser(values));
      console.log(values, "create user");
    } catch (error) {
      console.error(error);
    }
  };

  // handle update
  const handleUpdateItem = async (values, id) => {
    try {
      await dispatch(updateUser(id, values));
      console.log(values, "update");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      await dispatch(getUserById(id));
      setShow(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="formikForm">
        <div>
          <Button
            variant="secondary"
            className="button-89"
            onClick={handleShow}
          >
            Create User
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {currentUserData?.id ? "Edit Item" : "Add Item"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                initialValues={{
                  name: currentUserData?.name || "",
                  Phone: currentUserData?.Phone || "",
                  Email: currentUserData?.Email || "",
                  CountryCode: currentUserData?.CountryCode || "",
                  Address: currentUserData?.Address || "",
                  Country: currentUserData?.Country || "",
                  ZipCode: currentUserData?.ZipCode || "",
                }}
                enableReinitialize
                validationSchema={SignupSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  // try {
                  //   await dispatch(postUser(values));
                  //   setSubmitting(false);
                  //   // console.log(values);
                  // } catch (error) {
                  //   console.error(error);
                  //   setSubmitting(false);
                  // }
                  if (!currentUserData?.id) {
                    handleCreateItem(values);
                  }
                  if (currentUserData?.id) {
                    handleUpdateItem(currentUserData.id, values);
                  }
                  setSubmitting(false);

                  // const {
                  //   Address,
                  //   Country,
                  //   CountryCode,
                  //   Email,
                  //   Phone,
                  //   ZipCode,
                  //   name,
                  // } = values;
                  // console.log(values);

                  handleClose();
                }}
              >
                {({ errors, touched, values, handleChange }) => (
                  <Form className="ToDoForm">
                    <Field
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    {errors.name && touched.name ? (
                      <div>{errors.name}</div>
                    ) : null}

                    <Field
                      name="Phone"
                      placeholder="Phone"
                      value={values.Phone}
                      onChange={handleChange}
                    />
                    {errors.Phone && touched.Phone ? (
                      <div>{errors.Phone}</div>
                    ) : null}
                    <Field
                      name="Email"
                      type="email"
                      placeholder="Email"
                      value={values.Email}
                      onChange={handleChange}
                    />
                    {errors.Email && touched.Email ? (
                      <div>{errors.Email}</div>
                    ) : null}

                    <Field
                      name="Address"
                      type="text"
                      placeholder="Address"
                      value={values.Address}
                      onChange={handleChange}
                    />
                    {errors.Address && touched.Address ? (
                      <div>{errors.Address}</div>
                    ) : null}

                    <Field
                      name="CountryCode"
                      type="text"
                      placeholder="Country Code"
                      value={values.CountryCode}
                      onChange={handleChange}
                    />
                    {errors.CountryCode && touched.CountryCode ? (
                      <div>{errors.CountryCode}</div>
                    ) : null}

                    <Field
                      name="Country"
                      type="text"
                      placeholder="Country"
                      value={values.Country}
                      onChange={handleChange}
                    />
                    {errors.Country && touched.Country ? (
                      <div>{errors.Country}</div>
                    ) : null}

                    <Field
                      name="ZipCode"
                      type="text"
                      placeholder="ZipCode"
                      value={values.ZipCode}
                      onChange={handleChange}
                    />
                    {errors.ZipCode && touched.ZipCode ? (
                      <div>{errors.ZipCode}</div>
                    ) : null}

                    <div className="form_button">
                      <button className="button-70" type="submit">
                        {currentUserData?.id ? "Edit" : "ADD"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Modal.Body>
          </Modal>
        </div>
      </div>
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
                onClick={() => {
                  handleUpdateUser(item.id);
                }}
              >
                Edit
              </button>{" "}
              <button className="item_button" onClick={handleShowDeleteBox}>
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
                  }}
                >
                  Delete
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        ))}
    </div>
  );
}
