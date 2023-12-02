import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString()

const nums = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
]

let sum = 0

lines.split("\n").forEach(line => {
    let first = ""
    let last = ""

    for (let i = 0; i < line.length; i++) {
        const slice = line.slice(i)

        for (let j = 0; j < nums.length; j++) {
            if (slice.startsWith(nums[j])) {
                if (first == "") {
                    first = (j % 9 + 1).toString()
                } else {
                    last = (j % 9 + 1).toString()
                }
            }
        }
    }

    if (last == "") {
        last = first
    }

    sum += parseInt(first + last)
});

console.log(sum)
