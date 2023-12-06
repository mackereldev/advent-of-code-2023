import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
let [time, record] = data.toString().split("\n").map((line) => line.trim()).map((set) => parseInt(set.split(":").slice(1)[0].replace(/\s/g, "")));

let marginBottom;

for (let j = 0; j <= Math.floor(time / 2); j++) {
    if (j * (time - j) > record) {
        marginBottom = j;
        break;
    }
}

const buttonHoldTime = time / 2;
console.log((buttonHoldTime - marginBottom) * 2 + 1);
