import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import Header from "../Header.jsx";
import { checkSignUp } from "../../asyncFunctions/signUpAPICalls.js";

const EMAIL_REGEX =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function SignUp() {
  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(2, "Name must be 2 characters or more.")
        .max(20, "Name must be 20 characters or less.")
        .required("Name is required"),
      username: Yup.string().matches(USER_REGEX, "Username is invalid"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .matches(EMAIL_REGEX, "Invalid email address"),
      password: Yup.string()
        .min(8, "Password must be 8 characters or more.")
        .max(24, "Password must be 24 characters or less.")
        .required("Password is required")
        .matches(
          PWD_REGEX,
          "Password must contain at least a lower case letter, a upper case letter, a number and a special character"
        ),
    }),

    onSubmit: async (values) => {
      const processSignUp = await checkSignUp(values);
      if (processSignUp === true) {
        navigate("/login");
      } else {
        alert("User already exists.");
      }
    },
  });

  return (
    <>
      <Header />
      <div className="h-screen v-screen flex flex-col items-center mt-12 px-6 mx-auto lg:py-0">
        <div className="h-max w-full secondary-bg primary rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-1 space-y-1 md:space-y-6 sm:p-5">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Create an account
            </h1>
            <form
              className="space-y-2 md:space-y-4"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className={`block mb-2 text-sm font-medium ${
                    formik.touched.name && formik.errors.name
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : "Your Name"}
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Full name"
                  required=""
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className={`block mb-2 text-sm font-medium ${
                    formik.touched.username && formik.errors.username
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {formik.touched.username && formik.errors.username
                    ? formik.errors.username
                    : "Your Username"}
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  required=""
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
              </div>
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
                    formik.touched.password && formik.errors.password
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : "Your password"}
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
              <button
                type="submit"
                className="w-full primary-bg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign Up
              </button>
              <p className="text-sm font-light">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
