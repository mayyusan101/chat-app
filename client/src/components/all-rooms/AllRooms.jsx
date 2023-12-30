import { useEffect, useState } from "react";
import { CreateRoom, RoomChat } from "../../../utils/import";
import "./all-room.css";
import { fetchAllRooms } from "../../api/api";

export const AllRooms = ({ allUsers, allRooms }) => {

  return (
    <div className="room__container">
      {allRooms &&
        allRooms.map((room) => <RoomChat key={room._id} room={room} />)}
    </div>
  );
};
