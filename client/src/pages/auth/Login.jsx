import { Link, useLocation, useNavigate } from "react-router-dom";
import "./auth.css";
import { useEffect, useState } from "react";
import axios from "axios";
import notify from "../../../utils/notify";
import { getToken, setToken, setUser } from "../../../utils/localStorage";
import { useRedirect } from "../../hooks/useRedirect";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

  const location = useLocation();
  const message = location.state?.message;
  const navigate = useNavigate();

  useEffect(() => {
    if(message ){ 
    notify({type:"warn",message:message});  // notify plesse login first
    }
  },[message]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );
      if(response.status === 200){
      notify({type:"success",message:response.data.message});
      setUser(response.data.data.user); // set user data to localStorage
      setToken(response.data.data.token); // set refresh-token to localStorage
      navigate("/");
      }
    } catch (err) {
      console.log(err.response.data.message);
      notify({type:"error",message:err.response.data.message});
    }
  };
  return (
    <main className="auth">
      <ToastContainer />
      <div className="auth__container">
        <div className="auth__form">
          <form onSubmit={handleFormHandler}>
            <div className="form__control">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="form__control">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <button className="btn__primary" type="submit">
              Login
            </button>
          </form>
          <div className="auth__goto">
            <Link to={"/register"}>You do not has an account?</Link>
          </div>
        </div>
      </div>
    </main>
  );
};
