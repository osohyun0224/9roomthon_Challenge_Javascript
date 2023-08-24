const readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let input = [];
let N, K;
let map = [];
let bombValues = [];
let bombs = [];

rl.on('line', (line) => {
    input.push(line);
    if (input.length === parseInt(input[0].split(" ")[0]) + parseInt(input[0].split(" ")[1]) + 1) {
        rl.close();
    }
});

rl.on('close', () => {
    [N, K] = input[0].split(" ").map(Number);

    for (let i = 1; i <= N; i++) {
        map.push(input[i].split(" "));
        bombValues.push(new Array(N).fill(0));
    }

    for (let i = N + 1; i <= N + K; i++) {
        bombs.push(input[i].split(" ").map(Number));
    }

    for (let [y, x] of bombs) {
        applyBomb(y-1, x-1);
    }

    let maxBombValue = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (bombValues[i][j] > maxBombValue) {
                maxBombValue = bombValues[i][j];
            }
        }
    }

    console.log(maxBombValue);
});

function applyBomb(y, x) {
    const dx = [0, 0, -1, 1];
    const dy = [-1, 1, 0, 0];

    for (let dir = 0; dir < 4; dir++) {
        const ny = y + dy[dir];
        const nx = x + dx[dir];

        if (ny >= 0 && ny < N && nx >= 0 && nx < N) {
            if (map[ny][nx] === "0") {
                bombValues[ny][nx] += 1;
            } else if (map[ny][nx] === "@") {
                bombValues[ny][nx] += 2;
            }
        }
    }

    if (map[y][x] === "0") {
        bombValues[y][x] += 1;
    } else if (map[y][x] === "@") {
        bombValues[y][x] += 2;
    }
}