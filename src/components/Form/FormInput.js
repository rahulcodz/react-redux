import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  postUser,
  toastAction,
  updateUser,
} from "../../Redux/action/TestActions";
import { useNavigate } from "react-router-dom";

export default function ReduxForm(props) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

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

  useEffect(() => {
    setShow(props.name);
  }, [props.name]);

  //end

  const handleCreateItem = async (values) => {
    try {
      setLoading(true);
      await dispatch(postUser(values));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // handle update
  const handleUpdateItem = async (values, id) => {
    try {
      await dispatch(updateUser(id, values));
      dispatch(toastAction("string from update user"));
      // console.log(values, "update");
    } catch (error) {
      console.error(error);
    }
  };

  //logout
  const navigate = useNavigate();

  const [loggedData, setLoggedData] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("login");

    const logginData = localStorage.getItem("login");
    setLoggedData(JSON.parse(logginData));
    navigate("/login");
  };

  return (
    <div>
      <div className="formikForm">
        <div>
          <div className="actions">
            <button className="button-89" onClick={handleShow}>
              Create User
            </button>

            <button className="button-89" onClick={handleLogout}>
              Logout
            </button>
          </div>

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
                    {isLoading ? (
                      <div className="loader"></div>
                    ) : (
                      <div>{null}</div>
                    )}

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

      <div className="toasters"></div>
    </div>
  );
}
