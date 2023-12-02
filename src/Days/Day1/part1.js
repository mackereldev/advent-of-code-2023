import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString()

const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

let sum = 0

lines.split("\n").forEach(line => {
    const chars = line.split("")

    const first = chars.find((char) => nums.includes(char))
    chars.reverse()
    const last = chars.find((char) => nums.includes(char))

    sum += parseInt(first + last)
});

console.log(sum)
