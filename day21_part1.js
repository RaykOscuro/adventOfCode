import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay21.txt", "utf-8");
const gardenData = file.split("\r\n");
const activePos = new Set([]);
const rockPos = [];
const maxX = gardenData[0].length - 1;
let switcher = 0;
const prevTwo = ["", ""];

function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}

for (let x = 0; x < gardenData.length; x++) {
  let temp = gardenData[x].indexOf("S");
  if (temp !== -1) {
    activePos.add(JSON.stringify([temp, x]));
  }
  temp = getAllIndexes(gardenData[x], "#");
  for (let y of temp) {
    rockPos.push(JSON.stringify([y, x]));
  }
}

// console.log(activePos);
console.log(rockPos);

let counter = 0;

function activateNextWave(activePos) {
  counter++;
  const newActivePos = new Set([]);
  activePos.forEach((cPosS) => {
    const cPos = JSON.parse(cPosS);
    //console.log(cPos);
    const potPos = [
      [cPos[0] + 1, cPos[1]],
      [cPos[0], cPos[1] + 1],
      [cPos[0] - 1, cPos[1]],
      [cPos[0], cPos[1] - 1],
    ];
    for (let pPos of potPos) {
      //console.log(pPos[1]);
      if (
        !rockPos.includes(JSON.stringify(pPos)) &&
        !(pPos[0] < 0) &&
        !(pPos[1] < 0) &&
        !(pPos[0] > maxX) &&
        !(pPos[1] > gardenData.length - 1)
      ) {
        newActivePos.add(JSON.stringify(pPos));
      }
    }
  });

  if (counter >= 64) {
    //console.log("stringSet", prevTwo[1]);
    console.log(counter, newActivePos);
    return newActivePos;
  } else {
    prevTwo[switcher] = JSON.stringify(newActivePos);
    if (switcher === 0) {
      switcher = 1;
    } else {
      switcher = 0;
    }
    //console.log(prevTwo);
    //console.log(newActivePos);
    activateNextWave(newActivePos);
  }
}

activateNextWave(activePos);
