import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainBoard from "./components/MainBoard";
import Game from "./components/Game";
import MainBoardTest from "./components/MainBoardTest";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* <Route path="/mainboard" element={<MainBoard />}></Route> */}
          <Route path="/mainboard" element={<MainBoardTest />}></Route>
          <Route path="/game/:id" element={<Game />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
