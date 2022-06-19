import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import Webcam from "./components/Webcam";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Face Touching Detector</Navbar.Brand>
        </Container>
      </Navbar>
      <Container id="webcam-container">
        <Webcam />
      </Container>
    </div>
  );
}

export default App;
