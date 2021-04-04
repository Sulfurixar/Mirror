Module.register("kell", {
	defaults: {
		updateInterval: 1 * 30 * 1000 //reads the file every 30 mins
	},

	start: function () {
		this.count = 0;
		this.newscounter = 0;

		let timer = setInterval(() => {
			this.updateDom();
		}, 1000);
	},

	getDom: function () {
		var wrapper = document.createElement("div");
		let datetime = new Date();
		let day;
		switch (datetime.getDay()) {
			case 0:
				day = "Pühapäev";
				break;
			case 1:
				day = "Esmaspäev";
				break;
			case 2:
				day = "Teisipäev";
				break;
			case 3:
				day = "Kolmapäev";
				break;
			case 4:
				day = "Neljapäev";
				break;
			case 5:
				day = "Reede";
				break;
			case 6:
				day = "Laupäev";
		}

		let month;
		switch (datetime.getMonth()) {
			case 0:
				month = "jaanuar";
				break;
			case 1:
				month = "veebruar";
				break;
			case 2:
				month = "märts";
				break;
			case 3:
				month = "aprill";
				break;
			case 4:
				month = "mai";
				break;
			case 5:
				month = "juuni";
				break;
			case 6:
				month = "juuli";
				break;
			case 7:
				month = "august";
				break;
			case 8:
				month = "september";
				break;
			case 9:
				month = "oktoober";
				break;
			case 10:
				month = "november";
				break;
			case 11:
				month = "detsember";
				break;
		}

		let date = datetime.getDate();
		// current year
		let year = datetime.getFullYear();

		// current hours
		let hours = datetime.getHours();

		// current minutes
		let minutes = datetime.getMinutes();

		// current seconds
		let seconds = datetime.getSeconds();

		var dateWrapper = document.createElement("div");
		var timeWrapper = document.createElement("div");
		var secondsWrapper = document.createElement("sup");
		// Style Wrappers
		dateWrapper.className = "date normal medium";
		timeWrapper.className = "time bright large light";
		secondsWrapper.className = "dimmed";

		dateWrapper.innerHTML = day + ", " + String(date) + ". " + month + " " + String(year);
		wrapper.appendChild(dateWrapper);

		timeWrapper.innerHTML = hours + ":" + minutes;

		secondsWrapper.innerHTML = ("0" + String(seconds)).slice(-2); //keep last 2 digits
		timeWrapper.appendChild(secondsWrapper);

		wrapper.appendChild(timeWrapper);

		return wrapper;
	}
});
