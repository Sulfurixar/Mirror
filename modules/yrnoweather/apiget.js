/* eslint-disable prettier/prettier */
const fetch = require("node-fetch");
const fs = require("fs");
//'https://www.yr.no/api/v0/locations/id/2-589580/forecast'
//"https://api.met.no/weatherapi/locationforecast/2.0/compact.json?lat=58.4010&lon=24.4974"
function updateWeatherInfo() {
	console.log("Fetching weather data...");
	fetch("https://www.yr.no/api/v0/locations/id/2-589580/forecast")
		.then((res) => {
			console.log(res.ok);
			console.log(res.status);
			console.log(res.statusText);
			console.log(res.headers.raw());
			console.log(res.headers.get("expires"));
			let expireDate = res.headers.get("expires");
			fs.writeFile(__dirname + "/weatherdataexpires.txt", expireDate, (err) => {
				if (err) {
					throw err;
				}
				console.log("JSON weather expiration date is saved.");
			});
			res = res.json();

			return res;
		})
		.then((res) => {
			const dataString = JSON.stringify(res, null, 4);

			fs.writeFile(__dirname + "/weatherdata.json", dataString, (err) => {
				if (err) {
					throw err;
				}
				console.log("JSON weatherdata is saved.");
			});
		});
}

function tryToUpdateWeather() {
	let data = fs.readFileSync(__dirname + "/weatherdataexpires.txt", "utf-8");
	let expireDate = new Date(data);
	let now = new Date();
	console.log(expireDate);
	console.log(now);
	if (expireDate < now) {
		console.log("Updating weather data...");
		updateWeatherInfo();
	} else {
		console.log("Weather data has not expired yet.");
	}
}

function testfunc() {
	let date = new Date("2021-04-23T16:00:00+03:00");
	let date2 = new Date("2021-04-25T12:46:00+03:00");
	let now = new Date();
	console.log(now);
	console.log(date2);
	console.log(date2 > now);
	console.log(new Date("2021-05-03T11:00:00+03:00") > new Date("2021-05-03T12:00:00+03:00"));
}

testfunc();
