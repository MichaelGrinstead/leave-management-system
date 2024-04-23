import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
