import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
      <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
