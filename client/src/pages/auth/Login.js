import React, { useState } from "react";
import "./Login.css";
import * as Yup from "yup";
import { Formik, Form } from "formik";
// import { formatMs } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { updateUser } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import Message from "../../components/Message";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(false);
  return (
    <div className="login">
      {message && (
        <Message message="Either email or password does not match." />
      )}
      <div className="login__container">
        <h2 className="login__title">Log In </h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            auth
              .signInWithEmailAndPassword(values.email, values.password)
              .then((auth) => {
                dispatch(updateUser(auth));

                return history.push("/");
              })
              .catch((error) => setMessage(true));

            setTimeout(() => {
              resetForm();
              setSubmitting(false);
              setMessage(false);
            }, 2000);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required("Required")
              .matches(/([^\s@]+@[^\s@]+\.[^\s@]{2,})/, "Invalid email format"),
            password: Yup.string()
              .required("Required")
              .min(8, "Password must be 8 characters long.")
              .matches(/(?=.*[0-9])/, "Password must contain a number."),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;

            return (
              <>
                <Form className="login__form" onSubmit={handleSubmit}>
                  <label>Email</label>
                  <input
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                    placeholder="Enter email address..."
                  />
                  {errors.email && touched.email && (
                    <div className="errors-feedback">{errors.email}</div>
                  )}
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Enter password.."
                  />
                  {errors.password && touched.password && (
                    <div className="errors-feedback">{errors.password}</div>
                  )}
                  <button type="submit" disabled={isSubmitting}>
                    Log In
                  </button>
                </Form>
              </>
            );
          }}
        </Formik>
        <p className="login__footerText">
          Not a member? <Link to="/register"> Register now</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
