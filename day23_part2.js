import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay23.txt", "utf-8");
const mapData = file.split("\r\n").map((node) => node.split(""));
const pMapData = [];

for (let y of mapData) {
  const tempArray = [];
  for (let x of y) {
    tempArray.push({ type: x, visited: false });
  }
  pMapData.push(tempArray);
}

let start;
let finish;

for (let x = 0; x < pMapData[0].length; x++) {
  if (pMapData[0][x].type === ".") {
    start = x;
  }
}

for (let x = 0; x < pMapData[0].length; x++) {
  if (pMapData[pMapData.length - 1][x].type === ".") {
    finish = x;
  }
}

const branchingLoc = [];

for (let y = 0; y < pMapData.length; y++) {
  for (let x = 0; x < pMapData[y].length; x++) {
    if (
      pMapData[y][x].type !== "#" &&
      getSurround([y, x], pMapData).length > 2
    ) {
      branchingLoc.push([y, x]);
    }
  }
}

console.log(branchingLoc);
const allDest = [];
for (let loc of branchingLoc) {
  allDest.push(JSON.stringify(loc));
}
allDest.push(
  JSON.stringify([0, start]),
  JSON.stringify([pMapData.length - 1, finish])
);
console.log(allDest);

const allBranchDest = [];

for (let loc of branchingLoc) {
  for (let y = 0; y < pMapData.length; y++) {
    for (let x = 0; x < pMapData[y].length; x++) {
      pMapData[y][x].visited = false;
    }
  }
  const paths = getSurround(loc);
  pMapData[loc[0]][loc[1]].visited = true;
  const branchDest = [];
  // console.log("start: ", paths);
  for (let path of paths) {
    const tempDest = goFurther(path, 1);
    if (tempDest) {
      branchDest.push(tempDest);
    }
  }
  //console.log("dest: ", branchDest);
  allBranchDest.push(branchDest);
}

console.log(allBranchDest);

let startNode = 0;
let globalSteps = 0;
let visitedNodes = [allDest.length - 2];

for (let x = 0; x < allBranchDest.length; x++) {
  for (let branch of allBranchDest[x]) {
    if (branch.dest === allDest.length - 2) {
      startNode = x;
      globalSteps += branch.steps;
      break;
    }
  }
}

console.log("start ", startNode, globalSteps);
console.log("branchnodes ", allDest.length);

explore(startNode, globalSteps, structuredClone(visitedNodes));

console.log(globalSteps);

function explore(branch, steps, visitedNodes) {
  visitedNodes.push(branch);
  //console.log("here ", allBranchDest, branch);
  for (let nextBranch of allBranchDest[branch]) {
    if (nextBranch.dest === allDest.length - 1) {
      if (steps + nextBranch.steps > globalSteps) {
        globalSteps = steps + nextBranch.steps;
        //console.log(globalSteps);
      }
      break;
    }
    if (!visitedNodes.includes(nextBranch.dest)) {
      explore(
        nextBranch.dest,
        steps + nextBranch.steps,
        structuredClone(visitedNodes)
      );
    }
  }
}

function getSurround(currentPos) {
  const surround = [];
  if (pMapData[currentPos[0] - 1]) {
    if (!pMapData[currentPos[0] - 1][currentPos[1]].visited) {
      if (pMapData[currentPos[0] - 1][currentPos[1]].type !== "#") {
        surround.push([currentPos[0] - 1, currentPos[1]]);
      }
    }
  }

  if (pMapData[currentPos[0] + 1]) {
    if (!pMapData[currentPos[0] + 1][currentPos[1]].visited) {
      if (pMapData[currentPos[0] + 1][currentPos[1]].type !== "#") {
        surround.push([currentPos[0] + 1, currentPos[1]]);
      }
    }
  }

  if (pMapData[currentPos[0]][currentPos[1] - 1]) {
    if (!pMapData[currentPos[0]][currentPos[1] - 1].visited) {
      if (pMapData[currentPos[0]][currentPos[1] - 1].type !== "#") {
        surround.push([currentPos[0], currentPos[1] - 1]);
      }
    }
  }

  if (pMapData[currentPos[0]][currentPos[1] + 1]) {
    if (!pMapData[currentPos[0]][currentPos[1] + 1].visited) {
      if (pMapData[currentPos[0]][currentPos[1] + 1].type !== "#") {
        surround.push([currentPos[0], currentPos[1] + 1]);
      }
    }
  }
  return surround;
}

// let longestRoute = 0;

function goFurther(currentPos, steps) {
  //console.log(currentPos)
  const foundDest = allDest.indexOf(JSON.stringify(currentPos));
  if (foundDest > -1) {
    return { dest: foundDest, steps: steps };
  }
  pMapData[currentPos[0]][currentPos[1]].visited = true;
  const surround = getSurround(currentPos);
  for (let location of surround) {
    return goFurther(location, steps + 1);
  }
}

// goFurther([0, start], pMapData, 0);

// console.log(longestRoute);
