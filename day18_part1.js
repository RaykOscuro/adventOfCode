import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay18.txt", "utf-8");
const digData = file.split("\r\n").map((x) => x.split(" "));

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

console.log(digData[0])

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

const digGrid = [];
const rows = [];

for (let x = 0; x < upSum + 1 + downSum; x++) {
  digGrid.push([]);
  for (let y = 0; y < rightSum + 1 + leftSum; y++) {
    digGrid[x].push([]);
  }
}

let currPos = [upSum + 1, leftSum + 1];

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
  let currColor = instr[2].slice(1, -1);
  //console.log(currPos, currDir);
  for (let x = 1; x <= currDist; x++) {
    digGrid[currPos[0] + x * directions[currDir][0]][
      currPos[1] + x * directions[currDir][1]
    ].push(currDir);
  }
  if ((currDir === R) | (currDir === L)) {
    digGrid[currPos[0]][currPos[1]].pop();
    digGrid[currPos[0]][currPos[1]].push(currDir);
  }
  currPos[0] += currDist * directions[currDir][0];
  currPos[1] += currDist * directions[currDir][1];
}
console.log(digGrid[upSum + 1][leftSum + 1])
digGrid[upSum + 1][leftSum + 1].pop();
console.log(digGrid[upSum + 1][leftSum + 1])

let room = 0;

for (let x = 0; x < digGrid.length; x++) {
  //console.log(room);
  let active0 = false;
  let active1 = false;
  let tempCount = 0;
  for (let y = 0; y < digGrid[x].length; y++) {
    if (digGrid[x][y].includes(0)) {
      room += 1;
      if (active1) {
        active1 = false;
        room += tempCount;
        tempCount = 0;
      } else {
        active0 = true;
      }
    }
    if (digGrid[x][y].includes(1)) {
      room += 1;
      if (active0) {
        active0 = false;
        room += tempCount;
        tempCount = 0;
      } else {
        active1 = true;
      }
    }
    if (digGrid[x][y].length === 0 && active0 | active1) {
      tempCount += 1;
    }
    if (digGrid[x][y].includes(2) | digGrid[x][y].includes(3)) {
      room += 1;
    }
  }
}

console.log(digGrid[0]);
console.log(room);
