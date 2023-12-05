import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const sections = data.toString().split("\r\n\r\n").map((line) => line.trim().split("\r\n"));

const seeds = sections[0][0].split(": ")[1].split(" ").map((seed) => parseInt(seed));
let maps = {};

sections.slice(1).forEach(map => {
    maps[map[0].split(" ")[0]] = map.slice(1).map((set) => {
        const [destStart, sourceStart, rangeLength] = set.split(" ");

        return {
            destStart: parseInt(destStart),
            sourceStart: parseInt(sourceStart),
            rangeLength: parseInt(rangeLength),
        }
    });
});

let lowestDist = Infinity;

seeds.forEach(seed => {
    const dist = solveSeed(seed);
    if (dist < lowestDist) {
        lowestDist = dist;
    }
});

function solveSeed(seed) {
    let value = seed;

    const mapValues = Object.values(maps)
    for (let i = 0; i < mapValues.length; i++) {
        const sets = mapValues[i];

        for (let j = 0; j < sets.length; j++) {
            const set = sets[j];
            
            if (value >= set.sourceStart && value < set.sourceStart + set.rangeLength) {
                value = value + set.destStart - set.sourceStart;
                break;
            }
        }
    }

    return value;
}

console.log(lowestDist);
