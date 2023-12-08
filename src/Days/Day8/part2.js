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

const currentNodes = Object.keys(nodes).filter((node) => node.charAt(2) == "A");

let completedNodes = {};

let steps = 0;

for (let i = 0; i < 10000000; i++) {
    const dir = instructions[i % instructions.length];

    let endedNodes = 0;
    steps++;

    for (let j = 0; j < currentNodes.length; j++) {
        if (completedNodes[j.toString()]) continue;

        const currentNode = nodes[currentNodes[j]];
        let nextNodeName = "";

        if (dir == "L") {
            nextNodeName = currentNode.left;
        } else if (dir == "R") {
            nextNodeName = currentNode.right;
        }

        if (nextNodeName.charAt(2) == "Z") {
            endedNodes++;
            completedNodes[j.toString()] = steps;
        }

        currentNodes[j] = nextNodeName;
    }

    if (Object.keys(completedNodes).length == currentNodes.length) {
        break;
    }
}

//#region https://stackoverflow.com/a/34955386
function gcd2(a, b) {
    if (!b) return b === 0 ? a : NaN;
    return gcd2(b, a % b);
}

function gcd(array) {
    let n = 0;
    for (let i = 0; i < array.length; ++i)
        n = gcd2(array[i], n);
    return n;
}

function lcm2(a, b) {
    return a * b / gcd2(a, b);
}

function lcm(array) {
    let n = 1;
    for (let i = 0; i < array.length; ++i)
        n = lcm2(array[i], n);
    return n;
}
//#endregion

console.log(lcm(Object.values(completedNodes)));
