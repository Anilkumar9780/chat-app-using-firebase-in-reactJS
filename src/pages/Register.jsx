import React, { useState } from "react";

// images src
import Add from "../img/addAvatar.png";

// firebase library
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

// package
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';

// Component 
import { Loaders } from "../Loader/Loader";
import { auth, db, storage } from '../firebase'

const Register = () => {
  // states
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Register user
   * @param {object} e 
   */
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("Register successfully Wellcome to Me Chat", {
        position: toast.POSITION.TOP_RIGHT
      })
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
          } catch (error) {
            toast.error(error, "Something went wrong", {
              position: toast.POSITION.TOP_RIGHT
            })
            setLoading(false);
          }
        });
      });
    } catch (error) {
      toast.error(error, "Something went wrong", {
        position: toast.POSITION.TOP_RIGHT
      })
      setLoading(false);
    }
    setDisplayName('');
    setEmail('');
    setPassword('');
    setFile(null);
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
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Full Name"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
          />
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
          <input
            required
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an photo</span>
          </label>
          <button >Sign up</button>
          <Loaders loader={loading} />
        </form>
        <p>
          You do have an account?
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
