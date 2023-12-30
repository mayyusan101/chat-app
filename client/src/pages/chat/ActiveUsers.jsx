import { useEffect, useState } from "react";
import { ActivePerson } from "../../../utils/import";
import "./chat.css";


export const ActiveUsers = ({activeUsers}) => {


  return (
    <div className="chat__active">
      <h3 className="active__title">Actives</h3>
      <hr className="active__line" />
      <div className="active__container">
       {activeUsers.length > 0 && activeUsers.map(user => ( <ActivePerson key={user._id} user={user}/>))}
      </div>
    </div>
  );
};
