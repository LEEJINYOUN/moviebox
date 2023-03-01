import { authService } from "../FireBase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";

export default function Login() {
  const [newAccount, setNewAccount] = useState(false);
  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("회원가입이 되었습니다.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("로그인 되었습니다. 환영합니다.");
      }
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("존재하는 이메일입니다.");
      } else if (error.message === "Firebase: Error (auth/wrong-password).") {
        setError("비밀번호가 일치하지 않습니다.");
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError("비밀번호는 6자 이상이어야 합니다.");
      }
    }
  };
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        if (user.displayName === null) {
          const name = user.email.split("@")[0];
          user.displayName = name;
        }
        let userObject = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };
        localStorage.setItem("userInfo", JSON.stringify(userObject));
        window.location.replace("/");
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
    });
  }, []);
  return (
    <div className="authContainer">
      <form onSubmit={onSubmit} className="authForm">
        <input
          name="email"
          type="email"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          className="authSubmit"
          value={newAccount ? "회원가입" : "로그인"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <div className="authSwitchContainer">
        {newAccount ? (
          <>
            <span className="authQuestion">회원인가요?</span>
            <span onClick={toggleAccount} className="authSwitch">
              로그인
            </span>
          </>
        ) : (
          <>
            <span className="authQuestion">처음인가요?</span>
            <span onClick={toggleAccount} className="authSwitch">
              회원가입
            </span>
          </>
        )}
      </div>
      <div className="authOtherWay">
        <button
          onClick={onSocialClick}
          name="google"
          className="otherWayBtn googleBtn"
        >
          구글 로그인
        </button>
      </div>
    </div>
  );
}
