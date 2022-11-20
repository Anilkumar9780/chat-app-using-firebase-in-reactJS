import React, { useContext, useEffect, useState } from "react";

// component context
import { ChatContext } from "../context/ChatContext";

// firebase package
import { doc, onSnapshot } from "firebase/firestore";

// firebase component
import { db } from "../firebase";

// component
import Message from "./Message";

const Messages = () => {
  // states
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  // onsanpshot
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {/* maping message */}
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
