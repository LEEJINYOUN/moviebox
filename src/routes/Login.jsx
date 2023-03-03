import "./css/Login.css";
import React, { useEffect, useState } from "react";
import { authService } from "../FireBase";
import LoginForm from "../components/LoginForm.jsx";
import SwitchBox from "../components/SwitchBox.jsx";
import OtherWayBox from "../components/OtherWayBox.jsx";

export default function Login() {
  const [newAccount, setNewAccount] = useState(false);
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
        let userObject = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };
        localStorage.setItem("userInfo", JSON.stringify(userObject));
        window.location.replace("/");
      }
    });
  }, []);
  return (
    <section className="loginSection">
      <div className="loginContainer">
        <h1 className="loginTitle">간편 로그인</h1>
        <LoginForm newAccount={newAccount} setNewAccount={setNewAccount} />
        <SwitchBox newAccount={newAccount} toggleAccount={toggleAccount} />
        <OtherWayBox authService={authService} />
      </div>
    </section>
  );
}
