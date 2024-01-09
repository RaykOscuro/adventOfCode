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

const rightTurn = [D, U, L, R];
const leftTurn = [U, D, R, L];

const visitData = [];

for (let row = 0; row < gridData.length; row++) {
  visitData.push([]);
  for (let column = 0; column < gridData[row].length; column++) {
    visitData[row].push([
      [Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity],
    ]);
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
visitData[0][1][0][R]=gridData[0][1];
visitData[1][0][0][D]=gridData[1][0];

const finalCoord = [gridData.length - 1, gridData[0].length - 1];

let bestLoss = Infinity;

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
  const right = [
    pos[0] + directions[rightTurn[dir]][0],
    pos[1] + directions[rightTurn[dir]][1],
  ];
  const left = [
    pos[0] + directions[leftTurn[dir]][0],
    pos[1] + directions[leftTurn[dir]][1],
  ];
  //  console.log(onward,right,left);
  if (step < 3 && !isOOB(onward)) {
    if (loss + gridData[onward[0]][onward[1]] < bestLoss) {
      if (
        !(
          visitData[onward[0]][onward[1]][step][dir] <=
          loss + gridData[onward[0]][onward[1]]
        )
      ) {
        if (onward[0] === finalCoord[0] && onward[1] === finalCoord[1]) {
          console.log(loss + gridData[onward[0]][onward[1]]);
          if (loss + gridData[onward[0]][onward[1]] < bestLoss) {
            bestLoss = loss + gridData[onward[0]][onward[1]];
            console.log(bestLoss);
          }
        } else {
          currStep.push(step + 1);
          currDir.push(dir);
          currPos.push(onward);
          currLoss.push(loss + gridData[onward[0]][onward[1]]);
          for (let x = step; x < 3; x++) {
            visitData[onward[0]][onward[1]][x][dir] =
              loss + gridData[onward[0]][onward[1]];
          }
        }
      }
    }
  }
  if (!isOOB(right)) {
    if (loss + gridData[right[0]][right[1]] < bestLoss) {
      if (
        !(
          visitData[right[0]][right[1]][0][rightTurn[dir]] <=
          loss + gridData[right[0]][right[1]]
        )
      ) {
        if (right[0] === finalCoord[0] && right[1] === finalCoord[1]) {
          console.log(loss + gridData[right[0]][right[1]]);
          if (loss + gridData[right[0]][right[1]] < bestLoss) {
            bestLoss = loss + gridData[right[0]][right[1]];
            console.log(bestLoss);
          }
        } else {
          currStep.push(1);
          currDir.push(rightTurn[dir]);
          currPos.push(right);
          currLoss.push(loss + gridData[right[0]][right[1]]);
          for (let x = 0; x < 3; x++) {
            visitData[right[0]][right[1]][x][rightTurn[dir]] =
              loss + gridData[right[0]][right[1]];
          }
        }
      }
    }
  }
  if (!isOOB(left)) {
    if (loss + gridData[left[0]][left[1]] < bestLoss) {
      if (
        !(
          visitData[left[0]][left[1]][0][leftTurn[dir]] <=
          loss + gridData[left[0]][left[1]]
        )
      ) {
        if (left[0] === finalCoord[0] && left[1] === finalCoord[1]) {
          console.log(loss + gridData[left[0]][left[1]]);
          if (loss + gridData[left[0]][left[1]] < bestLoss) {
            bestLoss = loss + gridData[left[0]][left[1]];
            console.log(bestLoss);
          }
        } else {
          currStep.push(1);
          currDir.push(leftTurn[dir]);
          currPos.push(left);
          currLoss.push(loss + gridData[left[0]][left[1]]);
          for (let x = 0; x < 3; x++) {
            visitData[left[0]][left[1]][x][leftTurn[dir]] =
              loss + gridData[left[0]][left[1]];
          }
        }
      }
    }
  }
  //console.log(currPos);
}

console.log(visitData);
console.log(bestLoss);
