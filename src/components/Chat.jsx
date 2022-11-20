import React, { useContext } from "react";

// images
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";

// component
import Messages from "./Messages";
import Input from "./Input";

// context component
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  // user info
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};
export default Chat;
