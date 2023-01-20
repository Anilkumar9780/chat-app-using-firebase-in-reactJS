import React, { useContext } from 'react';

// component firebase
import { signOut } from "firebase/auth"
import { auth } from '../firebase'

// context component
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  // get user info
  const { currentUser } = useContext(AuthContext)

  /**
   * user logoout 
   */
  const logout = async () => {
    await signOut(auth)
  };

  return (
    <div className='navbar'>
      <span className="logo"><img src="https://img.icons8.com/color/48/null/communication.png" alt="https://img.icons8.com/color/48/null/communication.png" /><span style={{ marginTop: "10px" }}></span></span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button
          onClick={logout}
        >logout</button>
      </div>
    </div>
  )
}

export default Navbar