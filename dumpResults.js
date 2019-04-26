const fs = require('fs');

let index = 0;
let avgDown = 0, avgUp = 0;

try {
	while (fs.existsSync(`${__dirname}/output/${index}.json`)) {
		const data = JSON.parse(fs.readFileSync(`${__dirname}/output/${index}.json`, 'utf8'));
		const id = data.meta.iteration.toString();
		const timeStamp = new Date(data.meta.timeStamp).toString();
		const down = data.speeds.download.toString();
		const up = data.speeds.upload.toString();
		avgDown += data.speeds.download;
		avgUp += data.speeds.upload;

		console.log(`${id.padEnd(4)} ${timeStamp.padEnd(45)} download: ${down.padStart(7)} Mbps   upload: ${up.padStart(7)} Mbps`);
		++index;
	}
} catch (error) {
	console.error(`Something went wrong at index ${index}: ${error}`);
}

avgDown /= index;
avgUp /= index;
console.log(`Average of ${index} runs @ download: ${avgDown.toString().padStart(7)} Mbps   upload: ${avgUp.toString().padStart(7)} Mbps`);
