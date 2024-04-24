import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";

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
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
