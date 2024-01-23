import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay19.txt", "utf-8");
const instructionData = file.split("\r\n\r\n")[0];

const instructionsRaw = instructionData.split("\r\n");

let score = 0;

function giveIndex(xmas) {
  let ind;
  xmas === "x" ? (ind = 0) : null;
  xmas === "m" ? (ind = 1) : null;
  xmas === "a" ? (ind = 2) : null;
  xmas === "s" ? (ind = 3) : null;
  return ind;
}

const instructions = [];
instructionsRaw.map((instruction) =>
  instructions.push(instruction.slice(0, -1).split(/,|{/))
);

function instructionParse(instructString) {
  const quality = instructString.slice(0, 1);
  const compare = instructString.slice(1, 2);
  const value = Number(instructString.slice(2).split(":")[0]);
  const dest = instructString.slice(2).split(":")[1];
  return [quality, compare, value, dest];
}

let startIndex = 0;

for (let x = 0; x < instructions.length; x++) {
  if (instructions[x][0] === "in") {
    startIndex = x;
  }
}

let instruction = instructions[startIndex];
let constraints = [
  [0, 4001],
  [0, 4001],
  [0, 4001],
  [0, 4001],
];

evalInstructions(instruction, constraints);

function evalInstructions(instruction, constraints) {
  const tempConstraints = JSON.parse(JSON.stringify(constraints));
  for (let x = 1; x < instruction.length; x++) {
    const sendConstraints = JSON.parse(JSON.stringify(tempConstraints));
    if (x === instruction.length - 1) {
      if (instruction[x] === "A") {
        if (
          tempConstraints[0][1] - 1 > tempConstraints[0][0] &&
          tempConstraints[1][1] - 1 > tempConstraints[1][0] &&
          tempConstraints[2][1] - 1 > tempConstraints[2][0] &&
          tempConstraints[3][1] - 1 > tempConstraints[3][0]
        ) {
          score +=
            (tempConstraints[0][1] - 1 - (tempConstraints[0][0])) *
            (tempConstraints[1][1] - 1 - (tempConstraints[1][0])) *
            (tempConstraints[2][1] - 1 - (tempConstraints[2][0])) *
            (tempConstraints[3][1] - 1 - (tempConstraints[3][0]));
        }
      } else if (instruction[x] !== "R") {
        const nextOne = instructions.filter(
          (instr) => instr[0] === instruction[x]
        )[0];
        //console.log(instruction[x], nextOne);
        evalInstructions(nextOne, sendConstraints);
      }
    } else {
      const currInst = instructionParse(instruction[x]);
      const indA = giveIndex(currInst[0]);
      let indB;
      let indC;
      if (currInst[1] === ">") {
        indB = 0;
        indC = 1;
      } else {
        indB = 1;
        indC = 0;
      }
      if (
        (indB === 0 && currInst[2] > tempConstraints[indA][indB]) ||
        (indB === 1 && currInst[2] < tempConstraints[indA][indB])
      ) {
        sendConstraints[indA][indB] = currInst[2];
      }
      if (indB === 0 && currInst[2] + 1 < tempConstraints[indA][indC]) {
        tempConstraints[indA][indC] = currInst[2] + 1;
      } else if (indB === 1 && currInst[2] - 1 > tempConstraints[indA][indC]) {
        tempConstraints[indA][indC] = currInst[2] - 1;
      }
      if (currInst[3] === "A") {
        // console.log(
        //   sendConstraints[0][1],
        //   sendConstraints[0][0],
        //   sendConstraints[1][1],
        //   sendConstraints[1][0],
        //   sendConstraints[2][1],
        //   sendConstraints[2][0],
        //   sendConstraints[3][1],
        //   sendConstraints[3][0]
        // );
        if (
          sendConstraints[0][1] - 1 > sendConstraints[0][0] &&
          sendConstraints[1][1] - 1 > sendConstraints[1][0] &&
          sendConstraints[2][1] - 1 > sendConstraints[2][0] &&
          sendConstraints[3][1] - 1 > sendConstraints[3][0]
        ) {
          score +=
            (sendConstraints[0][1] - 1 - sendConstraints[0][0]) *
            (sendConstraints[1][1] - 1 - sendConstraints[1][0]) *
            (sendConstraints[2][1] - 1 - sendConstraints[2][0]) *
            (sendConstraints[3][1] - 1 - sendConstraints[3][0]);
        }
      } else if (currInst[3] === "R") {
        // change constraints? nah, seems fine...
      } else {
        const nextOne = instructions.filter(
          (instruction) => instruction[0] === currInst[3]
        )[0];
        //console.log(currInst, indA, constraints, nextOne);
        evalInstructions(nextOne, sendConstraints);
      }
    }
  }
}

//console.log(constraints);
console.log(score);
