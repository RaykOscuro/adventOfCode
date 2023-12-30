import { readFileSync } from "fs";

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
  for (let y = 1; y < mMap.length; y++) {
    if (strCompare(mMap[0], mMap[y])) {
      console.log("MaybeI @", y, mMap.slice(1, y));
      //console.log(y, "maybe mirror!");
      //console.log(mMap.slice(0, y + 1), "Yay!");
      if (confirmMirror(mMap.slice(1, y))) {
        //console.log("Yay!", (y+1)/2);
        return (y + 1) / 2;
      }
    }
    if (mMap[0] === mMap[y]) {
      console.log("MaybeI @", y, mMap.slice(1, y));
      //console.log(y, "maybe mirror!");
      //console.log(mMap.slice(0, y + 1), "Yay!");
      if (confirmMirrorAlt(mMap.slice(1, y))) {
        //console.log("Yay!", (y+1)/2);
        return (y + 1) / 2;
      }
    }
  }
  for (let x = 1; x < mMap.length - 1; x++) {
    if (strCompare(mMap[x], mMap[mMap.length - 1])) {
      console.log("Maybe @", x, mMap.slice(x + 1, mMap.length - 1));
      if (confirmMirror(mMap.slice(x + 1, mMap.length - 1))) {
        //console.log("Mirror!", (x + mMap.length) / 2);
        return (x + mMap.length) / 2;
      }
    }
    if (mMap[x] === mMap[mMap.length - 1]) {
      console.log("Maybe @", x, mMap.slice(x + 1, mMap.length - 1));
      if (confirmMirrorAlt(mMap.slice(x + 1, mMap.length - 1))) {
        //console.log("Mirror!", (x + mMap.length) / 2);
        return (x + mMap.length) / 2;
      }
    }
  }
  return 0;
}

function confirmMirror(mMap) {
  if (mMap.length % 2 > 0) {
    console.log(mMap);
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

function confirmMirrorAlt(mMap) {
  let adjustable = true;
  let checked = false;
  if (mMap.length % 2 > 0) {
    console.log(mMap);
    console.log("uneven");
    return false;
  }
  for (let x = 0; x < mMap.length / 2; x++) {
    if (mMap[x] !== mMap[mMap.length - 1 - x]) {
      checked = strCompare(mMap[x], mMap[mMap.length - 1 - x]);
      if (!adjustable || !checked) return false;
      if (checked) {
        adjustable = false;
      }
    }
  }
  if (checked) {
    return true;
  }
  return false;
}

function strCompare(str1, str2) {
  let diff = 0;
  for (let x = 0; x < str1.length; x++) {
    if (str1[x] !== str2[x]) {
      diff += 1;
    }
  }
  if (diff === 1) return true;
  return false;
}

let score = 0;
for (let mappy of mirrorData) {
  // for (let x = 0; x < mappy.length - 1; x++) {
  //   for (let y = x + 1; y < mappy.length; y++) {
  //     if (strCompare(mappy[x], mappy[y])) {
  //       if (confirmMirror(mappy.slice(x,y+1))){
  //         console.log("yay!")
  //       }
  //     }
  //   }
  // }
  score += 100 * findMirror(mappy);
  if (findMirror(mappy) === 0) {
    score += findMirror(transposer(mappy));
  }
}

console.log(score);
