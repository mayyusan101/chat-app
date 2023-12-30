import "./switch-chat.css";

export const SwitchChat = ({ chatType, onSwitchChatType }) => {
  return (
    <div>
      <h3 className="switch__title">Chats</h3>
      <div className="switch__chat">
        <div className="switch__chat__menu">
          <button
            className={chatType === "chat" ? "active" : ""}
            onClick={onSwitchChatType}
          >
            Chat
          </button>
          <button
            className={chatType === "room" ? "active" : ""}
            onClick={onSwitchChatType}
          >
            Room
          </button>
        </div>
      </div>
    </div>
  );
};
