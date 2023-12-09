import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split("\n").map((line) => line.trim());

const histories = lines.map((line) => line.split(" ").map((history) => +history));

console.log(histories.reduce((previous, current) => previous + getNextValueInHistory(current), 0));

function getNextValueInHistory(history) {
    const allSequences = [[...history]];
    
    getDifferences(history);

    let forwardExtrapolation = 0;

    for (let i = 1; i < allSequences.length; i++) {
        forwardExtrapolation += allSequences[i].at(-1);
    }

    return forwardExtrapolation;

    function getDifferences(sequence) {
        const diffSequence = [];
        let allZeros = true;
    
        for (let i = 1; i < sequence.length; i++) {
            const diff = sequence[i] - sequence[i - 1];
            diffSequence.push(diff);
    
            if (diff != 0) {
                allZeros = false;
            }
        }

        allSequences.unshift(diffSequence);
    
        if (!allZeros) {
            getDifferences(diffSequence);
        }
    }
}
