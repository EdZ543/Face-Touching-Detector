import { ToggleButton } from "react-bootstrap";

const Settings = (props: any) => {
  return (
    <div className="flex" id="settings-panel">
      <p>Alert with desktop notification</p>
      <ToggleButton
        id="Notification"
        type="checkbox"
        value="Notification"
        checked={props.notifications}
        variant="outline-primary"
        onChange={(e) => props.setNotifications(e.currentTarget.checked)}
      >
        {props.notifications ? "Yes" : "No"}
      </ToggleButton>

      <br />

      <p>Alert with sound</p>
      <ToggleButton
        id="Sound"
        type="checkbox"
        value="Sound"
        checked={props.sounds}
        variant="outline-primary"
        onChange={(e) => props.setSounds(e.currentTarget.checked)}
      >
        {props.sounds ? "Yes" : "No"}
      </ToggleButton>
    </div>
  );
};

export default Settings;
