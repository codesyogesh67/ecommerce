import React from "react";
import "./Register.css";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import { Formik } from "formik";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/auth/authSlice";

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="register">
      <div className="register__container">
        <h2 className="register__title">Sign Up </h2>
        <Formik
          initialValues={{ name: "", username: "", email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            auth
              .createUserWithEmailAndPassword(values.email, values.password)
              .then((authUser) => {
                history.push("/");
                setSubmitting(false);
                dispatch(updateUser(authUser));
              });
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
              <form className="register__form" onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                  name="name"
                  type="name"
                  onChange={handleChange}
                  value={values.name}
                />
                <label>Username</label>
                <input
                  name="username"
                  type="name"
                  onChange={handleChange}
                  value={values.username}
                />
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <div className="errors-feedback">{errors.email}</div>
                )}
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email && "error"}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <div className="errors-feedback">{errors.password}</div>
                )}
                <button
                  type="submit"
                  className="register__button"
                  disabled={isSubmitting}
                >
                  Sign Up
                </button>
              </form>
            );
          }}
        </Formik>

        <p className="register__footerText">
          Already a member? <Link to="/login">Log in now</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
