import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split("\n").map((line) => line.trim())

const lineWidth = lines[0].length

let gears = []

let sum = 0

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    let runningNum = ""
    let gearPos = ""

    for (let j = 0; j < line.length; j++) {
        const char = line[j];

        if (!isNaN(parseInt(char))) {
            runningNum += char

            if (gearPos == "") {
                gearPos = isGearAdjacent(i, j) || gearPos
            }
        }

        if (isNaN(parseInt(char)) || j == line.length - 1) {
            if (runningNum != "") {
                if (gearPos != "") {
                    const existingGear = gears.find((gear) => gear.pos == gearPos)

                    if (existingGear) {
                        sum += existingGear.firstPart * parseInt(runningNum)
                    } else {
                        gears.push({
                            pos: gearPos,
                            firstPart: parseInt(runningNum),
                        })
                    }

                    gearPos = ""
                }
                runningNum = ""
            }
        }
    }
}

function isGearAdjacent(lineIndex, charIndex) {
    for (let y = -1; y <= 1; y++) {
        if (lineIndex + y >= 0 && lineIndex + y < lines.length) {
            for (let x = -1; x <= 1; x++) {
                if (charIndex + x >= 0 && charIndex + x < lineWidth) {
                    if (!(x == 0 && y == 0)) {
                        if (lines[lineIndex + y][charIndex + x] == "*") {
                            return `${charIndex + x}.${lineIndex + y}`
                        }
                    }
                }
            }
        }
    }

    return ""
}

console.log(sum)
