import { useState } from "react";

//components
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";

function ClockSwitch() {

  let [clock, setClock] = useState(false);
  const onClockChange = (checked) => {
    setClock(checked);
  }

  return (
    <div>
      <ToggleSwitch id="clock-switch" checked={ clock } onChange={ onClockChange } small={true} />
      <label htmlFor="clock-switch">Toggle clock</label>
    </div>
  );
}

export default ClockSwitch;
