import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split("\n").map((line) => line.trim());

const instructions = lines[0].split("");

const nodes = {};

lines.splice(2).forEach(line => {
    let [name, directions] = line.split(" = ");
    directions = directions.split(", ");
    const left = directions[0].slice(1); 
    const right = directions[1].slice(0, 3); 

    nodes[name] = {
        left,
        right,
    }
});

let currentNode = nodes["AAA"];
let steps = 0;

for (let i = 0; i < 100000; i++) {
    const dir = instructions[i % instructions.length];

    let nextNodeName;

    if (dir == "L") {
        nextNodeName = currentNode.left;
    } else if (dir == "R") {
        nextNodeName = currentNode.right;
    }

    currentNode = nodes[nextNodeName];
    steps++;

    if (nextNodeName == "ZZZ") {
        break;
    }
}

console.log(steps);
