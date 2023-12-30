import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay8.txt", "utf-8");
const splitFile = file.split("\r\n");
const directions = splitFile[0];
const mapStart = [];
const mapDest = [];
let currentLoc = "AAA";
let currentDir = 0;
let steps = 0;
for (let x = 2; x < splitFile.length; x++) {
  mapStart.push(splitFile[x].substring(0,3))
  mapDest.push([splitFile[x].substring(7,10),splitFile[x].substring(12,15)]);
}
//console.log(directions, mapStart, mapDest);

while (currentLoc !== "ZZZ"){
  steps++;
  const locIndex= mapStart.indexOf(currentLoc);
  currentLoc = directions[currentDir]==="L"?mapDest[locIndex][0]:mapDest[locIndex][1];
  currentDir!==directions.length-1?currentDir++:currentDir=0;
}

console.log("steps:",steps)

