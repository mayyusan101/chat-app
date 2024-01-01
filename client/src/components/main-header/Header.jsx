import { useContext } from "react";
import { personLogo } from "../../../utils/import";
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../api/api";
import { removeToken, removeUser } from "../../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import "./header.css";

export const Header = () => {
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async() => {
    removeToken(); // clear token
    removeUser();
    await logout(currentUser._id);
    navigate("/login"); // redirect to login page
  };

  return (
    <header>
      <nav className="navigation">
        <div className="noti__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={25}
            height={25}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>
          <span className="noti__badge">1</span>
        </div>
        <div className="profile">
          <div className="">
            <h4 className="">{currentUser.name}</h4>
          </div>
          <img src={personLogo} alt="person" className="img" />
        </div>
        <div className="logout__icon" onClick={handleLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" width={20} height={20} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
          </svg>
        </div>
      </nav>
    </header>
  );
};

