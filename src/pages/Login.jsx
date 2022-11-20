import React, { useState } from "react";

// package
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';


// components
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  // states
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  /**
   * login user
   * @param {object} e 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
      toast.error("Something went wrong", {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Me Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {/* {err && toast.error("Something went wrong", {
            position: toast.POSITION.TOP_RIGHT
          })} */}
        </form>
        <p>You don't have an account?<Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
