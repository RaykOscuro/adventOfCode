import { readFileSync } from "fs";
import { get } from "http";
import { posix } from "path";

const file = readFileSync("./inputDataDay13.txt", "utf-8");
const mirrorData = file.split("\r\n\r\n").map((x) => x.split("\r\n"));

// for (let y = 0; y < mirrorData.length; y++) {
//   flippedData.push([]);
//   for (let x = 0; x < mirrorData[y][0].length; x++) {
//     flippedData[y].push("");
//   }
// }

// for (let y = 0; y < mirrorData.length; y++) {
//   //iterate through maps
function transposer(toTranspose) {
  const transposed = [];
  for (let x = 0; x < toTranspose[0].length; x++) {
    transposed.push("");
  }
  for (let z = 0; z < toTranspose[0].length; z++) {
    //iterate through position in line
    for (let x = 0; x < toTranspose.length; x++) {
      //iterate through lines
      transposed[z] += toTranspose[x][z];
    }
  }
  return transposed;
}
// }

function findMirror(mMap) {
  let initialMatch = false;
  for (let y = 1; y < mMap.length; y++) {
    if (mMap[0] === mMap[y]) {
      //console.log(y, "maybe mirror!");
      //console.log(mMap.slice(0, y + 1), "Yay!");
      if (confirmMirror(mMap.slice(0, y + 1))) {
        //console.log("Yay!", (y+1)/2);
        return ((y+1) / 2);
      }
    }
  }
  for (let x = 1; x < mMap.length - 1; x++) {
    if (mMap[x] === mMap[mMap.length - 1]) {
      //console.log("Maybe @", x, mMap.slice(x, mMap.length));
      if (confirmMirror(mMap.slice(x, mMap.length))) {
        //console.log("Mirror!", (x + mMap.length) / 2);
        return (x + mMap.length) / 2;
      }
    }
  }
  return 0;
}

function confirmMirror(mMap) {
  if (mMap.length % 2 > 0) {
    console.log("uneven");
    return false;
  }
  for (let x = 0; x < mMap.length / 2; x++) {
    if (mMap[x] !== mMap[mMap.length - 1 - x]) {
      return false;
    }
  }
  return true;
}

let score=0;
for (let mappy of mirrorData) {
  score +=100*findMirror(mappy);
  if (findMirror(mappy)===0) {
    score+=findMirror(transposer(mappy));
  }
}

console.log(score);