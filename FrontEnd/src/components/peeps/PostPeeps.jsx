import { useFormik } from "formik";
import * as Yup from "yup";

import { postPeep } from "../../asyncFunctions/peepAPICalls";
import useAuth from "../../hooks/useAuth.js";

function PostPeeps({ onPosted }) {
  const { auth } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      $date: "",
      message: "",
    },

    validationSchema: Yup.object().shape({
      message: Yup.string().required("Message is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      values.username = auth.username;
      values.$date = new Date();
      await postPeep(values);

      // Refresh the timeline in place; reloading the page would log the user out
      window.my_modal_2.close();
      resetForm();
      onPosted?.();
    },
  });

  return (
    <>
      <footer className="fixed bottom-0 right-0 p-4">
        <button
          aria-label="New peep"
          className="grid place-items-center w-14 h-14 rounded-full tertiary-bg secondary shadow-lg shadow-black/30 transition-transform hover:scale-105 active:scale-95"
          onClick={() => window.my_modal_2.showModal()}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-6 h-6 stroke-current"
            fill="none"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <dialog id="my_modal_2" className="modal">
          <form
            method="dialog"
            className="modal-box secondary-bg primary rounded-2xl"
            onSubmit={formik.handleSubmit}
          >
            <h3 className="font-bold text-lg pb-3">Say something!</h3>
            <textarea
              name="message"
              aria-label="Your peep"
              className="w-full p-3 rounded-xl border border-black/10 bg-white text-base focus:outline-none focus:ring-2 focus:ring-[#d18d3d]"
              value={formik.values.message}
              onChange={formik.handleChange}
              rows="5"
              cols="10"
              wrap="soft"
              maxLength="280"
              placeholder="But say it here..."
            />
            <div className="flex items-center justify-between pt-2">
              <small className="opacity-60">Esc or tap outside to close</small>
              <small className="opacity-60 tabular-nums">
                {formik.values.message.length}/280
              </small>
            </div>
            <button
              type="submit"
              className="w-full mt-3 py-2.5 rounded-full tertiary-bg secondary font-semibold transition-opacity hover:opacity-90"
            >
              Peep
            </button>
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
