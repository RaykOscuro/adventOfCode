// what do we know?
// - tree-like structure -> each node has up to 3 children, except root (has 4)
//   - nodes can have more than one parent (that's horrible)
// - overlap between activated nodes is an issue
// - "inside" is gonna get filled out eventually, outer perimeter matters most
// - we might have to label and keep track of "field repetitions" and link nodes to fields
// - only outmost "layer" of nodes matters -> activated once? done!
// - no rock scenario: 1²->2²->3²->...->25.000.000²
// - investigate exact map-repetition behaviour

import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay21.txt", "utf-8");
const gardenData = file.split("\r\n");
const activePos = new Set([]);
const rockPos = [];
const maxX = gardenData[0].length - 1;
const ruleArray = [];
const activeArray = [];

function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}

function getCoordinates(cCoord) {
  let northY = 0;
  let southY = 0;
  let westX = 0;
  let eastX = 0;
  if (cCoord[1] === 0) {
    northY = gardenData.length - 1;
  } else {
    northY = cCoord[1] - 1;
  }
  if (cCoord[1] === gardenData.length - 1) {
    southY = 0;
  } else {
    southY = cCoord[1] + 1;
  }
  if (cCoord[0] === 0) {
    eastX = gardenData[0].length - 1;
  } else {
    eastX = cCoord[0] - 1;
  }
  if (cCoord[0] === gardenData[0].length - 1) {
    westX = 0;
  } else {
    westX = cCoord[0] + 1;
  }
  return [
    [cCoord[0], northY],
    [cCoord[0], southY],
    [westX, cCoord[1]],
    [eastX, cCoord[1]],
  ];
}

for (let y = 0; y < gardenData.length; y++) {
  const newArray = [];
  const newArrayB = [];
  for (let x = 0; x < gardenData[y].length; x++) {
    newArray.push([]);
    newArrayB.push(0);
  }
  ruleArray.push(newArray);
  activeArray.push(newArrayB);
}

for (let y = 0; y < gardenData.length; y++) {
  const tempArray = [];
  ruleArray.push(tempArray);
  for (let x = 0; x < gardenData[y].length; x++) {
    const maybeStoneLoc = getCoordinates([x, y]);
    for (let z = 0; z < 4; z++) {
      if (gardenData[maybeStoneLoc[z][0]][maybeStoneLoc[z][1]] != "#") {
        getCoordinates(maybeStoneLoc[z]).forEach((loc) => {
          if (JSON.stringify(loc) !== JSON.stringify([x, y])) {
            ruleArray[x][y].push(JSON.stringify(loc));
          }
        });
      }
    }
  }
  let temp = getAllIndexes(gardenData[y], "S");
  if (temp !== -1) {
    for (let x of temp) {
      activePos.add(JSON.stringify([x, y]));
      activeArray[x][y] += 1;
    }
  }
  console.log(activeArray);
  temp = getAllIndexes(gardenData[y], "#");
  if (temp !== -1) {
    for (let x of temp) {
      rockPos.push(JSON.stringify([x, y]));
    }
  }
}

console.log(new Set(ruleArray[1][1]));

// console.log(activePos);
//console.log(rockPos);

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

  if (counter >= 63) {
    //console.log("stringSet", prevTwo[1]);
    //console.log(counter, newActivePos);
    return newActivePos;
  } else {
    //console.log(prevTwo);
    //console.log(newActivePos);
    activateNextWave(newActivePos);
  }
}

activateNextWave(activePos);
