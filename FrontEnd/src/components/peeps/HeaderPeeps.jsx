import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import Logo from "../Logo.jsx";

const PersonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20c1.4-3.6 4.2-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
  </svg>
);

const LogOutIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M9 16l-4-4 4-4M5 12h10" />
  </svg>
);

function HeaderPeeps() {
  const { auth, setAuth } = useAuth();
  return (
    <>
      <header className="sticky top-0 z-10 grid grid-cols-3 items-center gap-4 px-4 py-2 bg-[#140a0f]/85 backdrop-blur border-b border-white/5">
        <h1 className="col-start-2 flex justify-center">
          <Link to="/">
            <Logo />
          </Link>
        </h1>
        <nav className="flex justify-end">
          {auth?.username ? (
            // Logging out clears the in-memory session, then shows the login page
            <Link to="/login" aria-label="Log out" className="icon-button" onClick={() => setAuth({})}>
              <LogOutIcon />
            </Link>
          ) : (
            // The login page also offers signing up
            <Link to="/login" aria-label="Log in" className="icon-button">
              <PersonIcon />
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}

export default HeaderPeeps;
