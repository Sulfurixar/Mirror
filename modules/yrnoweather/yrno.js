/* eslint-disable prettier/prettier */
const fetch = require("node-fetch");
const fs = require("fs");
const { Agent } = require("http");

function updateWeatherInfo() {
	fetch("https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=58.4010&lon=24.4974")
		.then((res) => {
			console.log(res.ok);
			console.log(res.status);
			console.log(res.statusText);
			console.log(res.headers.raw());
			console.log(res.headers.get("content-type"));
			return res.json();
		})
		.then((res) => {
			const dataString = JSON.stringify(res, null, 4);

			//Change this line for Linux afterwards.
			fs.writeFile(__dirname + "\\weatherdatatest.json", dataString, (err) => {
				if (err) {
					throw err;
				}
				console.log("JSON weatherdata is saved.");
			});
		});
}

function checkDataValidity(filename) {
	let data = fs.readFileSync(filename, "utf-8");
	let weatherData = JSON.parse(data.toString());

	console.log(weatherData);
}
updateWeatherInfo();
