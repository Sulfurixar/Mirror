Module.register("errnews", {
	defaults: {
		updateInterval: 10 * 1000 * 60 //reads the file every 10 mins
	},

	start: function () {
		this.count = 0;
		this.newscounter = 0;
		let timer = setInterval(() => {
			if (this.count % 600 == 0) {
				//After how many seconds do we update news data
				this.sendSocketNotification("START", this.config);
			}
			if (this.count % 20 == 0) {
				//For how many seconds does the current selected news stay
				this.updateDom();
				this.newscounter++;
			}

			this.count++;
		}, 1000);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "DATA") {
			this.dataFile = payload[0];
			this.randomArray = payload[1];
			this.updateDom();
		}
	},

	getDom: function () {
		var wrapper = document.createElement("div");

		if (this.dataFile) {
			const title = document.createElement("div");
			title.className = "newsfeed-title bright medium-large light";
			title.innerHTML = this.dataFile[((this.randomArray[this.newscounter % this.randomArray.length] * 5) % (Math.round(this.dataFile.length / 5) * 5)) % this.dataFile.length];
			wrapper.appendChild(title);

			const description = document.createElement("div");
			description.className = "newsfeed-desc medium light";
			description.innerHTML = this.dataFile[((this.randomArray[this.newscounter % this.randomArray.length] * 5 + 2) % (Math.round(this.dataFile.length / 5) * 5)) % this.dataFile.length];
			wrapper.appendChild(description);
		} else {
			wrapper.innerHTML = "No data";
		}
		return wrapper;
	}
});
