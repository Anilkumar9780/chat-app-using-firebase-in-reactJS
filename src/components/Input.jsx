import React, { useContext, useState } from "react";

// images
import Img from "../img/img.png";
import Attach from "../img/attach.png";

// context componet
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";

// firebase package
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// package auto gen id
import { v4 as uuidv4 } from 'uuid';

// package
import { toast } from 'react-toastify';

const Input = () => {
  // states
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  // user info get
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  /**
   * send user messages
   */
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuidv4());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          //TODO:Handle Error
          toast.error(error, {
            position: toast.POSITION.TOP_RIGHT
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                dates: new Date().toLocaleString(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          dates: new Date().toLocaleString(),
        }),
      });
    }
    setText("");
    setImg(null);
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(event) => setText(event.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(event) => setImg(event.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button
          onClick={handleSend}
        >Send</button>
      </div>
    </div>
  );
};

export default Input;

