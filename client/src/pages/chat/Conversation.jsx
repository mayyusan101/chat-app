import { useEffect, useRef } from "react";
import { ChatInput, ConversationHeader, Message } from "../../../utils/import";
import socket from "../../services/socketService";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../store/features/messageSlice";
import "./chat.css";

export const Conversation = ({isModalOpen}) => {

  const scrollRef = useRef();
  const conversationRef = useRef();
  const dispatch = useDispatch();

  const messages = useSelector(state => state.messages.messages);

  // for message auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // for show&hide when modal is open
  useEffect(() => {
    const currentElement = conversationRef.current;
    if(isModalOpen === true){
      currentElement.style.zIndex = '-1';
    }else{
      currentElement.style.zIndex = '1';
    }
  }, [isModalOpen]);

  // socket
  useEffect(() => {
    // listen for chat message
    socket.on("sendMessage",({senderId, text}) => {
      const message = {
        text:text,
        sender:{
          _id: senderId
        },
        _id: Math.random(10000)
      };
      dispatch(sendMessage(message));
    });
    // listen for room message
    socket.on("roomMessage",({senderId, text}) => {
      const message = {
        text:text,
        sender:{
          _id: senderId
        },
        _id: Math.random(10000)
      };
      dispatch(sendMessage(message));
    });
  },[]);

  return (
    <div>
      <ConversationHeader/>
      <div className="conversation__container" ref={conversationRef}>
        <div className="messages__container">
          {messages &&
            messages.map((m) => (
              <div ref={scrollRef} key={m._id}>
                <Message message={m} />
              </div>
            ))}
        </div>
        <ChatInput/>
      </div>
    </div>
  );
};
