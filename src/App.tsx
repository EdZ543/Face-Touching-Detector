import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import Webcam from "./components/Webcam";

function App() {
  return (
    <div className="App">
      <Webcam />
    </div>
  );
}

export default App;
