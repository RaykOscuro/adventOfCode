import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay11.txt", "utf-8");
const universe = file.split("\r\n").map((x) => x.split(""));
const expandedV = [];
const transposedU = [];
const expandedH = [];

for (let y = 0; y < universe[0].length; y++) {
  transposedU.push([]);
}

for (let x = 0; x < universe.length; x++) {
  const a = new Set();
  universe[x].map((arrayelements) => a.add(arrayelements));
  if ([...a].length === 1) {
    expandedV.push(universe[x]);
  }
  expandedV.push(universe[x]);
}

for (let x = 0; x < expandedV.length; x++) {
  for (let y = 0; y < expandedV[x].length; y++) {
    transposedU[y].push(expandedV[x][y]);
  }
}

for (let x = 0; x < transposedU.length; x++) {
  const a = new Set();
  transposedU[x].map((arrayelements) => a.add(arrayelements));
  if ([...a].length === 1) {
    expandedH.push(transposedU[x]);
  }
  expandedH.push(transposedU[x]);
}

//console.log(expandedH);

const galaxyLog = [];

for (let x = 0; x < expandedH.length; x++) {
  for (let y = 0; y < expandedH[x].length; y++) {
    if (expandedH[x][y] === "#") {
      galaxyLog.push([x, y]);
    }
  }
}

console.log(galaxyLog);

let score = 0;

while (galaxyLog.length > 0) {
  let currentG = galaxyLog.pop();
  for (let galaxy of galaxyLog){
    score += Math.abs(currentG[0]-galaxy[0])+Math.abs(currentG[1]-galaxy[1])
  }
}
