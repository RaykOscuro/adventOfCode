import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay18.txt", "utf-8");
const digData = file.split("\r\n").map((x) => x.split(" "));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

console.log(digData[0]);

const R = 0;
const L = 1;
const D = 2;
const U = 3;

const right = digData.filter((data) => data[0] === "R");
const left = digData.filter((data) => data[0] === "L");
const up = digData.filter((data) => data[0] === "U");
const down = digData.filter((data) => data[0] === "D");
let rightSum = 0;
let leftSum = 0;
let upSum = 0;
let downSum = 0;

for (let x of right) {
  rightSum += Number(x[1]);
}
for (let x of left) {
  leftSum += Number(x[1]);
}
for (let x of up) {
  upSum += Number(x[1]);
}
for (let x of down) {
  downSum += Number(x[1]);
}

console.log(rightSum, leftSum, upSum, downSum);
const digGrid = [];
const rows = [];

for (let x = 0; x < rightSum + 1 + leftSum; x++) {
  digGrid.push([]);
  for (let y = 0; y < upSum + 1 + downSum; y++) {
    digGrid[x].push([]);
  }
}

let currPos = [leftSum, upSum];

console.log(digData);

for (let instr of digData) {
  let currDir;
  //console.log(instr[0]);
  switch (instr[0]) {
    case "R":
      currDir = R;
      break;
    case "L":
      currDir = L;
      break;
    case "U":
      currDir = U;
      break;
    case "D":
      currDir = D;
      break;
  }
  let currDist = instr[1];
  let currColor = instr[2].slice(2, -2);
  console.log(currColor,parseInt(currColor,16));
  for (let x = 1; x <= currDist; x++) {
    digGrid[currPos[0] + x * directions[currDir][0]][
      currPos[1] + x * directions[currDir][1]
    ].push(currDir);
  }
  let prevDir = digGrid[currPos[0]][currPos[1]].pop();
  switch (prevDir) {
    case R:
      if (currDir === U) {
        digGrid[currPos[0]][currPos[1]].push("J");
      } else {
        digGrid[currPos[0]][currPos[1]].push("7");
      }
      break;
    case L:
      if (currDir === U) {
        digGrid[currPos[0]][currPos[1]].push("\\");
      } else {
        digGrid[currPos[0]][currPos[1]].push("F");
      }
      break;
    case U:
      if (currDir === L) {
        digGrid[currPos[0]][currPos[1]].push("7");
      } else {
        digGrid[currPos[0]][currPos[1]].push("F");
      }
      break;
    case D:
      if (currDir === L) {
        digGrid[currPos[0]][currPos[1]].push("J");
      } else {
        digGrid[currPos[0]][currPos[1]].push("\\");
      }
      break;
  }
  // digGrid[currPos[0]][currPos[1]].push(currDir);
  currPos[0] += currDist * directions[currDir][0];
  currPos[1] += currDist * directions[currDir][1];
}
console.log(digGrid[leftSum][upSum]);
let prevDir = digGrid[leftSum][upSum].pop();
let currDir = digGrid[leftSum][upSum].pop();
switch (prevDir) {
  case R:
    if (currDir === U) {
      digGrid[leftSum][upSum].push("J");
    } else {
      digGrid[leftSum][upSum].push("7");
    }
    break;
  case L:
    if (currDir === U) {
      digGrid[leftSum][upSum].push("\\");
    } else {
      digGrid[leftSum][upSum].push("F");
    }
    break;
  case U:
    if (currDir === L) {
      digGrid[leftSum][upSum].push("7");
    } else {
      digGrid[leftSum][upSum].push("F");
    }
    break;
  case D:
    if (currDir === L) {
      digGrid[leftSum][upSum].push("J");
    } else {
      digGrid[leftSum][upSum].push("\\");
    }
    break;
}
console.log(digGrid[leftSum][upSum]);

let room = 0;

for (let x = 0; x < digGrid.length; x++) {
  //console.log(room);
  // F+\ -> no change ... F+J -> change ... 7+\ -> change ... 7+J -> no change
  let activeF = false;
  let active7 = false;
  let active = false;
  for (let y = 0; y < digGrid[x].length; y++) {
    if (digGrid[x][y].includes("F")) {
      activeF = true;
      room += 1;
    }
    if (digGrid[x][y].includes("7")) {
      active7 = true;
      room += 1;
    }
    if (digGrid[x][y].includes("J")) {
      room += 1;
      if (activeF) {
        activeF = false;
        active = !active;
      }
      if (active7) {
        active7 = false;
      }
    }
    if (digGrid[x][y].includes("\\")) {
      room += 1;
      if (activeF) {
        activeF = false;
      }
      if (active7) {
        active7 = false;
        active = !active;
      }
    }
    if (digGrid[x][y].includes(0) || digGrid[x][y].includes(1)) {
      room += 1;
      active = !active;
    }
    if (digGrid[x][y].length === 0 && active) {
      room += 1;
    }
    if (digGrid[x][y].includes(2) | digGrid[x][y].includes(3)) {
      room += 1;
    }
  }
  console.log(room);
}

console.log(digGrid[0]);
console.log(room);
console.log(digGrid[leftSum][upSum]);
console.log(digGrid[leftSum][upSum+1]);
console.log(digGrid[leftSum][upSum+2]);
console.log(digGrid[leftSum][upSum+3]);