import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const games = data.toString().split("\n")

let sum = 0

for (let i = 0; i < games.length; i++) {
    const game = games[i];

    let [g, sets] = game.split(": ")
    
    sets = sets.split("; ").map((set) => set.trim())
    sum += getGamePower(sets)
}

function getGamePower(sets) {
    let fewestPossible = {
        red: 0,
        green: 0,
        blue: 0
    }

    for (let i = 0; i < sets.length; i++) {
        const set = sets[i]
        const cubes = set.split(", ")

        for (let j = 0; j < cubes.length; j++) {
            let [count, colour] = cubes[j].split(" ")
            count = parseInt(count)

            if (count > fewestPossible[colour]) {
                fewestPossible[colour] = count
            }
        }
    }

    return Object.values(fewestPossible).reduce((previousValue, currentValue) => currentValue *= previousValue)
}

console.log(sum)
