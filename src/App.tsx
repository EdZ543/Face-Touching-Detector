import "./App.css";
import Webcam from "./components/Webcam";
import Settings from "./components/Settings";
import { useEffect, useState } from "react";
import * as localForage from "localforage";

function App() {
  const [notifications, setNotifications] = useState(false);
  const [sounds, setSounds] = useState(false);

  useEffect(() => {
    localForage.getItem("notifications").then((value) => {
      if (value !== null) setNotifications(value as boolean);
    });

    localForage.getItem("sounds").then((value) => {
      if (value !== null) setSounds(value as boolean);
    });
  }, [notifications, sounds]);

  function setNotificationsSync(x: boolean) {
    if (x && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    localForage.setItem("notifications", x);
    setNotifications(x);
  }

  function setSoundsSync(x: boolean) {
    localForage.setItem("sounds", x);
    setSounds(x);
  }

  return (
    <div className="flex App">
      <Settings
        sounds={sounds}
        setSounds={setSoundsSync}
        notifications={notifications}
        setNotifications={setNotificationsSync}
      />
      <div className="flex" id="webcam-panel">
        <Webcam notifications={notifications} sounds={sounds} />
      </div>
    </div>
  );
}

export default App;
