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

const digGrid = [];
const rows = [];

for (let x = 0; x < 1000; x++) {
  digGrid.push([]);
  for (let y = 0; y < 1000; y++) {
    digGrid[x].push([]);
  }
}

let leftSum=500
let upSum=500

let currPos = [leftSum, upSum];

console.log(digData);

for (let instr of digData) {
  let currDirEnc = instr[2].slice(7, -1);
  let currDir;
  //console.log(instr[0]);
  switch (currDirEnc) {
    case 0:
      currDir = R;
      break;
    case 1:
      currDir = D;
      break;
    case 2:
      currDir = L;
      break;
    case 3:
      currDir = U;
      break;
  }
  let currDistEnc = instr[2].slice(2, -2);
  let currDist = parseInt(currDistEnc, 16);
  //console.log(currPos, currDir);
  console.log(currPos);
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
console.log(digGrid[leftSum][upSum + 1]);
console.log(digGrid[leftSum][upSum + 2]);
console.log(digGrid[leftSum][upSum + 3]);
