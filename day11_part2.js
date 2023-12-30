import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay11.txt", "utf-8");
const universe = file.split("\r\n").map((x) => x.split(""));
const transposedU = [];
const hBarriers = [];
const vBarriers = [];

for (let y = 0; y < universe[0].length; y++) {
  transposedU.push([]);
}

for (let x = 0; x < universe.length; x++) {
  const a = new Set();
  universe[x].map((arrayelements) => a.add(arrayelements));
  if ([...a].length === 1) {
    hBarriers.push(x);
  }
}

for (let x = 0; x < universe.length; x++) {
  for (let y = 0; y < universe[x].length; y++) {
    transposedU[y].push(universe[x][y]);
  }
}

for (let x = 0; x < transposedU.length; x++) {
  const a = new Set();
  transposedU[x].map((arrayelements) => a.add(arrayelements));
  if ([...a].length === 1) {
    vBarriers.push(x);
  }
}

console.log(hBarriers, vBarriers);

const galaxyLog = [];

for (let x = 0; x < universe.length; x++) {
  for (let y = 0; y < universe[x].length; y++) {
    if (universe[x][y] === "#") {
      galaxyLog.push([x, y]);
    }
  }
}

console.log(galaxyLog);

let score = 0;

while (galaxyLog.length > 0) {
  let currentG = galaxyLog.pop();
  for (let galaxy of galaxyLog) {
    score +=
      Math.abs(currentG[0] - galaxy[0]) + Math.abs(currentG[1] - galaxy[1]);
    for (let barrier of hBarriers) {
      if (barrier > currentG[0] && barrier < galaxy[0]) {
        score += 999999;
      }
      if (barrier < currentG[0] && barrier > galaxy[0]) {
        score += 999999;
      }
    }
    for (let barrier of vBarriers) {
      if (barrier > currentG[1] && barrier < galaxy[1]) {
        score += 999999;
      }
      if (barrier < currentG[1] && barrier > galaxy[1]) {
        score += 999999;
      }
    }
  }
}

console.log(score);
