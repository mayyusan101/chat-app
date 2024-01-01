import { useContext } from "react";
import { personLogo } from "../../../utils/import";
import "./message.css";
import moment from 'moment';
import { AuthContext } from "../../context/AuthContext";

export const Message = ({ message }) => {
  const currentUser = useContext(AuthContext);
  const isSender =  message.sender._id === currentUser._id ? true: false;
  const time = moment(message?.createdAt).format('hh:mm a');
  
  return (
    <div>
      <div
        className={
          isSender
            ? "sender__message"
            : "receiver__message"
        }
      >
        <img src={personLogo} alt="person" className="img" />
        <div className="message__box">
          <p className="person__text">{message.text}</p>
          <p className="message__time">{time}</p>
        </div>
      </div>
    </div>
  );
};
