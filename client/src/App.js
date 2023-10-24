import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Results from "./components/Results";
import Elections from "./components/Elections";
import UpcomingElection from "./components/UpcomingElection";
import OngoingElection from "./components/OngoingElection";
import PastElection from "./components/PastElection";
import ElectionState from "./contexts/election/ElectionState";
import ContactUs from "./components/ContactUs";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AlertState from "./contexts/alert/AlertState";

const App = () => {
  return (
    <>
      <ElectionState>
        <AlertState>
          <Router>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/results" element={<Results />}></Route>
              <Route exact path="/elections" element={<Elections />}></Route>
              <Route exact path="/contactus" element={<ContactUs />}></Route>
              <Route
                exact
                path="/upcoming"
                element={<UpcomingElection />}
              ></Route>
              <Route
                exact
                path="/ongoing"
                element={<OngoingElection />}
              ></Route>
              <Route exact path="/past" element={<PastElection />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<SignUp />}></Route>
            </Routes>
            <Footer />
          </Router>
        </AlertState>
      </ElectionState>
    </>
  );
};

export default App;
