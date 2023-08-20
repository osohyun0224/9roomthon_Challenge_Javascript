const readline = require('readline');
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let lines = [];
rl.on('line', (line) => {
	lines.push(line);
});

rl.on('close', () => {
	const [n, k] = lines[0].split(' ').map(Number);
	const numbers = lines[1].split(' ').map(Number);

	console.log(findKthNumber(n, k, numbers));
});

function sortByBinaryOnesAndValue(numbers) {
	return numbers.sort((a, b) => {
		const aOnes = a.toString(2).split("").filter(bit => bit === "1").length;
		const bOnes = b.toString(2).split("").filter(bit => bit === "1").length;

		if (aOnes !== bOnes) {
			return bOnes - aOnes;
		}

		return b - a;
	});
}


function findKthNumber(n, k, numbers) {
	const sortedNumbers = sortByBinaryOnesAndValue(numbers);
	return sortedNumbers[k - 1];
}
