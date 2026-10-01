import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./components/login/Login.jsx";
import PeepPage from "./components/peeps/PeepPage.jsx";
import SignUp from "./components/sign-up/SignUp.jsx";

import { getPeeps } from "./asyncFunctions/peepAPICalls.js";

function App() {
  const [peepData, setPeepData] = useState([]);
  // Kept for an error message the timeline doesn't show yet
  const [, setError] = useState({
    type: ``,
    message: ``,
  });

  /** Puts a timeline response from the API on the page. */
  const showPeeps = (result) => {
    if (result?.error) {
      setError({
        ...result,
        message: `There was a problem getting the peeps: ${result.error.message}`,
      });
    }
    setPeepData(result?.peeps ?? []);
  };

  // Also runs after posting, so the new peep appears without a reload
  const fetchData = () => getPeeps().then(showPeeps);

  useEffect(() => {
    let current = true;
    // The page may have gone by the time the peeps arrive
    getPeeps().then((result) => current && showPeeps(result));
    return () => {
      current = false;
    };
  }, []);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<PeepPage peepData={peepData} onPosted={fetchData} />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
