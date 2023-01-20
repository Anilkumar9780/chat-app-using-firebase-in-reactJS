import React, { useContext, useState } from "react";

// package
import { toast } from 'react-toastify';

// firebase  library
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";


//  context component
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const Search = () => {
  // states
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const { currentUser } = useContext(AuthContext);

  /**
   * search user
   */
  const handleSearch = async () => {
    const serchQuery = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(serchQuery);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  /**
   * handle enter
   * @param {object} e 
   */
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  /**
   * on select user
   */
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    setUser(null);
    setUsername("");
    toast.error("User not found!", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  // console.log(user)

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {user && (
        <div className="userChat"
          onClick={handleSelect}
        >
          <img
            src={user.photoURL}
            alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
