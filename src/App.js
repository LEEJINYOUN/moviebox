import "./App.css";
import Home from "./routes/Home";
import { Routes, Route } from "react-router-dom";
import Detail from "./routes/Detail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/movie/:id" element={<Detail />}></Route>
    </Routes>
  );
}

export default App;
