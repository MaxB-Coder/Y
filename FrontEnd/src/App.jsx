import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./components/login/Login.jsx";
import PeepPage from "./components/peeps/PeepPage.jsx";
import SignUp from "./components/sign-up/SignUp.jsx";

import { getPeeps } from "./asyncFunctions/peepAPICalls.js";

function App() {
  const [peepData, setPeepData] = useState([]);
  const [error, setError] = useState({
    type: ``,
    message: ``,
  });

  const fetchData = async () => {
    const externalDataCallResult = await getPeeps();
    if (externalDataCallResult?.error) {
      const errorObject = { ...externalDataCallResult };
      errorObject.message = `There was a problem getting the peeps: $externalDataCallResult.error.message`;
      setError(errorObject);
    }
    const peepData = externalDataCallResult?.peeps
      ? externalDataCallResult.peeps
      : [];

    setPeepData(peepData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<PeepPage peepData={peepData} />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
