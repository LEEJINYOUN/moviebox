import "./css/OtherWayBox.css";
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function otherWayBox({ authService }) {
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
  return (
    <div className="otherWayBox">
      <button onClick={onSocialClick} name="google" className="otherWayBtn">
        구글 로그인
      </button>
    </div>
  );
}
