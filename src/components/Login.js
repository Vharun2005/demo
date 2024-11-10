import React, { useContext, useState } from "react";
import "./login.css";
import axios from "axios";
import { BackendContext } from "../context/BackendContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(BackendContext);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const loginuser = await axios.post(
        "https://full-stack-ai-chatbot-1.onrender.com/api/loginuser",
        { username: username, password: password }
      );
      const token = await loginuser.data;
      dispatch({
        type: "LOGIN",
        payload: token,
      });
      localStorage.setItem("token", token);
      navigate("/");
      setPassword("");
      setuserName("");
    } catch (error) {
      if (error.response) {
        toast(error.response.data);
        setuserName("");
        setPassword("");
      } else {
        alert("error occured please reload website");
      }
    }
  };
  return (
    <div>
      <ToastContainer position='top-center'/>
      <p
        className="fs-1 fw-medium text-center mt-2 mb-1"
        style={{ color: "#6084af" }}
      >
        Gemini AI
      </p>
      <section className="d-flex justify-content-center align-items-center  w-100 h-100">
        <form className="border rounded mt-3 cus-form p-2 mb-3">
          <h2 className="text-center p-2">
            <span>Log In</span>
          </h2>
          <div className="d-flex flex-column mt-3 justify-content-center">
            <label className="">Username</label>
            <input
              placeholder="Enter your name"
              className="cus-input-signup mt-2"
              value={username}
              onChange={(e) => setuserName(e.target.value)}
            ></input>
          </div>
          <div className="d-flex flex-column mt-3">
            <label>password</label>
            <input
              placeholder="password"
              className="cus-input-signup mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            ></input>
          </div>
          <div className="text-end mt-2">
            <a href="/signup" className="mt-4 text-end">
              Signup?
            </a>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary fw-medium mt-4 "
              onClick={() => login()}
            >
              Log In
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
