// import from npm

import "./global.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// import from file code
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ChatApp from "./pages/Chatapp/ChatApp";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/chat" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/chat" /> : <Signup />}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatApp /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
