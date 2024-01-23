import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay19.txt", "utf-8");
const instructionData = file.split("\r\n\r\n")[0];
const partData = file.split("\r\n\r\n")[1];

const instructionsRaw = instructionData.split("\r\n");
const partsRaw = partData.split("\r\n");

const parts = [];

let score = 0;

function giveIndex(xmas) {
  let ind;
  xmas === "x" ? (ind = 0) : null;
  xmas === "m" ? (ind = 1) : null;
  xmas === "a" ? (ind = 2) : null;
  xmas === "s" ? (ind = 3) : null;
  return ind;
}

partsRaw.map((part) =>
  parts.push(
    part
      .slice(1, -1)
      .split(",")
      .map((x) => Number(x.slice(2)))
  )
);

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

function followInstruction(part, instruction) {
  for (let x = 1; x < instruction.length; x++) {
    if (x === instruction.length - 1) {
      const nextInst = instruction[x];
      if (nextInst === "A") {
        console.log("YAY!");
        score += part[0] + part[1] + part[2] + part[3];
      } else if (nextInst === "R") {
        console.log("Oh no!");
      } else {
        const nextOne = instructions.filter(
          (instruction) => instruction[0] === nextInst
        );
        console.log(nextOne[0]);
        followInstruction(part, nextOne[0]);
      }
    } else {
      const currInst = instructionParse(instruction[x]);
      const xmas = giveIndex(currInst[0]);
      console.log(part[xmas], currInst[2]);
      if (currInst[1] === "<") {
        if (part[xmas] < currInst[2]) {
          const nextInst = currInst[3];
          if (nextInst === "A") {
            console.log("YAY!");
            score += part[0] + part[1] + part[2] + part[3];
          } else if (nextInst === "R") {
            console.log("Oh no!");
          } else {
            const nextOne = instructions.filter(
              (instruction) => instruction[0] === nextInst
            );
            console.log(nextOne[0]);
            followInstruction(part, nextOne[0]);
          }
          break;
        }
      }
      if (currInst[1] === ">") {
        if (part[xmas] > currInst[2]) {
          const nextInst = currInst[3];
          if (nextInst === "A") {
            console.log("YAY!");
            score += part[0] + part[1] + part[2] + part[3];
          } else if (nextInst === "R") {
            console.log("Oh no!");
          } else {
            const nextOne = instructions.filter(
              (instruction) => instruction[0] === nextInst
            );
            console.log(nextOne[0]);
            followInstruction(part, nextOne[0]);
          }
          break;
        }
      }
    }
  }
}

let startIndex = 0;

for (let x = 0; x < instructions.length; x++) {
  if (instructions[x][0] === "in") {
    startIndex = x;
  }
}

let instruction = instructions[startIndex];

for (let part of parts) {
  followInstruction(part, instruction);
}

console.log(score);
