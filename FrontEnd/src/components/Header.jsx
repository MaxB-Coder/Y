import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

function Header() {
  return (
    <>
      <header className="grid grid-cols-3 items-center px-4 py-2">
        <h1 className="col-start-2 flex justify-center">
          <Link to="/">
            <Logo />
          </Link>
        </h1>
      </header>
    </>
  );
}

export default Header;
