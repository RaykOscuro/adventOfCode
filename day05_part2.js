import { readFileSync } from "fs";
import { posix } from "path";

// 1. step: check backwards

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
    if (startValue >= mapper[0] && startValue < mapper[0] + mapper[2]) {
      return startValue - (mapper[0] - mapper[1]);
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
const newSeeds = [];
console.log(seeds);
for (let y = 0; y < seeds.length; y = y + 2) {
  newSeeds.push([Number(seeds[y]), Number(seeds[y]) + Number(seeds[y + 1])]);
}
console.log(newSeeds);
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

let found = false;

for (let x = 0; x < 1000000000; x++) {
  let seed = x;
  seed = generalMapper(seed, humidtoloc);
  seed = generalMapper(seed, temptohumid);
  seed = generalMapper(seed, lighttotemp);
  seed = generalMapper(seed, watertolight);
  seed = generalMapper(seed, ferttowater);
  seed = generalMapper(seed, soiltofert);
  seed = generalMapper(seed, seedtosoil);
  if (x % 1000000 === 0) {
    //   console.log(x, seed);
  }
  for (let seedrange of newSeeds) {
    if (seed > seedrange[0] && seed < seedrange[1]) {
      console.log(x, seed);
      found = true;
      break;
    }
  }
  if (found) {
    break;
  }
}

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
