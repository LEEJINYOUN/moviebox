import "./App.css";
import React from "react";
import Home from "./routes/Home";
import { Routes, Route } from "react-router-dom";
import Detail from "./routes/Detail";
import Login from "./routes/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/movie/:id" element={<Detail />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
