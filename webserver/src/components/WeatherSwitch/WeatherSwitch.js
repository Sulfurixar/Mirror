import { useState, useEffect } from "react";

//components
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";

var addrs = window.location.hostname;

function WeatherSwitch({ token }) {
	let [weather, setWeather] = useState(false);

	var fetch_data = (jsondata) => {
		fetch("http://" + addrs + ":8080/conf", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(jsondata)
		})
			.then((response) => response.json())
			.then((data) => setWeather(Boolean(data.status)));
	};

	const onWeatherChange = (checked) => {
		fetch_data({ token: token, set: { name: "yrnoweather", value: checked ? 1 : 0 } });
	};

	useEffect(() => {
		fetch_data({ token: token, status: "yrnoweather" });
	});

	return (
		<div>
			<ToggleSwitch id="weather-switch" checked={weather} onChange={onWeatherChange} small={true} />
			<label htmlFor="weather-switch">Toggle weather</label>
		</div>
	);
}

export default WeatherSwitch;
