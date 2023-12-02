import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const games = data.toString().split("\n")

const configuration = {
    red: 12,
    green: 13,
    blue: 14
}

let sum = 0

for (let i = 0; i < games.length; i++) {
    const game = games[i];

    let [g, sets] = game.split(": ")
    
    sets = sets.split("; ").map((set) => set.trim())
    if (setsArePossible(sets)) {
        sum += parseInt(g.split(" ")[1])
    }
}

function setsArePossible(sets) {
    for (let i = 0; i < sets.length; i++) {
        const set = sets[i]
        const cubes = set.split(", ")

        for (let j = 0; j < cubes.length; j++) {
            const [count, colour] = cubes[j].split(" ")
            if (count > configuration[colour]) {
                return false
            }
        }
    }

    return true
}

console.log(sum)
