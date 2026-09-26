import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

function HeaderPeeps() {
  const { auth, setAuth } = useAuth();
  return (
    <>
      <header className="grid grid-cols-7 gap-4 secondary">
        <Link className="col-start-4 col-span-1" to="/">
          <h1 className="font-bold text-3xl text-center">Y</h1>
        </Link>
        {/* Logging out clears the in-memory session, then shows the login page */}
        <Link
          to="/login"
          onClick={() => auth?.username && setAuth({})}
          className="col-start-7 col-span-1 pt-2 pr-3"
        >
          <h1 className="font-normal text-base text-right">
            {auth?.username ? "Logout" : "Login"}
          </h1>
        </Link>
      </header>
    </>
  );
}

export default HeaderPeeps;
