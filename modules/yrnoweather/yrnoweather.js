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

	getStyles: function () {
		return ["yrnoweather.css"];
	},

	getDom: function () {
		var wrapper = document.createElement("table");
		wrapper.className = "table";

		if (this.weatherData) {
			let row1 = document.createElement("tr");
			let row2 = document.createElement("tr");
			let row3 = document.createElement("tr");
			let row4 = document.createElement("tr");
			let row5 = document.createElement("tr");
			let row6 = document.createElement("tr");
			let row7 = document.createElement("tr");
			let i = 0;

			//Cloud image
			let weatherImageCell = document.createElement("td");
			weatherImageCell.setAttribute("rowspan", "1");
			weatherImageCell.setAttribute("colspan", "3");
			weatherImageCell.className = "align-left weatherImage table";
			let weatherImageIcon = document.createElement("img");
			weatherImageIcon.setAttribute("height", String(15 * this.config.scale));
			weatherImageIcon.setAttribute("width", String(15 * this.config.scale));
			weatherImageIcon.src = "./modules/yrnoweather/imagessvg/" + String(this.weatherData["shortIntervals"][i]["symbolCode"]["next1Hour"]) + ".svg";
			weatherImageCell.appendChild(weatherImageIcon);

			let temperatureCell = document.createElement("td");
			temperatureCell.className = "temperatureText align-right table";
			temperatureCell.innerHTML = String(this.weatherData["shortIntervals"][i]["temperature"]["value"]) + " °C";
			temperatureCell.setAttribute("rowspan", "1");
			temperatureCell.setAttribute("colspan", "3");

			let relativeHumidityCell = document.createElement("td");
			relativeHumidityCell.className = "small regular table";
			relativeHumidityCell.innerHTML = "Suhteline õhuniiskus:";
			relativeHumidityCell.setAttribute("colspan", "2");

			let relativeHumidityInfo = document.createElement("td");
			relativeHumidityInfo.className = "small regular align-right table";
			relativeHumidityInfo.innerHTML = this.weatherData["shortIntervals"][i]["humidity"]["value"] + "%";

			let cloudFractionCell = document.createElement("td");
			cloudFractionCell.className = "small regular table";
			cloudFractionCell.innerHTML = "Pilvede osakaal:";
			cloudFractionCell.setAttribute("colspan", "2");

			let cloudFractionInfo = document.createElement("td");
			cloudFractionInfo.className = "small regular align-right table";
			cloudFractionInfo.innerHTML = this.weatherData["shortIntervals"][i]["cloudCover"]["value"] + "%";

			let windSpeedCell = document.createElement("td");
			windSpeedCell.className = "small regular table";
			windSpeedCell.innerHTML = "Tuule kiirus:";
			windSpeedCell.setAttribute("colspan", "2");

			let windSpeedInfo = document.createElement("td");
			windSpeedInfo.className = "small regular align-right table";
			windSpeedInfo.innerHTML = this.weatherData["shortIntervals"][i]["wind"]["speed"] + "(" + this.weatherData["shortIntervals"][i]["wind"]["gust"] + ")" + " m/s";

			let windDirectionCell = document.createElement("td");
			windDirectionCell.className = "small regular table";
			windDirectionCell.innerHTML = "Tuule suund:";
			windDirectionCell.setAttribute("colspan", "2");

			let windDirectionIcon = document.createElement("img");
			windDirectionIcon.setAttribute("height", String(5 * this.config.scale));
			windDirectionIcon.setAttribute("width", String(5 * this.config.scale));
			windDirectionIcon.src = "./modules/yrnoweather/images/" + this.deg2Cardinal(this.weatherData["shortIntervals"][i]["wind"]["direction"]) + ".png";
			windDirectionIcon.className = "directionImage";

			let windDirectionInfo = document.createElement("td");
			windDirectionInfo.className = "small regular align-right table";
			windDirectionInfo.innerHTML = this.deg2Cardinal(this.weatherData["shortIntervals"][i]["wind"]["direction"]);

			let precipitationCell = document.createElement("td");
			precipitationCell.className = "small regular table";
			precipitationCell.innerHTML = "Sademete hulk (järgmised 6h):";
			precipitationCell.setAttribute("colspan", "2");

			let precipitationInfo = document.createElement("td");
			precipitationInfo.className = "small regular align-right table";
			precipitationInfo.innerHTML = this.weatherData["longIntervals"][i]["precipitation"]["value"] + " mm";

			let emptyCell = document.createElement("td");
			emptyCell.className = "temperatureText align-right table";
			emptyCell.innerHTML = "";

			row1.appendChild(weatherImageCell);
			row1.appendChild(emptyCell);
			row1.appendChild(temperatureCell);

			row3.appendChild(precipitationCell);
			row3.appendChild(precipitationInfo);

			row4.appendChild(relativeHumidityCell);
			row4.appendChild(relativeHumidityInfo);

			row5.appendChild(cloudFractionCell);
			row5.appendChild(cloudFractionInfo);

			row6.appendChild(windSpeedCell);
			row6.appendChild(windSpeedInfo);

			row7.appendChild(windDirectionCell);
			windDirectionInfo.appendChild(windDirectionIcon);
			row7.appendChild(windDirectionInfo);

			wrapper.appendChild(row1);
			wrapper.appendChild(row2);
			wrapper.appendChild(row3);
			wrapper.appendChild(row4);
			wrapper.appendChild(row5);
			wrapper.appendChild(row6);
			wrapper.appendChild(row7);
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
