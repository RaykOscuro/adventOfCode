import { readFileSync } from "fs";

function cleanUp(arr) {
  arr.pop();
  arr.pop();
  arr.shift();
  for (let x = 0; x < arr.length; x++) {
    arr[x] = arr[x].split(" ");
    for (let y = 0; y < arr[x].length; y++) {
      arr[x][y] = Number(arr[x][y]);
    }
  }
}

function generalMapper(startValue, mappers) {
  for (let mapper of mappers) {
    if (startValue >= mapper[1] && startValue < mapper[1] + mapper[2]) {
      return startValue + (mapper[0] - mapper[1]);
    }
  }
  return startValue;
}

const file = readFileSync("./inputDataDay5.txt", "utf-8");
const splitFile = file.split(":");
const rawMaps = [];

for (let map of splitFile) {
  rawMaps.push(map.split("\r\n"));
}

const seeds = rawMaps[1][0].trim().split(" ");
for (let y = 0; y < seeds.length; y++) {
  seeds[y] = Number(seeds[y]);
}
const seedtosoil = rawMaps[2];
cleanUp(seedtosoil);
const soiltofert = rawMaps[3];
cleanUp(soiltofert);
const ferttowater = rawMaps[4];
cleanUp(ferttowater);
const watertolight = rawMaps[5];
cleanUp(watertolight);
const lighttotemp = rawMaps[6];
cleanUp(lighttotemp);
const temptohumid = rawMaps[7];
cleanUp(temptohumid);
const humidtoloc = rawMaps[8];
humidtoloc.shift();
for (let x = 0; x < humidtoloc.length; x++) {
  humidtoloc[x] = humidtoloc[x].split(" ");
  for (let y = 0; y < humidtoloc[x].length; y++) {
    humidtoloc[x][y] = Number(humidtoloc[x][y]);
  }
}

var seedLocations = [];

for (let seed of seeds) {
  let newValue = generalMapper(seed, seedtosoil);
  newValue = generalMapper(newValue, soiltofert);
  newValue = generalMapper(newValue, ferttowater);
  newValue = generalMapper(newValue, watertolight);
  newValue = generalMapper(newValue, lighttotemp);
  newValue = generalMapper(newValue, temptohumid);
  newValue = generalMapper(newValue, humidtoloc);
  seedLocations.push(newValue);
}

console.log(Math.min(...seedLocations));

// let sumOfEarnings = 0;

// for (let card of splitFile) {
//   let exponent = null;
//   let droppedCardInfo = card.split(":");
//   droppedCardInfo = droppedCardInfo[1].split("|");
//   const winningNumbers = droppedCardInfo[0].trim().split(" ").filter(isEmptyString);
//   const ourNumbers = droppedCardInfo[1].trim().split(" ").filter(isEmptyString);
//   for (let winN of winningNumbers) {
//     //    console.log(ourNumbers,winN);
//     if (ourNumbers.includes(winN)) {
//       exponent === null ? (exponent = 0) : (exponent += 1);
//       //      console.log("match!",exponent)
//     }
//   }
//   if (exponent !== null) {
//     sumOfEarnings += Math.pow(2, exponent);
//   }
// }
// console.log(sumOfEarnings);
