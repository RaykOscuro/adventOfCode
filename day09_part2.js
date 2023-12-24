import { readFileSync } from "fs";
import { get } from "http";
import { posix } from "path";

const file = readFileSync("./inputDataDay9.txt", "utf-8");
const splitFile = file.split("\r\n");
for (let x = 0; x < splitFile.length; x++) {
  splitFile[x] = splitFile[x].split(" ");
  for (let y = 0; y < splitFile[x].length; y++) {
    splitFile[x][y] = Number(splitFile[x][y]);
  }
}

function getDiffArray(inputArray) {
  const diffArray = [];
  for (let x = 0; x < inputArray.length - 1; x++) {
    diffArray.push(inputArray[x + 1] - inputArray[x]);
  }
  return diffArray;
}

function noDiffs(inputArray) {
  // if (inputArray.isEmpty()){
  //   return false;
  // }
  for (const x of inputArray) {
    if (x !== 0) {
      return false;
    }
  }
  return true;
}

let addedResults = 0;

for (const data of splitFile) {
  const diffArray = [data.reverse()];
  let helperArray = [];
  //console.log(getDiffArray(diffArray[diffArray.length-1]))
  while (!noDiffs(diffArray[diffArray.length-1])){
     diffArray.push(getDiffArray(diffArray[diffArray.length-1]))
  }
  console.log(diffArray)
  for (let x=diffArray.length-2; x>=0; x--){
    diffArray[x].push(diffArray[x][diffArray[x].length-1]+diffArray[x+1][diffArray[x+1].length-1])
  }
  addedResults+=diffArray[0][diffArray[0].length-1];
}

console.log(addedResults);