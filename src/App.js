import "./App.css";
import React from "react";
import Home from "./routes/Home";
import { Route, Routes } from "react-router-dom";
import Detail from "./routes/Detail";
import Login from "./routes/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/movieBox" element={<Home />}></Route>
        <Route path="/movie/:id" element={<Detail />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
