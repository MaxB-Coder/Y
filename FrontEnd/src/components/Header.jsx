import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <header className="grid grid-cols-7 gap-4 text-white">
        <Link className="col-start-4 col-span-1" to="/">
          <h1 className="font-bold text-3xl text-center">Y</h1>
        </Link>
      </header>
    </>
  );
}

export default Header;
