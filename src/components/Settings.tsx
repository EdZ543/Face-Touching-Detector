import { ToggleButton } from "react-bootstrap";
import { useState } from "react";

const Settings = () => {
  const [sound, setSound] = useState(false);
  const [notification, setNotification] = useState(false);

  return (
    <div className="flex" id="settings-panel">
      <p>Alert with sound</p>
      <ToggleButton
        id="Sound"
        type="checkbox"
        value="Sound"
        checked={sound}
        variant="outline-primary"
        onChange={(e) => setSound(e.currentTarget.checked)}
      >
        {sound ? "Yes" : "No"}
      </ToggleButton>

      <br />

      <p>Alert with desktop notification</p>
      <ToggleButton
        id="Notification"
        type="checkbox"
        value="Notification"
        checked={notification}
        variant="outline-primary"
        onChange={(e) => setNotification(e.currentTarget.checked)}
      >
        {notification ? "Yes" : "No"}
      </ToggleButton>
    </div>
  );
};

export default Settings;
