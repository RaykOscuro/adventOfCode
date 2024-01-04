import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay16.txt", "utf-8");
const gridData = file.split("\r\n");

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

const fslashMap = [U, D, L, R];
const bslashMap = [D, U, R, L];

const currDir = [];
const currPos = [];

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

function calcEnergize(currPos, currDir) {
  const visitData = [];
  for (let row = 0; row < gridData.length; row++) {
    visitData.push([]);
    for (let column = 0; column < gridData[row].length; column++) {
      visitData[row].push([0, 0, 0, 0]);
    }
  }

  let visited;
  while (currPos.length !== 0) {
    let yx = currPos.pop();
    let mov = currDir.pop();
    let tile = gridData[yx[0]][yx[1]];
    if (visitData[yx[0]][yx[1]][mov] === 1) {
      visited = true;
    } else {
      visited = false;
    }
    visitData[yx[0]][yx[1]][mov] = 1;
    //console.log(yx, mov, tile);

    if (tile === "." && !visited) {
      yx[0] += directions[mov][0];
      yx[1] += directions[mov][1];
      if (!isOOB(yx)) {
        currPos.push(yx);
        currDir.push(mov);
      }
    }
    if (tile === "|" && !visited) {
      if (mov === R || mov === L) {
        const newLoc1 = [[], []];
        const newLoc2 = [[], []];
        newLoc1[0] = yx[0] + directions[U][0];
        newLoc1[1] = yx[1] + directions[U][1];
        if (!isOOB(newLoc1)) {
          //      console.log(newLoc1);
          currPos.push(newLoc1);
          currDir.push(U);
        }
        newLoc2[0] = yx[0] + directions[D][0];
        newLoc2[1] = yx[1] + directions[D][1];
        if (!isOOB(newLoc2)) {
          //        console.log(newLoc2);
          currPos.push(newLoc2);
          currDir.push(D);
        }
      } else {
        yx[0] += directions[mov][0];
        yx[1] += directions[mov][1];
        if (!isOOB(yx)) {
          currPos.push(yx);
          currDir.push(mov);
        }
      }
    }
    if (tile === "-" && !visited) {
      if (mov === D || mov === U) {
        const newLoc1 = [[], []];
        const newLoc2 = [[], []];
        newLoc1[0] = yx[0] + directions[R][0];
        newLoc1[1] = yx[1] + directions[R][1];
        if (!isOOB(newLoc1)) {
          //      console.log(newLoc1);
          currPos.push(newLoc1);
          currDir.push(0);
        }
        newLoc2[0] = yx[0] + directions[L][0];
        newLoc2[1] = yx[1] + directions[L][1];
        if (!isOOB(newLoc2)) {
          //        console.log(newLoc2);
          currPos.push(newLoc2);
          currDir.push(1);
        }
      } else {
        yx[0] += directions[mov][0];
        yx[1] += directions[mov][1];
        if (!isOOB(yx)) {
          currPos.push(yx);
          currDir.push(mov);
        }
      }
    }
    if (tile === "/" && !visited) {
      yx[0] += directions[fslashMap[mov]][0];
      yx[1] += directions[fslashMap[mov]][1];
      if (!isOOB(yx)) {
        currPos.push(yx);
        currDir.push(fslashMap[mov]);
      }
    }
    if (tile === "\\" && !visited) {
      yx[0] += directions[bslashMap[mov]][0];
      yx[1] += directions[bslashMap[mov]][1];
      if (!isOOB(yx)) {
        currPos.push(yx);
        currDir.push(bslashMap[mov]);
      }
    }
  }

  let energized = 0;
  for (let row of visitData) {
    for (let elem of row) {
      if (elem.includes(1)) {
        energized++;
      }
    }
  }
  return energized;
}

for (let row = 0; row < gridData.length; row++) {
  currPos.push([[row, 0]]);
  currDir.push([R]);
  currPos.push([[0, row]]);
  currDir.push([D]);
  currPos.push([[row, gridData.length - 1]]);
  currDir.push([L]);
  currPos.push([[gridData.length - 1, row]]);
  currDir.push([U]);
}

console.log(currPos);
console.log(currDir);

let bestEnergize = 0;
while (currPos.length > 0) {
  const cPos = currPos.pop();
  const cDir = currDir.pop();
  const cEn = calcEnergize(cPos, cDir);
  if (cEn > bestEnergize) {
    bestEnergize = cEn;
    console.log(bestEnergize)
  }
}
