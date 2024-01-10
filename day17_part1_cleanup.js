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

// setting up the "visitData" to keep track of lowest losses for every position in relation to step number and direction

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

// setting up the start: could go one step right or one step down to start things off

const currDir = [R, D];
const currStep = [0, 0];
const currPos = [
  [0, 1],
  [1, 0],
];
const currLoss = [gridData[0][1], gridData[1][0]];
visitData[0][1][0][R] = gridData[0][1];
visitData[1][0][0][D] = gridData[1][0];

// find the final spot

const finalCoord = [gridData.length - 1, gridData[0].length - 1];

// keep track of the best (lowest) score so far

let bestLoss = Infinity;

// function to check if potential new location is out of bounds

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

function finalBranch(step, dir, pos, loss) {
  if (pos[0] === finalCoord[0] && pos[1] === finalCoord[1]) {
    bestLoss = loss;
    //        console.log(bestLoss);
  } else {
    addNext(step, dir, pos, loss);
  }
}

// function to add next step

function addNext(step, dir, pos, loss) {
  currStep.push(step);
  currDir.push(dir);
  currPos.push(pos);
  currLoss.push(loss);
  for (let x = step; x < 3; x++) {
    visitData[pos[0]][pos[1]][x][dir] = loss;
  }
}

// main loop starts here

while (currPos.length > 0) {
  // get current Data
  const step = currStep.pop();
  const dir = currDir.pop();
  const pos = currPos.pop();
  const loss = currLoss.pop();

  // calculate possible next Positions
  const onward = [pos[0] + directions[dir][0], pos[1] + directions[dir][1]];
  const right = [
    pos[0] + directions[rightTurn[dir]][0],
    pos[1] + directions[rightTurn[dir]][1],
  ];
  const left = [
    pos[0] + directions[leftTurn[dir]][0],
    pos[1] + directions[leftTurn[dir]][1],
  ];

  // calculate future heat loss
  let onwardLoss = Infinity;
  if (!isOOB(onward)) {
    onwardLoss = loss + gridData[onward[0]][onward[1]];
  }
  let rightLoss = Infinity;
  if (!isOOB(right)) {
    rightLoss = loss + gridData[right[0]][right[1]];
  }
  let leftLoss = Infinity;
  if (!isOOB(left)) {
    leftLoss = loss + gridData[left[0]][left[1]];
  }

  // calculate new Data
  if (
    step < 2 &&
    onwardLoss < bestLoss &&
    !(visitData[onward[0]][onward[1]][step + 1][dir] <= onwardLoss)
  ) {
    finalBranch(step + 1, dir, onward, onwardLoss);
  }

  if (
    rightLoss < bestLoss &&
    !(visitData[right[0]][right[1]][0][rightTurn[dir]] <= rightLoss)
  ) {
    finalBranch(0, rightTurn[dir], right, rightLoss);
  }

  if (
    leftLoss < bestLoss &&
    !(visitData[left[0]][left[1]][0][leftTurn[dir]] <= leftLoss)
  ) {
    finalBranch(0, leftTurn[dir], left, leftLoss);
  }
}

console.log(bestLoss);
