var spawn = require('child_process').spawn;
const path = require('path');

file = path.join(__dirname, "/py/main.py");

pyProcess = spawn('python', [file], {
	detached: true
});

pyProcess.stdout.on("data", (data) => {
	console.log(data.toString());
});

pyProcess.stderr.on("data", (data) => {
	console.log("error: " +data.toString());
});

pyProcess.on("close", (code) => {
	console.log("Gesture control is stopped with code: " + code.toString());
});
