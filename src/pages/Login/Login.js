import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const DisplayingErrorMessagesSchema = Yup.object().shape({
  password: Yup.string().required("Password Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
});

function Login() {
  const [loginErr, setLoginErr] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("myData");
    const loggedData = localStorage.getItem("login");

    if (storedData) {
      setData(JSON.parse(storedData));
    }
    if (loggedData) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="loginCon">
      <div className="loginContainer">
        <h1>Login</h1>
        <Formik
          initialValues={{
            password: "",
            email: "",
          }}
          validationSchema={DisplayingErrorMessagesSchema}
          onSubmit={(values) => {
            if (
              values.password === data.password &&
              values.email === data.email
            ) {
              localStorage.setItem(
                "login",
                JSON.stringify({
                  login: true,
                })
              );
              navigate("/");
            } else {
              setLoginErr("Incorrect Email or Password!");
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="email" placeholder="Email" />

              {touched.email && errors.email && <div>{errors.email}</div>}

              <Field name="password" type="password" placeholder="Password" />

              {touched.password && errors.password && (
                <div>{errors.password}</div>
              )}
              <button className="loginSubmit" type="submit">
                Login
              </button>
              <span style={{ color: "red", margin: "auto" }}>{loginErr}</span>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
