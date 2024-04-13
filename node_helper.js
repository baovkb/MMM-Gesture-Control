var NodeHelper = require("node_helper");
var spawn = require('child_process').spawn;
var path = require('path');

module.exports = NodeHelper.create({
	pyProcess: null,

	init(){
		console.log("init module helper SampleModule");
	},

	start() {
		console.log('Starting module helper:' +this.name);
	},

	stop(){
		console.log('Stopping module helper: ' +this.name);
	},

	socketNotificationReceived(notification, payload) {
		// if config message from module
		if (notification === "CONFIG") {
			this.config=payload;
		} 
		if (notification === "Start") {
			this.runGesture();
		} else if (notification = "Restart") {
			this.reStart();
		}
	},

	runGesture: function() {
		file = path.join(__dirname, "/py/main.py");
		
		this.pyProcess = spawn('python', [file], {
			detached: true
		});
		
		this.sendSocketNotification("changeState", true);
		
		this.pyProcess.stdout.on("data", (data) => {
			gesture = this.mapGesture(data.toString().trim());
			if (gesture !== "") {
				this.sendSocketNotification(gesture);
			}
		});
		
		this.pyProcess.stderr.on("data", (data) => {
			console.log("error: " +data.toString());
			this.pyProcess = null;
			this.sendSocketNotification("changeState", false);
			
		});
		
		this.pyProcess.stdout.on("close", (code) => {
			console.log("Gesture control is stopped with code: " + code);
			this.pyProcess = null;
			this.sendSocketNotification("changeState", false);
		})
	},
	
	mapGesture: function(code) {
		map = {
			"1": "Right",
			"2": "Left",
			"4": "Up",
			"8": "Down",
			"16": "Forward",
			"32": "Backward",
			"64": "Clockwise",
			"128": "Anti-Clockwise",
			"256":"Wave",
		};
		
		return map.hasOwnProperty(code) ? map[code] : "";
	},
	
	reStart: function() {
		this.stopGesture();
		this.runGesture();
	},
	
	stopGesture: function() {
		if (this.pyProcess !== null) {
			this.pyProcess.kill();
		}
		this.sendSocketNotification("changeState", false);
	},

});
