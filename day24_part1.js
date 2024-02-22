import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay24.txt", "utf-8");
const hailData = file.split("\r\n").map((node) => node.split(" @ "));
const cleanHailData = [];
const finalHailData = [];
const testMin = 200000000000000;
const testMax = 400000000000000;

for (let node of hailData) {
  cleanHailData.push([node[0].split(", "), node[1].split(", ")]);
}

for (let node of cleanHailData) {
  const tempA = [];
  const tempB = [];
  for (let element of node[0]) {
    tempA.push(Number(element));
  }
  for (let element of node[1]) {
    tempB.push(Number(element));
  }
  finalHailData.push([tempA, tempB]);
}

console.log(finalHailData);

let aSlope, bSlope, aYoffset, bYoffset, slopeDiff, offsDiff, xMeet, yMeet;
let valid = 0;

for (let a = 0; a < finalHailData.length - 1; a++) {
  for (let b = a + 1; b < finalHailData.length; b++) {
    let wrong = false;
    // for (let a = 0; a < 1; a++) {
    //   for (let b = a + 1; b < 2; b++) {
    aSlope = finalHailData[a][1][1] / finalHailData[a][1][0];
    bSlope = finalHailData[b][1][1] / finalHailData[b][1][0];
    aYoffset =
      finalHailData[a][0][1] -
      (finalHailData[a][0][0] / finalHailData[a][1][0]) *
        finalHailData[a][1][1];
    bYoffset =
      finalHailData[b][0][1] -
      (finalHailData[b][0][0] / finalHailData[b][1][0]) *
        finalHailData[b][1][1];
    slopeDiff = aSlope - bSlope;
    offsDiff = aYoffset - bYoffset;
    xMeet = -offsDiff / slopeDiff;
    yMeet = aSlope * xMeet + aYoffset;
    console.log(xMeet, yMeet);
    if (
      (finalHailData[a][1][0] > 0 && xMeet < finalHailData[a][0][0]) ||
      (finalHailData[b][1][0] > 0 && xMeet < finalHailData[b][0][0]) ||
      (finalHailData[a][1][0] < 0 && xMeet > finalHailData[a][0][0]) ||
      (finalHailData[b][1][0] < 0 && xMeet > finalHailData[b][0][0]) ||
      (finalHailData[a][1][1] > 0 && yMeet < finalHailData[a][0][1]) ||
      (finalHailData[b][1][1] > 0 && yMeet < finalHailData[b][0][1]) ||
      (finalHailData[a][1][1] < 0 && yMeet > finalHailData[a][0][1]) ||
      (finalHailData[b][1][1] < 0 && yMeet > finalHailData[b][0][1])
    ) {
      console.log("Time Travel");
      wrong = true;
    }
    if (
      (xMeet === Infinity) |
      (yMeet === Infinity) |
      (xMeet === -Infinity) |
      (yMeet === -Infinity)
    ) {
      console.log("Infinity");
      wrong = true;
    }
    if (
      (xMeet < testMin) |
      (xMeet > testMax) |
      (yMeet < testMin) |
      (yMeet > testMax)
    ) {
      console.log("Outside");
      wrong = true;
    }
    if (!wrong) {
      valid += 1;
    }
  }
}

console.log(valid)