import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split("\n").map((line) => line.trim())

let totalCardCount = 0;

let copies = {};

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let [winningNumbers, numbers] = line.split(": ")[1].split(" | ").map((set) => set.trim().split(/\s+/));

    const drawCount = 1 + (copies[i] || 0);
    getCardScore(i, numbers, winningNumbers, drawCount);
    totalCardCount += drawCount;
}

function getCardScore(card, numbers, winningNumbers, drawCount) {
    for (let i = 0; i < drawCount; i++) {
        let winCount = 0;
        for (let j = 0; j < numbers.length; j++) {
            if (winningNumbers.includes(numbers[j])) {
                winCount++;
            }
        }
        propogateCopies(card, winCount);
    }
}

function propogateCopies(winningCard, winCount) {
    for (let i = 0; i < winCount; i++) {
        const key = (winningCard + i + 1).toString();

        if (copies[key]) {
            copies[key]++;
        } else {
            copies[key] = 1;
        }
    }
}

console.log(totalCardCount);
