import {readFileSync} from "node:fs";

const lines = readFileSync("input.txt", { encoding: "utf-8"})
    .replace(/\r/g, "")
    .trim()
    .split("\n")
    .map(line => line.split(" "));

const moves = {
    rock: 1,
    paper: 2,
    scissors: 3
}

const mapInput = {
    A: moves.rock,
    B: moves.paper,
    C: moves.scissors,

    X: moves.rock,
    Y: moves.paper,
    Z: moves.scissors
}

function score(opponentMove, ourMove) {

    // DRAW
    if (opponentMove === ourMove) {
        return ourMove + 3;
    }

    // WIN
    if ((opponentMove === moves.rock && ourMove === moves.paper) ||
        (opponentMove === moves.paper && ourMove === moves.scissors) ||
        (opponentMove === moves.scissors && ourMove === moves.rock)
        ) {
        return ourMove + 6;
    }

    // LOSE
    return ourMove;
}

function part1() {
    const outcomes = lines.map((line) => {
        const opponentMove = mapInput[line[0]];
        const ourMove = mapInput[line[1]];
        return score(opponentMove, ourMove);
    });

    console.log(outcomes.reduce((a, b) => a + b, 0));
}

const solution = {
    A: {                    // ROCK
        X: moves.scissors,  // LOSE
        Y: moves.rock,      // DRAW
        Z: moves.paper,     // WIN
    },
    B: {                    // PAPER
        X: moves.rock,
        Y: moves.paper,
        Z: moves.scissors,
    },
    C: {                    // SCISSORS
        X: moves.paper,
        Y: moves.scissors,
        Z: moves.rock,
    },
}

function part2() {
    const outcomes = lines.map((line) => {
        const opponentMove = mapInput[line[0]];
        const ourMove = solution[line[0]][line[1]];

        return score(opponentMove, ourMove);
    });

    console.log(outcomes.reduce((a, b) => a + b, 0));
}

part1();
part2();
