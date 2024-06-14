import "./Login.css";
import logo from "../assets/railwaylogo.png";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setuser] = useState("Dealer");
  const navigate = useNavigate();
  function handleDealer() {
    setuser("Dealer");
  }
  function handleAdmin() {
    setuser("Admin");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked");
    if (user === "Dealer") navigate("/dealer/addcug");
    else navigate("/admin/createDealer");
  };
  return (
    <>
      <main className="login">
        <header className="login_header">
          <img src={logo} alt="Railway_logo" className="logo" />
        </header>
        <center>
          <h1>Login</h1>
        </center>
        <div className="form">
          <form action="" className="login_form">
            <div className="select_user">
              <button
                className={` ${user === "Dealer" ? "dealer" : ""} `}
                onClick={handleDealer}
                type="button"
              >
                Dealer
              </button>
              <button
                className={` ${user === "Admin" ? "admin" : ""} `}
                onClick={handleAdmin}
                type="button"
              >
                Admin{" "}
              </button>
            </div>
            <div className="user_name">
              Name:
              <input type="text" className="loginname" />
              <LuUser2 className="userlogo" />
            </div>
            <div className="user_email">
              Email:
              <input type="email" className="loginemail" />
              <MdOutlineEmail className="userlogo" />
            </div>
            <div className="user_password">
              Password:
              <input type="password" className="loginpass" />
              <FaLock className="userlogo" />
            </div>
            <button className="submit" onClick={(e) => handleSubmit(e)}>
              Login
            </button>
          </form>
        </div>
      </main>
      <Outlet />
    </>
  );
};
export default Login;
