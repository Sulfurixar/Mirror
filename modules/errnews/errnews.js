Module.register("errnews", {
	defaults: {
		updateInterval: 1 * 30 * 1000 //reads the file every 30 mins
	},

	start: function () {
		this.count = 0;
		this.newscounter = 0;
		let timer = setInterval(() => {
			if (this.count % 600 == 0) {
				this.sendSocketNotification("START", this.config);
			}
			if (this.count % 20 == 0) {
				this.updateDom();
				this.newscounter++;
			}

			this.count++;
		}, 1000);
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "DATA") {
			this.dataFile = payload;
			this.updateDom();
		}
	},

	getDom: function () {
		var wrapper = document.createElement("div");
		if (this.dataFile) {
			wrapper.innerHTML =
				this.dataFile[(this.newscounter * 5) % (Math.round(this.dataFile.length / 5) * 5)] +
				"<BR>" +
				this.dataFile[(this.newscounter * 5 + 2) % (Math.round(this.dataFile.length / 5) * 5)] +
				"<BR>" +
				"Newscount:" +
				this.newscounter +
				"<BR>" +
				"Newscount*5:" +
				this.newscounter * 5 +
				"<BR>" +
				"dataFile.length:" +
				this.dataFile.length +
				"<BR>" +
				"tehe:" +
				((this.newscounter * 5) % (Math.round(this.dataFile.length / 5) * 5));
		} else {
			wrapper.innerHTML = "No data";
		}
		return wrapper;
	}
});
