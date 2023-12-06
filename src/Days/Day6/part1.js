import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
let [times, records] = data.toString().split("\n").map((line) => line.trim()).map((set) => set.split(":").slice(1)[0].trim().split(/\s+/).map((num) => parseInt(num)));

let margins = [];

for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const record = records[i];

    let marginBottom;

    for (let j = 0; j <= Math.floor(time / 2); j++) {
        if (j * (time - j) > record) {
            marginBottom = j;
            break;
        }
    }

    
    const buttonHoldTime = time / 2;
    margins.push((buttonHoldTime - marginBottom) * 2 + 1);
}

console.log(margins.reduce((previous, current) => current * previous));
