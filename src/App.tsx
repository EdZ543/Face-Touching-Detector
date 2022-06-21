import "./App.css";
import Webcam from "./components/Webcam";
import Settings from "./components/Settings";
import { useState } from "react";

function App() {
  const [notifications, setNotifications] = useState(false);
  const [sounds, setSounds] = useState(false);

  function notify() {
    if (notifications) new Notification("Face Touching Detected!");
  }

  return (
    <div className="flex App">
      <Settings
        sounds={sounds}
        setSounds={setSounds}
        notifications={notifications}
        setNotifications={setNotifications}
      />
      <div className="flex" id="webcam-panel">
        <Webcam notify={notify} />
      </div>
    </div>
  );
}

export default App;
