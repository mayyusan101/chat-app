import { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import notify from "../../../utils/notify";
import { setToken, setUser } from "../../../utils/localStorage";

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );
      notify({type:"success",message:response.data.message});
      // store user data in localStorage
      setUser(response.data.data.user); // set user data to localStorage
      setToken(response.data.data.token); // set token to localStorage
      navigate("/");
    } catch (err) {
      console.log(err.response.data.message);
      notify({type:"error",message:err.response.data.message});
    }
  };
  return (
    <main className="auth">
      <div className="auth__container">
        <div className="auth__form">
          <form onSubmit={handleFormHandler}>
            <div className="form__control">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
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
              Retgister
            </button>
          </form>
          <div className="auth__goto">
            <Link to={"/login"}>Already has an account?</Link>
          </div>
        </div>
      </div>
    </main>
  );
};
