import { useState, useEffect } from "react";

//components
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";

var addrs = window.location.hostname;

function ClockSwitch({ token }) {
	let [clock, setClock] = useState(false);

	var fetch_data = (jsondata) => {
		fetch("http://" + addrs + ":8080/conf", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(jsondata)
		})
			.then((response) => response.json())
			.then((data) => setClock(Boolean(data.status)));
	};

	const onClockChange = (checked) => {
		fetch_data({ token: token, set: { name: "kell", value: checked ? 1 : 0 } });
	};

	useEffect(() => {
		fetch_data({ token: token, status: "kell" });
	});

	return (
		<div>
			<ToggleSwitch id="clock-switch" checked={clock} onChange={onClockChange} small={true} />
			<label htmlFor="clock-switch">Toggle clock</label>
		</div>
	);
}

export default ClockSwitch;
