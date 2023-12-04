import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split("\n").map((line) => line.trim())

const lineWidth = lines[0].length
const nonSymbols = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

let sum = 0

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    let runningNumber = ""
    let isPart = false

    for (let j = 0; j < line.length; j++) {
        const char = line[j]
        const isNumber = !isNaN(parseInt(char))

        if (isNumber) {
            runningNumber += char

            if (!isPart && isAdjacent(i, j)) {
                isPart = true
            }
        }

        if (!isNumber || j == line.length - 1) {
            if (runningNumber != "") {
                if (isPart) {
                    sum += parseInt(runningNumber)
                    isPart = false
                }
                runningNumber = ""
            }
        }
    }
}

function isAdjacent(lineIndex, charIndex) {
    for (let y = -1; y <= 1; y++) {
        if (lineIndex + y >= 0 && lineIndex + y < lines.length) {
            for (let x = -1; x <= 1; x++) {
                if (charIndex + x >= 0 && charIndex + x < lineWidth) {
                    if (!(x == 0 && y == 0)) {
                        if (!nonSymbols.includes(lines[lineIndex + y][charIndex + x])) {
                            return true
                        }
                    }
                }
            }
        }
    }

    return false
}

console.log(sum)
