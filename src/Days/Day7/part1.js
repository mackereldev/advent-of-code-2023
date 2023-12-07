import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const hands = data.toString().split("\n").map((line) => {
    const [cards, bid] = line.trim().split(" ");

    const cardArray = cards.split("");

    return {
        cards: cardArray,
        bid: parseInt(bid),
        type: getHandType(cardArray),
    };
});

const cardLabels = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

function getHandType(cards) {
    const counts = {};

    cards.forEach(card => {
        if (counts[card]) {
            counts[card]++;
        } else {
            counts[card] = 1;
        }
    });

    const ones = Object.values(counts).filter((value) => value == 1).length;
    const twos = Object.values(counts).filter((value) => value == 2).length;
    const threes = Object.values(counts).filter((value) => value == 3).length;

    if (ones == 5) {
        return 0;
    } else if (twos == 1) {
        if (ones == 3) {
            return 1;
        } else if (threes == 1) {
            return 4;
        }
    } else if (twos == 2) {
        return 2;
    } else if (threes == 1) {
        return 3;
    } else if (Object.values(counts).filter((value) => value == 4).length == 1) {
        return 5;
    } else if (Object.values(counts).filter((value) => value == 5).length == 1) {
        return 6;
    }
}

function sortingFunction(a, b) {
    const typeDiff = a.type - b.type;

    if (typeDiff == 0) {
        const aCards = a.cards;
        const bCards = b.cards;

        for (let i = 0; i < aCards.length; i++) {
            const cardDiff = cardLabels.indexOf(aCards[i]) - cardLabels.indexOf(bCards[i]);

            if (cardDiff != 0) {
                return cardDiff;
            }
        }
    }

    return a.type - b.type;
}

hands.sort(sortingFunction);
console.log(hands.map((hand => hand.bid)).reduce((previous, current, index) => previous + current * (index + 1)));
