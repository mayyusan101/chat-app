import { useContext, useState } from "react";
import { postMessageToDB } from "../../api/api";
import socket from "../../services/socketService";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../store/features/messageSlice";
import { AuthContext } from "../../context/AuthContext";
import "./chat-input.css";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const conversation = useSelector(state => state.conversation);

  const currentUser = useContext(AuthContext);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const postMessage = async() => {
    await postMessageToDB({
      message: message,
      conversationId: conversation._id
    });
  };

  const emitSocketMessage = () => {
    if(conversation.isRoom === false){
      socket.emit("sendMessage",{
        senderId: currentUser._id,
        receiverId: conversation.users[0]._id,
        text: message
      });
    }else{
      socket.emit("roomMessage",{
        senderId: currentUser._id,
        roomId: conversation._id,
        text: message
      });
    }
  };

  const handleSendMessage = async() => {
    if(!message)return; // no message return
    const msg = {
      text: message,
      sender: currentUser,
      _id: Math.random(10000)
    };
    if(conversation.isRoom === false) dispatch(sendMessage(msg)); // append directly in UI(only for chat message)
    emitSocketMessage();  //emit socket
    await postMessage(); // send message to DB
    setMessage(""); // clear text box
  }

  return (
    <div className="chat__input__box">
      <div className="chat__input__container">
        <div className="chat__input">
          <input type="text"  value={message} onChange={handleChange} 
             onKeyDown={(e) => {
            if (e.key === "Enter")handleSendMessage();
            }}
          />
        </div>
        <div className="send__icon"
          onClick={handleSendMessage}
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