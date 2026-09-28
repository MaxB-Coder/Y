import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { DEMO_ACCOUNT } from "../../demo/store.js";

import Header from "../Header.jsx";
import { checkLogin } from "../../asyncFunctions/loginAPICalls.js";
import useAuth from "../../hooks/useAuth.js";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logIn = async (values) => {
    const processLogin = await checkLogin(values);
    if (processLogin.login?.user?.length) {
      const username = processLogin.login.user[0].username;
      setAuth({
        email: values.email,
        username: username,
      });
      // Add a user check on each page (useEffect) will set the login state.
      // localStorage.setItem("user", username);
      navigate("/");
    } else {
      alert("Incorrect email or password, or the account does not exist.");
      navigate("/login");
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be 8 characters or more.")
        .max(24, "Password must be 24 characters or less.")
        .required("Password is required")
        .matches(
          PWD_REGEX,
          "Password must contain at least a lower case letter, a upper case letter, a number and a special character"
        ),
    }),

    onSubmit: (values) => logIn(values),
  });

  return (
    <>
      <Header />
      <div className="h-screen v-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full secondary-bg primary rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-bold tracking-tight">
              Welcome back
            </h1>
            {import.meta.env.VITE_DEMO === "true" && (
              <>
                {/* Visitors to the portfolio demo can look around without signing up */}
                <button
                  type="button"
                  className="w-full tertiary-bg secondary focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => logIn(DEMO_ACCOUNT)}
                >
                  Try the demo account
                </button>
                <p className="text-center text-xs">or log in with your email</p>
              </>
            )}
            <form
              aria-label="form"
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium ${
                    formik.touched.email && formik.errors.email
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : "Your Email"}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-medium ${
                    formik.touched.email && formik.errors.email
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : "Your Password"}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>
              <input
                type="submit"
                className="w-full primary-bg secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                value="Log in"
              />
              <p className="text-sm font-light">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
