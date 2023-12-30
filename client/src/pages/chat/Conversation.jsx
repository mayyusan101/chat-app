import { useContext, useEffect, useRef, useState } from "react";
import { ChatInput, ConversationHeader, Message } from "../../../utils/import";
import "./chat.css";
import { ConversationContext } from "../../context/ConversationConext";
import socket from "../../services/socketService";

export const Conversation = ({activeUsers, setAllRooms, isModalOpen}) => {
  const { conversation } = useContext(ConversationContext);
  const [chatMessages, setChatMessages] = useState([]);
  const scrollRef = useRef();
  const conversationRef = useRef();

  // for all messages
  useEffect(() => {
    setChatMessages(conversation?.messages);
  }, [conversation]);

  // for message auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // for show&hide when modal is open
  useEffect(() => {
    const currentElement = conversationRef.current;
    if(isModalOpen === true){
      currentElement.style.zIndex = '-1';
    }else{
      currentElement.style.zIndex = '1';
    }
  }, [isModalOpen]);

  // for append directly in UI
  const handleSendMessage = (message) => {
    setChatMessages((prev) => [...prev, message]);
  };

  // socket
  useEffect(() => {
    // chat message
    socket.on("sendMessage",({senderId, text}) => {
      const message = {
        text:text,
        sender:{
          _id: senderId
        },
        _id: Math.random(10000)
      };
      setChatMessages((prev) => [...prev, message]);
    });
    // room message
    socket.on("roomMessage",({senderId, text}) => {
      const message = {
        text:text,
        sender:{
          _id: senderId
        },
        _id: Math.random(10000)
      };
      setChatMessages((prev) => [...prev, message]);
    });
  },[]);

  return (
    <div>
      <ConversationHeader activeUsers={activeUsers} setAllRooms={setAllRooms}/>
      <div className="conversation__container" ref={conversationRef}>
        <div className="messages__container">
          {chatMessages &&
            chatMessages.map((m) => (
              <div ref={scrollRef} key={m._id}>
                <Message message={m} />
              </div>
            ))}
        </div>
        <ChatInput
          onSendMessage={handleSendMessage}
          conversationType={conversation.type}
          conversationId={conversation.data._id}
        />
      </div>
    </div>
  );
};
