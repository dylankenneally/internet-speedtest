console.log('Internet speed test');

const speedTest = require('speedtest-net');

const options = {
	maxTime: 5000,
	log: true
};

function runStandardTest() {
	const test = speedTest(options);
	test.on('data', data => {
		console.log('Data');
		console.dir(data);
	});
	test.on('error', err => {
		console.error('Error:', err);
	});
}

function runVisualTest() {
	speedTest.visual(options, (err, data) => {
		console.dir(data);
	});
}

function runFull() {
	const test = speedTest();
	test.on('done', dataOverload => {
		console.dir(dataOverload);
	});
}

runStandardTest();
//runVisualTest();
// runFull();
