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
			let output_data = null;

			if (!err) {
				output_data = data.toString().concat("\n").split("\n");
			}
			this.sendSocketNotification("DATA", output_data);
		});
	}
});
