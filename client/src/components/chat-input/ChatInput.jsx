import { useContext, useEffect, useState } from "react";
import "./chat-input.css";
import { ConversationContext } from "../../context/ConversationConext";
import { postMessage } from "../../api/api";
import { getUser } from "../../../utils/localStorage";
import socket from "../../services/socketService";


export const ChatInput = ({onSendMessage, conversationType, conversationId}) => {
  const [message, setMessage] = useState("");
  const { conversation } = useContext(ConversationContext);

  const currentUser = getUser();

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const postMessageToDB = async() => {
    const response = await postMessage({
      message: message,
      conversationId: conversation.data._id
    });
  };
  const emitSocketMessage = () => {
    if(conversation.data.isRoom === false){
      socket.emit("sendMessage",{
        senderId: currentUser._id,
        receiverId: conversation.data.users[0]._id,
        text: message
      });
    }else{
      socket.emit("roomMessage",{
        senderId: currentUser._id,
        roomId: conversation.data._id,
        text: message
      });
    }
  };

  const sendMessage = async() => {
    if(!message)return; // no message return
    const msg = {
      text: message,
      sender: currentUser,
      _id: Math.random(10000)
    }
    if(conversation.data.isRoom === false) onSendMessage(msg); // append directly in UI(only for chat message)
    emitSocketMessage();  //emit socket
    await postMessageToDB(); // send message to DB
    setMessage(""); // clear text box
  }

  return (
    <div className="chat__input__box">
      <div className="chat__input__container">
        <div className="chat__input">
          <input type="text"  value={message} onChange={handleChange} 
             onKeyDown={(e) => {
            if (e.key === "Enter")sendMessage();
            }}
          />
        </div>
        <div className="send__icon"
          onClick={sendMessage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={25}
            height={25}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};