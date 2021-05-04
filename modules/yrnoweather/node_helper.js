const NodeHelper = require("node_helper");
const fs = require("fs");
const fetch = require("node-fetch");

module.exports = NodeHelper.create({
	socketNotificationReceived: function (notification, payload) {
		if (notification === "WEATHERUPDATE") {
			this.config = payload;
			this.tryToUpdateWeather();
		}
	},

	updateWeatherInfo: function () {
		console.log("Fetching weather data from API...");

		//Change the part after /id/ to your desired location 2-588409 for Tallinn
		fetch("https://www.yr.no/api/v0/locations/id/2-588409/forecast") //ID from yrno website
			.then((res) => {
				console.log("Status:" + res.status); //should be 200, if everything went well
				console.log("New weather expiration date: " + res.headers.get("expires"));
				let expireDate = res.headers.get("expires");
				fs.writeFile(__dirname + "/weatherdataexpires.txt", expireDate, (err) => {
					if (err) {
						throw err;
					}
					console.log("New weather expiration date has been saved.");
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
					console.log("JSON weatherdata has been saved.");
				});
			});
	},

	tryToUpdateWeather: function () {
		let expirefile = fs.readFileSync(__dirname + "/weatherdataexpires.txt", "utf-8");
		let expireDate = new Date(expirefile);
		let now = new Date();
		if (expireDate < now) {
			console.log("Updating weather data...");
			this.updateWeatherInfo();
		}
		//k6ige huvitavam on see, kas updateWeatherInfo ja need järgmised read suudavad koostööd teha
		//sest nad m6lemad loevad/kirjutavad sama faili asynkroonselt
		fs.readFile(__dirname + "/weatherdata.json", (err, data) => {
			if (err) throw err;
			let weatherData = JSON.parse(data);
			this.sendSocketNotification("WEATHERDATA", weatherData);
		});
	}
});
