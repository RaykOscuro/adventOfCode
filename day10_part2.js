import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay10.txt", "utf-8");
const pipeArray = file.split("\r\n").map((x) => x.split(""));
const sType = "7"; // IT'S HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const sCoords = [];
const types = ["|", "-", "L", "J", "7", "F"];
const newTypes = ["I", "~", "l", "j", "/", "f"];

const directions = [
  [0, 2],
  [1, 3],
  [0, 1],
  [0, 3],
  [2, 3],
  [2, 1],
];
const decDir = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

function reverseDir(currentDir) {
  currentDir += 2;
  currentDir === 4 ? (currentDir = 0) : null;
  currentDir === 5 ? (currentDir = 1) : null;
  return currentDir;
}

for (let x = 0; x < pipeArray.length; x++) {
  if (pipeArray[x].indexOf("S") !== -1) {
    sCoords.push(pipeArray[x].indexOf("S"));
    sCoords.push(x);
  }
}

const clockwiseLoc = [];
let clockwiseDir = "";
const countercwLoc = [];
let countercwDir = "";
clockwiseLoc.push(sCoords[0]);
clockwiseLoc.push(sCoords[1]);
countercwLoc.push(sCoords[0]);
countercwLoc.push(sCoords[1]);

pipeArray[sCoords[1]][sCoords[0]] = "/"; // IT'S HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

console.log(pipeArray);

clockwiseDir = directions[types.indexOf(sType)][0];
clockwiseLoc[0] += decDir[directions[types.indexOf(sType)][0]][0];
clockwiseLoc[1] += decDir[directions[types.indexOf(sType)][0]][1];
countercwDir = directions[types.indexOf(sType)][1];
countercwLoc[0] += decDir[directions[types.indexOf(sType)][1]][0];
countercwLoc[1] += decDir[directions[types.indexOf(sType)][1]][1];

//console.log(sCoords);
//console.log("clockwise:", clockwiseLoc);
clockwiseDir = reverseDir(clockwiseDir);
//console.log("cntrclockwise:", countercwLoc);
countercwDir = reverseDir(countercwDir);

let currentType;
let currentOptions;
let steps = 1;

while (clockwiseLoc.toString() !== countercwLoc.toString()) {
  currentType = pipeArray[clockwiseLoc[1]][clockwiseLoc[0]];
  pipeArray[clockwiseLoc[1]][clockwiseLoc[0]] =
    newTypes[types.indexOf(currentType)];
  currentOptions = directions[types.indexOf(currentType)];

  clockwiseLoc[0] +=
    decDir[currentOptions.filter((option) => option != clockwiseDir)[0]][0];
  clockwiseLoc[1] +=
    decDir[currentOptions.filter((option) => option != clockwiseDir)[0]][1];
  clockwiseDir = currentOptions.filter((option) => option != clockwiseDir)[0];
  clockwiseDir = reverseDir(clockwiseDir);
  //console.log("clockwiseUpdate:", clockwiseLoc);
//  if (clockwiseLoc.toString() === countercwLoc.toString()) {
//    break;
//  }
  steps++;
  currentType = pipeArray[countercwLoc[1]][countercwLoc[0]];
  pipeArray[countercwLoc[1]][countercwLoc[0]] =
    newTypes[types.indexOf(currentType)];
  currentOptions = directions[types.indexOf(currentType)];

  //console.log("type:", currentType);
  countercwLoc[0] +=
    decDir[currentOptions.filter((option) => option != countercwDir)[0]][0];
  countercwLoc[1] +=
    decDir[currentOptions.filter((option) => option != countercwDir)[0]][1];
  countercwDir = currentOptions.filter((option) => option != countercwDir)[0];
  countercwDir = reverseDir(countercwDir);
  //console.log("cntrclockwiseUpdate:", countercwLoc);
}

currentType = pipeArray[clockwiseLoc[1]][clockwiseLoc[0]];
pipeArray[clockwiseLoc[1]][clockwiseLoc[0]] =
  newTypes[types.indexOf(currentType)];

console.log(pipeArray);

let openLoop = false;
let lCheck = false;
let fCheck = false;
let count = 0;

function switchLoopState() {
  openLoop ? (openLoop = false) : (openLoop = true);
}

for (let row of pipeArray) {
  openLoop = false;
  //  console.log(row);
  for (let chara of row) {
    if (chara === "I") {
      switchLoopState();
      //      console.log(chara, openLoop);
    }
    if (chara === "l") {
      lCheck = true;
    }
    if (chara === "j" && lCheck) {
      lCheck = false;
    }
    if (chara === "/" && lCheck) {
      lCheck = false;
      switchLoopState();
      //      console.log(chara, openLoop);
    }
    if (chara === "f") {
      fCheck = true;
    }
    if (chara === "/" && fCheck) {
      fCheck = false;
    }
    if (chara === "j" && fCheck) {
      fCheck = false;
      switchLoopState();
      //     console.log(chara, openLoop);
    }

    if (openLoop && newTypes.indexOf(chara) === -1) {
      count++;
      //console.log(row, chara);
    }
  }
}

console.log(count);
