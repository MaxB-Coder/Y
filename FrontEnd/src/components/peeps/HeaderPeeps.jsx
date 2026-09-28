import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

function HeaderPeeps() {
  const { auth, setAuth } = useAuth();
  return (
    <>
      <header className="sticky top-0 z-10 grid grid-cols-3 items-center gap-4 px-4 py-2 secondary bg-[#571429]/90 backdrop-blur border-b border-white/10">
        <Link className="col-start-2" to="/">
          <h1 className="font-black text-3xl text-center">Y</h1>
        </Link>
        <nav className="flex justify-end gap-3 text-sm sm:text-base">
          {auth?.username ? (
            // Logging out clears the in-memory session, then shows the login page
            <Link to="/login" onClick={() => setAuth({})}>
              Log out
            </Link>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/sign-up" className="font-medium underline underline-offset-4">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}

export default HeaderPeeps;
