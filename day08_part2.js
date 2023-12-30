import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay8.txt", "utf-8");
const splitFile = file.split("\r\n");
const directions = splitFile[0];
const mapStart = [];
const mapDest = [];
let currentLoc = [];
let currentDir = 0;
let steps = 0;
const multis = [];
for (let x = 2; x < splitFile.length; x++) {
  mapStart.push(splitFile[x].substring(0, 3));
  mapDest.push([splitFile[x].substring(7, 10), splitFile[x].substring(12, 15)]);
}
//console.log(directions, mapStart, mapDest);

for (const loc of mapStart) {
  if (loc[2] === "A") {
    currentLoc.push(loc);
    //    currentLoc.push("ZZZ");
  }
}

function escaped(cLocs) {
  for (const x of cLocs) {
    if (x[2] !== "Z") {
      return false;
    }
  }
  return true;
}

for (let x = 0; x < currentLoc.length; x++) {
  steps = 0;
  currentDir = 0;
  while (currentLoc[x][2] !== "Z") {
    steps++;
    const locIndex = mapStart.indexOf(currentLoc[x]);
    currentLoc[x] =
      directions[currentDir] === "L"
        ? mapDest[locIndex][0]
        : mapDest[locIndex][1];
    currentDir !== directions.length - 1 ? currentDir++ : (currentDir = 0);
    if (currentLoc[x][2] === "Z") {
      console.log("starter:", x, "z at:", steps);
      multis.push(steps);
    }
  }
}

console.log(multis);

for (let x=0; x<multis.length-1; x++) {
  const addA=multis[x];
  const addB=multis[x+1];
  while (multis[x]!==multis[x+1]){
    multis[x]<multis[x+1]?multis[x]=multis[x]+addA:multis[x+1]=multis[x+1]+addB;
  }
  console.log(multis);
}

// while (!escaped(currentLoc)) {
//   steps++;
//   for (let x = 0; x < currentLoc.length; x++) {
//     const locIndex = mapStart.indexOf(currentLoc[x]);
//     currentLoc[x] =
//       directions[currentDir] === "L"
//         ? mapDest[locIndex][0]
//         : mapDest[locIndex][1];
//     currentDir !== directions.length - 1 ? currentDir++ : (currentDir = 0);
//   }
//   if (steps % 1000000 === 0) {
//     console.log("steps:", steps);
//     console.log(currentLoc, escaped(currentLoc));
//   }
// }
console.log("steps:", steps);