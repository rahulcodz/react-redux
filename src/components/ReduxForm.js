import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { postUser } from "./store/action/TestActions";

export default function ReduxForm() {
  const user = useSelector((state) => state.Test.users);

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
  console.log(user, "sdsfhjh");
  return (
    <div>
      <div className="formikForm">
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
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await dispatch(postUser(values));
              setSubmitting(false);
              console.log(values);
            } catch (error) {
              console.error(error);
              setSubmitting(false);
            }
            // const {
            //   Address,
            //   Country,
            //   CountryCode,
            //   Email,
            //   Phone,
            //   ZipCode,
            //   name,
            // } = values;
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
              {errors.name && touched.name ? <div>{errors.name}</div> : null}

              <Field
                name="Phone"
                placeholder="Phone"
                value={values.Phone}
                onChange={handleChange}
              />
              {errors.Phone && touched.Phone ? <div>{errors.Phone}</div> : null}
              <Field
                name="Email"
                type="email"
                placeholder="Email"
                value={values.Email}
                onChange={handleChange}
              />
              {errors.Email && touched.Email ? <div>{errors.Email}</div> : null}

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
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {user &&
        user.map((item, index) => (
          <div key={index} className="items">
            <p>{item.name}</p>
            <p>{item.Email}</p>
            <p>{item.Phone}</p>
            <p>{item.Country}</p>
            <p>{item.ZipCode}</p>
          </div>
        ))}
    </div>
  );
}
