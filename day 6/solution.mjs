import {readFileSync} from "node:fs";

const input = readFileSync("input.txt", { encoding: "utf-8"})
    .replace(/\r/g, "")
    .trim();

function isUnique(array) {
    return new Set(array).size === array.length;
}

function solution(windowLength) {
    let slidingWindow = [];
    for (let i = 0; i < input.length; i++) {
        slidingWindow.push(input[i]);
        if (slidingWindow.length > windowLength) {
            slidingWindow.shift();
        }
        if (slidingWindow.length === windowLength && isUnique(slidingWindow)) {
            console.log(i + 1);
            break;
        }
    }
}

function part1() {
    solution(4);
}

function part2() {
    solution(14);
}

part1();
part2();
