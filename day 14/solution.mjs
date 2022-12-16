import {readFileSync} from "node:fs";

const lines = readFileSync("input.txt", { encoding: "utf-8"})
    .replace(/\r/g, "")
    .trim()
    .split("\n");

function getInput() {
    const map = new Set();

    let maxY = 0;

    for (const line of lines) {
        const points = line.split(" -> ").map(point => {
            const [x, y] = point.split(",").map(Number);
            if (y > maxY) {
                maxY = y;
            }
            return {x, y};
        });

        let currentPoint = points.shift();
        while (points.length) {
            let targetPoint = points.shift();

            // DRAW A LINE BETWEEN currentPoint AND targetPoint
            while (currentPoint.x !== targetPoint.x || currentPoint.y !== targetPoint.y) {

                map.add(`${currentPoint.x},${currentPoint.y}`);

                if (currentPoint.x !== targetPoint.x) {
                    const delta = (targetPoint.x - currentPoint.x) / Math.abs((targetPoint.x - currentPoint.x));
                    currentPoint.x += delta;
                }
                else {
                    const delta = (targetPoint.y - currentPoint.y) / Math.abs((targetPoint.y - currentPoint.y));
                    currentPoint.y += delta;
                }
            }
            map.add(`${currentPoint.x},${currentPoint.y}`);
        }
    }
    return {map, maxY};
}

function part1() {
    const {map, maxY} = getInput();

    let sandIntoEndlessVoid = false;
    let sandUnits = 0;

    while(!sandIntoEndlessVoid) {
        // SPAWN SAND
        let point = {x: 500, y: 0}; // ASSUME THIS POINT IS ALWAYS EMPTY
        sandUnits++;

        // DROP THE SAND
        while (!sandIntoEndlessVoid) {

            //DIRECT FALL
            if (!map.has(`${point.x},${point.y + 1}`)) {
                point.y++;
            }
            // DIAGONAL FALL TO THE LEFT
            else if (!map.has(`${point.x - 1},${point.y + 1}`)) {
                point.y++;
                point.x--;
            }
            // DIAGONAL FALL TO THE RIGHT
            else if (!map.has(`${point.x + 1},${point.y + 1}`)) {
                point.y++;
                point.x++;
            }
            // CAN'T FALL FURTHER
            else {
                map.add(`${point.x},${point.y}`);
                break;
            }
            if (point.y >= maxY) {
                sandIntoEndlessVoid = true;
                sandUnits--;
            }
        }
    }
    console.log(sandUnits);
}

function part2() {
    const {map, maxY} = getInput();
    let sandUnits = 0;

    while(true) {
        if (map.has(`500,0`)) {
            break;
        }

        // SPAWN SAND
        let point = {x: 500, y: 0};
        sandUnits++;

        // DROP THE SAND
        while (true) {
            // REACHED THE BOTTOM FLOOR
            if (point.y === maxY + 1) {
                map.add(`${point.x},${point.y}`);
                break;
            }
            //DIRECT FALL
            else if (!map.has(`${point.x},${point.y + 1}`)) {
                point.y++;
            }
            // DIAGONAL FALL TO THE LEFT
            else if (!map.has(`${point.x - 1},${point.y + 1}`)) {
                point.y++;
                point.x--;
            }
            // DIAGONAL FALL TO THE RIGHT
            else if (!map.has(`${point.x + 1},${point.y + 1}`)) {
                point.y++;
                point.x++;
            }
            // CAN'T FALL FURTHER
            else {
                map.add(`${point.x},${point.y}`);
                break;
            }
        }
    }
    console.log(sandUnits);
}

part1();
part2();
