import useAuth from "../../hooks/useAuth.js";

function HeaderPeeps() {
  const { auth } = useAuth();
  return (
    <>
      <header className="grid grid-cols-7 gap-4 secondary">
        <a className="col-start-4 col-span-1" href="/">
          <h1 className="font-bold text-3xl text-center">Y</h1>
        </a>
        <a href="./login" className="col-start-7 col-span-1 pt-2 pr-3">
          <h1 className="font-normal text-base text-right">
            {auth?.username ? "Logout" : "Login"}
          </h1>
        </a>
      </header>
    </>
  );
}

export default HeaderPeeps;
