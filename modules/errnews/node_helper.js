const NodeHelper = require("node_helper");
const fs = require("fs");
const { spawn } = require("child_process");

module.exports = NodeHelper.create({
	socketNotificationReceived: function (notification, payload) {
		if (notification === "START") {
			this.config = payload;
			this.refreshAndReadData();
		}
	},

	refreshAndReadData: function () {
		//Run python script to refresh newsdata.txt
		const childPython = spawn("python3", ["/home/eltrigs/Mirror/Mirror/modules/errnews/scraper.py"]);
		childPython.stdout.on("data", (data) => {
			console.log(`stdout: ${data}`);
		});
		childPython.stderr.on("data", (data) => {
			console.error(`stderr: ${data}`);
		});
		childPython.on("close", (code) => {
			console.log(`child process exited with code ${code}`);
		});

		//to read a file to do the following
		fs.readFile("/home/eltrigs/Mirror/Mirror/modules/errnews/newsdata.txt", "utf8", (err, data) => {
			let full_output_data = null;

			if (!err) {
				let output_data = data.toString().concat("\n").split("\n");
				let random_array = this.sendRandomArray(output_data);
				full_output_data = [output_data, random_array];
			}
			this.sendSocketNotification("DATA", full_output_data);
		});
	},

	sendRandomArray: function (output_data) {
		for (var a = [], i = 0; i < output_data.length / 5; ++i) a[i] = i;

		function shuffle(array) {
			var tmp,
				current,
				top = array.length;
			if (top)
				while (--top) {
					current = Math.floor(Math.random() * (top + 1));
					tmp = array[current];
					array[current] = array[top];
					array[top] = tmp;
				}
			return array;
		}

		return shuffle(a);
	}
});
