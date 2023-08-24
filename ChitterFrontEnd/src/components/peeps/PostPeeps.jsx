import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { postPeep } from "../../asyncFunctions/peepAPICalls";
import useAuth from "../../hooks/useAuth.js";

function PostPeeps() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      $date: "",
      message: "",
    },

    validationSchema: Yup.object().shape({
      message: Yup.string().required("Message is required"),
    }),

    onSubmit: async (values) => {
      values.username = auth.username;
      values.$date = new Date();
      const postPeepResponse = await postPeep(values);
      
      window.location.reload(true);
    },
  });

  return (
    <>
      <footer className="fixed bottom-0 right-0">
        <button
          className="tertiary-bg primary w-11 h-11 rounded-full text-3xl pb-11 mb-1 mr-1"
          onClick={() => window.my_modal_2.showModal()}
        >
          +
        </button>
        <dialog id="my_modal_2" className="modal pb-20 mb-20">
          <form
            method="dialog"
            className="modal-box"
            onSubmit={formik.handleSubmit}
          >
            <h3 className="font-bold text-lg pb-3 tertiary">Say something!</h3>
            <textarea
              name="message"
              className="w-full p-2"
              value={formik.values.message}
              onChange={formik.handleChange}
              rows="5"
              cols="10"
              wrap="soft"
              maxLength="280"
              placeholder="But say it here..."
            />
            <input
              type="submit"
              className="btn pt-2 text-center w-full tertiary-bg
              secondary"
            />
            <div className="text-right">
              <small>Press esc or click outside to close</small>
            </div>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </footer>
    </>
  );
}

export default PostPeeps;
