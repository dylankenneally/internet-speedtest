console.log('Internet speed test');

/* todo:
	- promise for the test, don't use setInterval (design like this will negatively impact the tests)
	- allow the user to select the which server to use? restrict to telstra servers?
	- allow the interval timer to be configured (testing every 1 minute, for now)
	- allow the duration of the test window to be configured, e.g. 1 hour, 24 hours etc. (testing for 10 hours, for now)
	- write an app to visualise the data
		- could use github.io as a viewer - auto push new data that is generated from this app?
	- when I run my tests after development is done:
		- turn off all other internet enabled devices in the house (4 google homes, 2 smart plugs, 4 smart lights, 2 phones, 3 laptops, 1 tablet)
		- use a wired connection to the router?
		- turn wi-fi off the router?
*/

const speedTest = require('speedtest-net');
const fs = require('fs');

const testOptions = {
	maxTime: 5000,
	log: true
};

const storeData = (data) => {
	fs.writeFile(`${__dirname}/output/${data.meta.iteration}.json`, JSON.stringify(data), err => {
		if (err) {
			console.error(`Error writing data for iteration ${data.meta.iteration}: ${err}`);
		}
	});
}

// todo: it's a bit crap to be using this with setInterval, have this return a promise instead
// as it is, you could (in theory) be kicking off a load of tests in parallel, which would effect the test results
// in practice, that won't happen due to the length of the interval - but still, do it properly...
function runAndDump(iteration) {
	console.log(`Running test ${iteration}`);

	const test = speedTest(testOptions);
	const date = new Date().toJSON();
	test.on('data', data => {
		data.meta = {
			iteration: iteration,
			timeStamp: date
		};
		storeData(data);
	});

	test.on('error', err => {
		console.error(`Error obtaining data for iteration ${iteration}: ${err}`);
	});
};

const milliseconds = 60 * 1000; // 1 min
const maxRuns = 600; // 600 iterations @ 1 min = 10 hours
let iteration = 0;
runAndDump(iteration++);

const intervalId = setInterval(() => {
	runAndDump(iteration++);
	if (iteration === maxRuns) {
		clearInterval(intervalId);
	}
}, milliseconds);
