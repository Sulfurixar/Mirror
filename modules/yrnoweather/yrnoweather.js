Module.register("yrnoweather", {
	defaults: {
		updateInterval: 1 * 30 * 1000, //reads the file every x ms
		scale: 5
	},

	start: function () {
		this.count = 0;
		setInterval(() => {
			if (this.count % 10 == 0) {
				this.sendSocketNotification("WEATHERUPDATE", this.config);
			}

			this.count++;
		}, 1000);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "WEATHERDATA") {
			this.weatherData = payload;
			//this.data = payload[1];
			this.updateDom();
		}
	},

	getDom: function () {
		var wrapper = document.createElement("table");
		wrapper.style = "4 px solid white";

		if (this.weatherData) {
			let row1 = document.createElement("tr");
			let row2 = document.createElement("tr");
			let row3 = document.createElement("tr");

			//Cloud image
			let weatherImageCell = document.createElement("td");
			weatherImageCell.setAttribute("rowspan", "2");
			let weatherImageIcon = document.createElement("img");
			weatherImageIcon.setAttribute("height", String(15 * this.config.scale));
			weatherImageIcon.setAttribute("width", String(15 * this.config.scale));
			weatherImageIcon.src = "./modules/yrnoweather/images/c04n.gif";
			weatherImageCell.appendChild(weatherImageIcon);

			//Empty for now
			let r1c2 = document.createElement("td");
			r1c2.innerHTML = "";

			//Empty for now
			let r1c3 = document.createElement("td");
			r1c3.innerHTML = "";

			//Empty for now
			let r1c4 = document.createElement("td");
			r1c4.innerHTML = "";

			//Day text
			let r1c5 = document.createElement("td");
			r1c5.innerHTML = "Today";
			r1c5.className = "regular bright medium align-right";

			//Temperature icon
			let r2c2 = document.createElement("td");
			let temperatureImageIcon = document.createElement("img");
			temperatureImageIcon.setAttribute("height", String(5 * this.config.scale));
			temperatureImageIcon.setAttribute("width", String(5 * this.config.scale));
			temperatureImageIcon.src = "./modules/yrnoweather/images/high.png";
			r2c2.appendChild(temperatureImageIcon);

			//Temperature amount
			let r2c3 = document.createElement("td");
			r2c3.className = "small";
			r2c3.innerHTML = "13 °C";

			//Precipitation icon
			let r2c4 = document.createElement("td");
			let precipipitationImageIcon = document.createElement("img");
			precipipitationImageIcon.setAttribute("height", String(5 * this.config.scale));
			precipipitationImageIcon.setAttribute("width", String(5 * this.config.scale));
			precipipitationImageIcon.src = "./modules/yrnoweather/images/wet.png";
			r2c4.appendChild(precipipitationImageIcon);
			//Precipitation amount
			let r2c5 = document.createElement("td");
			r2c5.innerHTML = "40%";

			//Maybe put cloud area fraction?
			let imageText = document.createElement("td");
			imageText.innerHTML = this.weatherData["properties"]["timeseries"][0]["data"]["next_6_hours"]["summary"]["symbol_code"];

			//Relative humidity
			let r3c2 = document.createElement("td");
			let relhumImageIcon = document.createElement("img");
			relhumImageIcon.setAttribute("height", String(5 * this.config.scale));
			relhumImageIcon.setAttribute("width", String(5 * this.config.scale));
			relhumImageIcon.src = "./modules/yrnoweather/images/humid.png";
			r3c2.appendChild(relhumImageIcon);
			//Relative humidity as %
			let r3c3 = document.createElement("td");
			r3c3.innerHTML = "60%";

			//Wind direction image
			let r3c4 = document.createElement("td");
			let windDirectionIcon = document.createElement("img");
			windDirectionIcon.setAttribute("height", String(5 * this.config.scale));
			windDirectionIcon.setAttribute("width", String(5 * this.config.scale));
			windDirectionIcon.src = "./modules/yrnoweather/images/" + this.deg2Cardinal(55.0) + ".png";
			r3c4.appendChild(windDirectionIcon);
			//Wind speed as m/s
			let r3c5 = document.createElement("td");
			r3c5.innerHTML = "10 m/s";

			row1.appendChild(weatherImageCell);
			row1.appendChild(r1c2);
			row1.appendChild(r1c3);
			row1.appendChild(r1c4);
			row1.appendChild(r1c5);

			row2.appendChild(r2c2);
			row2.appendChild(r2c3);
			row2.appendChild(r2c4);
			row2.appendChild(r2c5);

			row3.appendChild(imageText);
			row3.appendChild(r3c2);
			row3.appendChild(r3c3);
			row3.appendChild(r3c4);
			row3.appendChild(r3c5);

			wrapper.appendChild(row1);
			wrapper.appendChild(row2);
			wrapper.appendChild(row3);
		} else {
			wrapper.innerHTML = "No data. Loading...";
		}
		return wrapper;
	},

	deg2Cardinal: function (deg) {
		if (deg > 11.25 && deg <= 33.75) {
			return "NNE";
		} else if (deg > 33.75 && deg <= 56.25) {
			return "NE";
		} else if (deg > 56.25 && deg <= 78.75) {
			return "ENE";
		} else if (deg > 78.75 && deg <= 101.25) {
			return "E";
		} else if (deg > 101.25 && deg <= 123.75) {
			return "ESE";
		} else if (deg > 123.75 && deg <= 146.25) {
			return "SE";
		} else if (deg > 146.25 && deg <= 168.75) {
			return "SSE";
		} else if (deg > 168.75 && deg <= 191.25) {
			return "S";
		} else if (deg > 191.25 && deg <= 213.75) {
			return "SSW";
		} else if (deg > 213.75 && deg <= 236.25) {
			return "SW";
		} else if (deg > 236.25 && deg <= 258.75) {
			return "WSW";
		} else if (deg > 258.75 && deg <= 281.25) {
			return "W";
		} else if (deg > 281.25 && deg <= 303.75) {
			return "WNW";
		} else if (deg > 303.75 && deg <= 326.25) {
			return "NW";
		} else if (deg > 326.25 && deg <= 348.75) {
			return "NNW";
		} else {
			return "N";
		}
	}
});
