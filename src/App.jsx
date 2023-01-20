import React, { useContext } from "react";

// components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { PopMessage } from "./Popupmessage/PopupMessage";

// scss style
import "./style.scss";

// packages react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// context component
import { AuthContext } from "./context/AuthContext";

const App = () => {
  // get the user info 
  const { currentUser } = useContext(AuthContext);

  /**
   * not user so push the login page
   * @param {object} param0 
   */
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children
  };


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <PopMessage />
    </>
  );
}

export default App;
