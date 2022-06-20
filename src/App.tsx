import React from "react";
import { Button, Container, Nav, Navbar, ToggleButton } from "react-bootstrap";
import "./App.css";
import Webcam from "./components/Webcam";
import Settings from "./components/Settings";

function App() {
  return (
    <div className="flex App">
      <Settings />
      <div className="flex" id="webcam-panel">
        <Webcam />
      </div>
    </div>
  );
}

export default App;
