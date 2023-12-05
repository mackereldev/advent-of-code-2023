import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split("\n").map((line) => line.trim())

let sum = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let [ winningNumbers, numbers ] = line.split(": ")[1].split(" | ").map((set) => set.trim().split(/\s+/));

    sum += getCardScore(numbers, winningNumbers);
}

function getCardScore(numbers, winningNumbers) {
    let winCount = 0;

    for (let i = 0; i < numbers.length; i++) {
        if (winningNumbers.includes(numbers[i])) {
            winCount++;
        }
    }

    if (winCount > 0) {
        return 2 ** (winCount - 1);
    } else {
        return 0;
    }
}

console.log(sum);
