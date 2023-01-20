import React, { useState } from "react";

// package
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';

// firebase library
import { signInWithEmailAndPassword } from "firebase/auth";

// components 
import { Loaders } from "../Loader/Loader";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   *  submit login user 
   * @param {object} event 
   */
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successfully", {
        position: toast.POSITION.TOP_RIGHT
      })
      navigate("/")
      setEmail('');
      setPassword('');
    } catch (error) {
      toast.error(error, "Something went wrong", {
        position: toast.POSITION.TOP_RIGHT
      })
    }
    setLoading(false);
  };


  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">
          <img
            src="https://img.icons8.com/color/48/null/communication.png"
            alt="https://img.icons8.com/color/48/null/communication.png"
          />
        </span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button>Sign in</button>
          <Loaders loader={loading} />
        </form>
        <p>You don't have an account?<Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
