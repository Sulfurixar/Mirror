var gpio = require("onoff").Gpio;
const { exec } = require("child_process");
var PIR = new gpio(4, "in");
var c = 0;
var last = 0;

function pir() {
	PIR.read((err, res) => {
		if (err) throw err;
		//    console.log(res)
		if (res !== last) {
			//      console.log(c)
			last = res;
			if (res) {
				console.log("Turning on screen.");
				//        exec("tvservice -p")
				//        exec("xset -display :0 dpms force on")
				exec("xscreensaver-command -display :0 -deactivate");
			} else {
				// in case we need to forcibly do that - for now it turns off on its own when 10 minutes pass
				console.log("Turning off screen.");
				exec("xscreensaver-command -display :0 -activate");
				//        exec("xset -display :0 dpms force off")
				//        exec("tvservice -o")
			}
		}
	});
	setTimeout(pir, 1000);
}

setTimeout(pir, 1000);
