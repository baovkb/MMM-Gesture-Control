
Module.register("MMM-Gesture-Control", {
	config:null,
	isRunning: false,

	defaults: {
	},

	init: function(){
	},

	start: function(){
	},

	getScripts: function() {
	return	[
		]
	}, 

	getStyles: function() {
		return 	[
			"style.css"
		]
	},

	getHeader: function() {
		return this.data.header + " Foo Bar";
	},

	notificationReceived: function(notification, payload, sender) {
		if(notification==="ALL_MODULES_STARTED"){
			this.sendSocketNotification("CONFIG",this.config)
		}
		if (notification==="DOM_OBJECTS_CREATED") {
			this.sendSocketNotification("Start");
		} else if (notification === "MMM-Gesture-Control") {
			if (payload.type === "Restart") {
				this.sendSocketNotification("Restart");
			}
		}
		
	},

	socketNotificationReceived: function(notification, payload) {
		switch(notification) {
			case "Right":
				this.sendNotification("EXT_PAGES-INCREMENT");
				break;
			case "Left":
				this.sendNotification("EXT_PAGES-DECREMENT");
				break;
			case "Clockwise":
				this.sendNotification("GA_ACTIVATE");
				break;
			case "Up":
				this.sendNotification("MMM-Screen-Control", {
					type: "DISPLAY_SCREEN"
				});
				break;
			case "Down":
				this.sendNotification("MMM-Screen-Control", {
					type: "HIDE_SCREEN"
				});
				break;
			case "changeState":
				this.isRunning = payload;
				console.log("isRunning: " + this.isRunning);
				break;
			default:
				break;
		}

	},

	suspend: function(){

	},

	resume: function(){

	},

	getDom: function() {
		var wrapper = document.createElement("div");

		return wrapper;
	},

})
