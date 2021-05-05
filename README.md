# Smart Mirror
Requirements:
* Raspberry PI 3 B+
* MongoDB
* XScreenSaver
* PIR sensor on pin 7 (GPIO 4)
* Wi-Fi connection

Webserver interactions are handled by a ReactJS application and server.js in _webserver_.
ReactJS listens on port 3000, ExpressJS listens on port 8080.

Module toggling and checking is done by ModuleSwitch.js in _config_.
``ModuleSwitch(modulename, value, mode)``

To run the mirror you need to run ``npm install`` in both main directory and _webserver_.
Finally, run start.sh that is in the main directory.
