import { useEffect, useState } from "react";
import { personLogo } from "../../../utils/import";
import { getUser } from "../../../utils/localStorage";
import "./message.css";
import moment from 'moment';

export const Message = ({ message }) => {
  const currentUser = getUser();
  const updatedMessage = {
    ...message,
    type: message.sender._id == currentUser._id ? "sender" : null,
  };

  const time = moment(message?.createdAt).format('hh:mm a');
  return (
    <div>
      <div
        className={
          updatedMessage.type === "sender"
            ? "sender__message"
            : "receiver__message"
        }
      >
        <img src={personLogo} alt="person" className="img" />
        <div className="message__box">
          <p className="person__text">{updatedMessage.text}</p>
          <p className="message__time">{time}</p>
        </div>
      </div>
    </div>
  );
};
