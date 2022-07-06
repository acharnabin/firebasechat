import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import { db } from "../firebase";
import { collection, updateDoc,deleteDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

const Message = ({ msg, user1,chatID }) => {
  const scrollRef = useRef(); 

  const handleDelte=async()=>{
    console.log(msg)
    deleteDoc(
      doc(
        db,
        "messages",
        chatID,
        "chat",
        msg?.id
      ),
      {
        type: "removed",
        // file: null,
        // content: "",
        // reactions: [],
      }
    );
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <div
      className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
      ref={scrollRef}
    >
      <p className={msg.from === user1 ? "me" : "friend"}>
        {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
        {msg.text}
        <br />
        <small>
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
      </p>
      <button style={{padding:"5px",backgroundColor:"transparent",borderTop:"transparent",marginLeft:"10px"}} className="button"onClick={()=>handleDelte()}>Delete for everyone</button>
    </div>
  );
};

export default Message;
