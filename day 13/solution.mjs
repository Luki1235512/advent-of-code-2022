import {readFileSync} from "node:fs";

const input = readFileSync("input.txt", { encoding: "utf-8"})
    .replace(/\r/g, "")
    .trim();

function getInput1() {
    return input.split("\n\n").map(group => {
        const [left, right] = group.split("\n").map(line => JSON.parse(line));
        return {left, right};
    });
}

function getInput2() {
    return input.replace(/\n\n/g, "\n").split("\n").map(line => JSON.parse(line));
}

function checkOrder(left, right, result) {
    const leftIsNumber = typeof left === "number";
    const rightIsNumber = typeof right === "number";

    if (leftIsNumber && rightIsNumber) {
        if (left < right) {
            result.rightOrder = true;
            return;
        }
        if (left > right) {
            result.rightOrder = false;
            return;
        }
    }
    else if (!leftIsNumber && !rightIsNumber) {
        let index = 0;
        while (true) {
            if (index > left.length - 1 && index <= right.length - 1) {
                // LEFT RAN OUT OF ITEMS
                result.rightOrder = true;
                return;
            }
            else if (index <= left.length - 1 && index > right.length - 1) {
                // LEFT RAN OUT OF ITEMS
                result.rightOrder = false;
                return;
            }
            else if (index > left.length - 1 && index > right.length - 1) {
                // NO DECISION, BOTH LISTS RAN OUT OF ITEMS
                return;
            }

            // COMPARE THE TWO ELEMENTS
            checkOrder(left[index], right[index], result);

            // IF WE HAVE SET THE VARIABLE rightOrder, STOP
            if (typeof result.rightOrder !== "undefined") {
                return;
            }

            index++;
        }
    }
    else {
        if (leftIsNumber) {
            checkOrder([left], right, result);
        }
        else {
            checkOrder(left, [right], result);
        }
    }
}

function part1() {
    const groups = getInput1();
    const result = groups.map(({left, right}, index) => {
        let result = {};
        checkOrder(left, right, result);
        return result.rightOrder ? index + 1 : 0;
    }).reduce((a, b) => a + b, 0);

    console.log(result);
}

function part2() {
    const input = getInput2().concat([[[2]], [[6]]]);
    const strings = input.sort((a, b) => {
        const result = {};
        checkOrder(a, b, result);
        return result.rightOrder ? -1 : 1;
    }).map(x => JSON.stringify(x));

    const position2 = strings.indexOf("[[2]]") + 1;
    const position6 = strings.indexOf("[[6]]") + 1;
    console.log(position2 * position6);
}

part1();
part2();
