import React, { useContext } from 'react';

// component firebase
import { signOut } from "firebase/auth"
import { auth } from '../firebase'

// context component
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  // get user info
  const { currentUser } = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className="logo">Me Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button
          onClick={() => signOut(auth)}
        >logout</button>
      </div>
    </div>
  )
}

export default Navbar