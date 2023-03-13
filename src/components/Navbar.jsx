import React from "react";
import "./css/Navbar.css";
import { authService } from "../FireBase";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const onLogOutClick = () => {
    authService.signOut();
    window.localStorage.clear();
    window.location.replace("/moviebox");
  };
  return (
    <>
      {localStorage.getItem("userInfo") === null ? (
        <>
          <section className="nav">
            <NavLink to="/">홈</NavLink>
            <NavLink to="/login">로그인</NavLink>
          </section>
        </>
      ) : (
        <>
          <section className="nav">
            <NavLink to="/">홈</NavLink>
            <button className="navLogOut" onClick={onLogOutClick}>
              로그아웃
            </button>
          </section>
        </>
      )}
    </>
  );
}
