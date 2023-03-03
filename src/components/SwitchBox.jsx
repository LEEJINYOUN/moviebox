import "./css/SwitchBox.css";
import React from "react";

export default function SwitchBox({ newAccount, toggleAccount }) {
  return (
    <div className="switchBox">
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
  );
}
