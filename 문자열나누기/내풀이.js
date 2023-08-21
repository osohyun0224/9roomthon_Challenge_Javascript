const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lineCount = 0;
let length;
let str;

rl.on('line', (line) => {
    if (lineCount === 0) {
        length = parseInt(line.trim());
        lineCount++;
    } else {
        str = line.trim();
        rl.close();
    }
});

rl.on('close', () => {
    console.log(maxScore(str));
});

function maxScore(s) {
    let max = -Infinity;

    for (let i = 1; i < s.length - 1; i++) {
        for (let j = i + 1; j < s.length; j++) {
            let subs = [s.slice(0, i), s.slice(i, j), s.slice(j)];

            let allPossibleSubs = getAllPossibleSubstrings(s);
            let uniqueSortedSubs = [...new Set(allPossibleSubs)].sort();

            let score = subs.reduce((acc, sub) => {
                return acc + uniqueSortedSubs.indexOf(sub) + 1; 
            }, 0);

            max = Math.max(max, score);
        }
    }

    return max;
}

function getAllPossibleSubstrings(s) {
    let substrings = [];
    for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j <= s.length; j++) {
            substrings.push(s.slice(i, j));
        }
    }
    return substrings;
}
