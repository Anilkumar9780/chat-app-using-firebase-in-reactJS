import React, { useContext } from "react";

// components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// scss style
import "./style.scss";

// packages
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// context component
import { AuthContext } from "./context/AuthContext";

function App() {
  // get the user info 
  const { currentUser } = useContext(AuthContext);

  /**
   * not user so login to push the login apge
   * @param {object} param0 
   */
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children
  };

  return (
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
  );
}

export default App;
