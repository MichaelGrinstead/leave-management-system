import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import CreateAccount from "./components/Auth/CreateAccount";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/Auth/RequireAuth";
import CreateLeaveRequest from "./components/Home/CreateLeaveRequest";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/create-leave-request"
            element={<CreateLeaveRequest />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
