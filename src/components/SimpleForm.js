import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { useState, useEffect } from "react";
import { getItems, getItem, createItem, updateItem, deleteItem } from "../api";

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [values, setValues] = useState({
    name: "",
    description: "",
    Country: "",
    Address: "",
    ZipCode: "",
    Email: "",
    Phone: "",
    CountryCode: "",
  });

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setLoading(false);
      setItems(items);
    };
    fetchItems();
  }, []);

  const handleSelectItem = async (id) => {
    const item = await getItem(id);
    setSelectedItem(item);
    setValues(item);
  };

  const handleCreateItem = async (event) => {
    try {
      setLoading(true);
      const item = await createItem(values);
      setItems([...items, item]);
      setValues({
        name: "",
        description: "",
        Country: "",
        Address: "",
        ZipCode: "",
        Email: "",
        Phone: "",
        CountryCode: "",
      });
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (event) => {
    try {
      setLoading(true);
      const item = await updateItem(selectedItem.id, values);
      setItems(items.map((i) => (i.id === item.id ? item : i)));
      setSelectedItem(null);
      setValues({
        name: "",
        description: "",
        Country: "",
        Address: "",
        ZipCode: "",
        Email: "",
        Phone: "",
        CountryCode: "",
      });
      handleClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    setItems(items.filter((i) => i.id !== id));
    handleCloseDeleteBox();
  };

  const handleChange = (values) => {
    const { name, value } = values.target;
    setValues({ ...values, [name]: value });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setValues({
      name: "",
      description: "",
      Country: "",
      Address: "",
      ZipCode: "",
      Email: "",
      Phone: "",
      CountryCode: "",
    });
  };
  const handleShow = () => setShow(true);

  //formik
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    Phone: Yup.string().required("Phone is required"),
    Email: Yup.string().email("Invalid email").required("Email Required"),
    CountryCode: Yup.string().required("Country Code Required!"),
    ZipCode: Yup.string().required("Zip Code Required"),
    Address: Yup.string().required("Address Required"),
    Country: Yup.string().required("Country Name Required"),
  });

  // delete modal
  const [showDeleteBox, setShowDeleteBox] = useState(false);

  const handleCloseDeleteBox = () => setShowDeleteBox(false);
  const handleShowDeleteBox = () => setShowDeleteBox(true);

  const handleSubmit = (values) => {
    if (selectedItem) {
      handleUpdateItem();
    } else {
      handleCreateItem();
    }
    handleChange(values);
  };

  return (
    <div>
      {isLoading ? <div className="loader"></div> : <div>{null}</div>}

      <div>
        <Button variant="secondary" className="button-89" onClick={handleShow}>
          Create User
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem ? "Edit Item" : "Add Item"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                name: "",
                Phone: "",
                Email: "",
                CountryCode: "",
                Address: "",
                Country: "",
                ZipCode: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                handleSubmit();
                // same shape as initial values
                console.log(values);
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
                      {selectedItem ? "Update" : "Add"}
                    </button>
                    {selectedItem && (
                      <button
                        className="button-70"
                        onClick={() => {
                          handleClose();
                          setSelectedItem(null);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
            {isLoading ? <div className="loader"></div> : <div>{null}</div>}
          </Modal.Body>
        </Modal>
      </div>
      <h1>Items</h1>
      <div>
        {items.map((item) => (
          <div className="items" key={item.id}>
            <div className="item">{item.name} </div>
            <div className="item">{item.Phone}</div>
            <div className="item">{item.Email}</div>
            <div className="item">{item.ZipCode}</div>
            <div className="item">{item.CountryCode}</div>
            <div className="item">{item.Address}</div>
            <div className="item">{item.Country}</div>

            <div className="item">
              <button
                className="item_button"
                onClick={() => {
                  handleSelectItem(item.id);
                  handleShow();
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
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
