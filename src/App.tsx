import "./App.css";
import Webcam from "./components/Webcam";
import Settings from "./components/Settings";
import { useState } from "react";

function App() {
  const [notifications, setNotifications] = useState(false);
  const [sounds, setSounds] = useState(false);

  return (
    <div className="flex App">
      <Settings
        sounds={sounds}
        setSounds={setSounds}
        notifications={notifications}
        setNotifications={setNotifications}
      />
      <div className="flex" id="webcam-panel">
        <Webcam notifications={notifications} sounds={sounds} />
      </div>
    </div>
  );
}

export default App;
