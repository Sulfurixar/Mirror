import React from "react";
import ClockSwitch from "../ClockSwitch/ClockSwitch.js";
import WeatherSwitch from "../WeatherSwitch/WeatherSwitch.js";
import NewsSwitch from "../NewsSwitch/NewsSwitch.js";

export default function Dashboard({ token }) {
	return (
		<div>
			<h2>Dashboard</h2>
			<ClockSwitch token={token} />
			<WeatherSwitch token={token} />
			<NewsSwitch token={token} />
		</div>
	);
}
