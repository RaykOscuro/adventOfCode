import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay12.txt", "utf-8");
const springData = file.split("\r\n").map((x) => x.split(" "));
let springMap = [];
const brokenSprings = [];

for (let dat of springData) {
  const helper = [];
  springMap.push([...dat[0]]);
  dat[1] = dat[1].split(",");
  for (let x of dat[1]) {
    helper.push(Number(x));
  }
  brokenSprings.push([helper, helper, helper, helper, helper].flat());
}
console.log(springMap);
springMap = springMap.map((elem) =>
  [elem, ["?"], elem, ["?"], elem, ["?"], elem, ["?"], elem].flat()
);
console.log(springMap);
//console.log(springMap[1], brokenSprings[1]);

function fits(cArr, len) {
  if (cArr.length < len) {
    return false;
  }
  for (let x = 0; x < len; x++) {
    if (cArr[x] === ".") {
      return false;
    }
  }
  if (cArr[len] === "#") {
    return false;
  }
  return true;
}

function arrayConstructor(cArr, cBS, prevS) {
  //  console.log(cArr, bArr, cBS);
  let score = 0;
  let tmpString = "";
  if (cArr[0] === "?" && cBS.length > 0) {
    if (fits(cArr, cBS[0]) && prevS !== "#") {
      score += arrayConstructor(cArr.slice(cBS[0]), cBS.slice(1), "#");
    }
    //     if (prevS === "#") {
    //       arrayConstructor(mArr, cBS, ".");
    //     } else {
    //       for (let x = 0; x < cBS[0] - 1; x++) {}
    //       arrayConstructor();
    score += arrayConstructor(cArr.slice(1), cBS, ".");
  }

  if (cArr[0] === "#" && cBS.length > 0) {
    if (fits(cArr, cBS[0])) {
      score += arrayConstructor(cArr.slice(cBS[0]), cBS.slice(1), "#");
    }
  }
  if (cArr[0] === "." && cBS.length > 0) {
    score += arrayConstructor(cArr.slice(1), cBS, ".");
  }
  if (cBS.length === 0 && cArr.indexOf("#") === -1) {
    score++;
    //console.log(bArr);
  }
  return score;
}

// let score = 0;
// for (let x = 0; x < springMap.length; x++) {
//   score += arrayConstructor(springMap[x], brokenSprings[x], "");
//   console.log(x);
// }
// console.log(score);
