import {readFileSync} from "node:fs";

const lines = readFileSync("input.txt", { encoding: "utf-8"})
    .replace(/\r/g, "")
    .trim()
    .split("\n")
    .map(line => {
        const [letter, number] = line.split(" ");
        return {
            direction: letter,
            totalMoves: parseInt(number)
        };
    });

const movesDefinition = {
    R: {
        x: 1,
        y: 0
    },
    L: {
        x: -1,
        y: 0
    },
    U: {
        x: 0,
        y: -1
    },
    D: {
        x: 0,
        y: 1
    }
};

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(direction) {
        const delta = movesDefinition[direction];

        this.x += delta.x;
        this.y += delta.y;
    }

    follow(point) {
        const distance = Math.max(Math.abs(this.x - point.x), Math.abs(this.y - point.y));
        if (distance > 1) {
            // MOVE THIS POINT
            const directionX = point.x - this.x;
            const directionY = point.y - this.y;

            // 0 -> DO NOTHING
            // 1 OR 2 -> this.x++
            // -1 OR -2 -> this.x--

            this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
            this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
        }
    }
}

function markVisited(x, y, visited) {
    visited.add(`${x}-${y}`);
}

function part1() {
    const head = new Point(0, 0);
    const tail = new Point(0, 0);

    const visited = new Set();

    markVisited(0, 0, visited);

    for (const line of lines) {
        for (let i = 0; i < line.totalMoves; i++) {
            head.move(line.direction);
            tail.follow(head);
            markVisited(tail.x, tail.y, visited);
        }
    }
    console.log(visited.size);
}

function part2() {
    const nodes = new Array(10).fill(0).map(_ => new Point(0, 0));
    const visited = new Set();

    markVisited(0, 0, visited);

    for (const line of lines) {
        for (let i = 0; i < line.totalMoves; i++) {
            // MOVE THE HEAD ACCORDING TO THE INSTRUCTION
            nodes[0].move(line.direction);
            // MOVE THE REST OF THE ROPE
            for (let node = 1; node < nodes.length; node++) {
                const point = nodes[node];
                point.follow(nodes[node - 1]);
            }
            const tail = nodes[nodes.length - 1];
            markVisited(tail.x, tail.y, visited);
        }
    }
    console.log(visited.size);
}

part1();
part2();
