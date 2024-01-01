import Select from "react-select";
import makeAnimated from "react-select/animated";
import { createRoomToDB } from "../../api/api";
import { useContext, useState } from "react";
import socket from "../../services/socketService";
import { useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import "./create-room.css";

export const CreateRoom = ({onModalOpen}) => {
  
  const [modal, setModal] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const animatedComponents = makeAnimated();

  const allUsers = useSelector(state => state.chatUsers.allUsers); // reterive allUsers from store

  const currentUser = useContext(AuthContext);
  // all users
  const options = allUsers.map((user) => ({
    value: user._id,
    label: user.name,
  }));

  const toggleModal = () => {
    setModal(!modal);
    onModalOpen();
  };

  const handleForm = async (e) => {
    try {
      e.preventDefault();
      // get all users ids
      const selectedUserIds = selectedOptions.map((value) => ({
        id: value.value,
      }));
      const response = await createRoomToDB({ roomName, users: [...selectedUserIds, currentUser._id] });
      toggleModal(); // close modal
      socket.emit("roomChat",{
        roomName: roomName,
        userId: currentUser._id,
        roomId: response.data._id,
        membersIds: selectedUserIds
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSelectChange = async (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  return (
    <>
      <div className="room__btn">
        <button className="btn-modal" onClick={toggleModal}>
          Create
        </button>
      </div>
          {modal && (
            <div className="modal">
              <div className="modal-content">
                <h2>Create Rooms</h2>
                <form onSubmit={handleForm} className="room__form">
                  <div className="form__control">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                    />
                  </div>
                  <div className="form__control">
                    <label>Members</label>
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      onChange={handleSelectChange}
                      options={options}
                    />
                  </div>
                  <div className="create__btn" type="submit">
                    <button>Create</button>
                  </div>
                </form>

                <button className="close-modal" onClick={toggleModal}>
                  CLOSE
                </button>
              </div>
              <div onClick={toggleModal} className="overlay"></div>
            </div>
          )}
    </>
  );
};
