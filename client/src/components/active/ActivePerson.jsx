import { personLogo } from "../../../utils/import";
import "./active-person.css";

export const ActivePerson = ({user}) => {
  console.log("active user", user);
  return (
    <div className="active__person">
      <img src={personLogo} alt="person" className="img" />
      <div className="active__name">
        <h2 className="person__name">{user?.name}</h2>
      </div>
    </div>
  );
};
