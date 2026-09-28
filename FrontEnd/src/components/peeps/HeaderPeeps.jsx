import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

function HeaderPeeps() {
  const { auth, setAuth } = useAuth();
  return (
    <>
      <header className="grid grid-cols-3 items-center gap-4 px-3 secondary">
        <Link className="col-start-2" to="/">
          <h1 className="font-bold text-3xl text-center">Y</h1>
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
