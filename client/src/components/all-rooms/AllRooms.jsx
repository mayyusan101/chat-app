import { useSelector } from "react-redux";
import { RoomChat } from "../../../utils/import";
import "./all-room.css";


export const AllRooms = () => {
  const allRooms = useSelector(state => state.chatUsers.allRooms); // reterive all rooms from store
  
  return (
    <div className="room__container">
      {allRooms &&
        allRooms.map((room) => <RoomChat key={room._id} room={room} />)}
    </div>
  );
};
