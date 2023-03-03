import React from "react";
import "./css/Navbar.css";
import { authService } from "../FireBase";
import { BiCameraMovie } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const onLogOutClick = () => {
    authService.signOut();
    window.localStorage.clear();
    window.location.replace("/");
  };
  return (
    <div className="navbarContainer">
      {localStorage.getItem("userInfo") === null ? (
        <>
          <div className="navLogo">
            <BiCameraMovie className="navIcon" />
            <span className="navTitle">movieBox</span>
          </div>
          <div className="navItems">
            <NavLink to="/" className="navLink">
              홈
            </NavLink>
            <NavLink to="/login" className="navLink">
              로그인
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <div className="navLogo">
            <BiCameraMovie className="navIcon" />
            <span className="navTitle">movieBox</span>
          </div>
          <div className="navItems">
            <NavLink to="/" className="navLink">
              홈
            </NavLink>
            <button className="navLink navLogOut" onClick={onLogOutClick}>
              로그아웃
            </button>
          </div>
        </>
      )}
    </div>
  );
}
