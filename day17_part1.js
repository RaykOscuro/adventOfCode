import { on } from "events";
import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay17.txt", "utf-8");
const gridData = file.split("\r\n").map((x) => [...x].map((y) => Number(y)));

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const R = 0;
const L = 1;
const D = 2;
const U = 3;

const visitData = [];

for (let row = 0; row < gridData.length; row++) {
  visitData.push([]);
  for (let column = 0; column < gridData[row].length; column++) {
    visitData[row].push([[], [], []]);
  }
}

//console.log(visitData);

const currDir = [R, D];
const currStep = [1, 1];
const currPos = [
  [0, 1],
  [1, 0],
];
const currLoss = [gridData[0][1], gridData[1][0]];
visitData[0][1][0].push(R);
visitData[1][0][0].push(D);
//visitData[0][2][1].push(R);

function isOOB(pos) {
  if (
    !(pos[0] >= gridData.length) &&
    !(pos[1] >= gridData[0].length) &&
    !(pos[0] < 0) &&
    !(pos[1] < 0)
  ) {
    return false;
  } else {
    return true;
  }
}

while (currPos.length > 0) {
  const step = currStep.pop();
  const dir = currDir.pop();
  const pos = currPos.pop();
  const loss = currLoss.pop();
  const onward = [pos[0] + directions[dir][0], pos[1] + directions[dir][1]];
  // const rightTurn = ...
  // const leftTurn = ...
  if (step < 3 && !isOOB(onward)) {
    if (!visitData[onward[0]][onward[1]][step].includes(dir)) {
      currStep.push(step + 1);
      currDir.push(dir);
      currPos.push(onward);
      currLoss.push(loss + gridData[onward[0]][onward[1]]);
      visitData[onward[0]][onward[1]][step] = 1;
    }
  }
  // if (!isOOB(leftTurn)){if (!visitData[rightTurn[0]][rightTurn[1]][0].includes(~dirTurnedLeft)) {...}}
  // if (!isOOB(rightTurn)){...}
  // check if final pos reached -> if so, compare heatLoss to current best, update
  console.log(currPos);
}
