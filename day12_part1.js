import { readFileSync } from "fs";
import { get } from "http";
import { posix } from "path";

const file = readFileSync("./inputDataDay12.txt", "utf-8");
const springData = file.split("\r\n").map((x) => x.split(" "));
const springMap = [];
const brokenSprings = [];

for (let dat of springData) {
  const helper = [];
  springMap.push([...dat[0]]);
  dat[1] = dat[1].split(",");
  for (let x of dat[1]) {
    helper.push(Number(x))
  }
  brokenSprings.push(helper);
}

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

function arrayConstructor(cArr, cBS, prevS, bArr) {
//  console.log(cArr, bArr, cBS);
  let score = 0;
  let tmpString = "";
  if (cArr[0] === "?" && cBS.length > 0) {
    if (fits(cArr, cBS[0]) && prevS !== "#") {
      tmpString = bArr + cArr.slice(0, cBS[0]).toString();
      score += arrayConstructor(
        cArr.slice(cBS[0]),
        cBS.slice(1),
        "#",
        tmpString
      );
    }
    //     if (prevS === "#") {
    //       arrayConstructor(mArr, cBS, ".");
    //     } else {
    //       for (let x = 0; x < cBS[0] - 1; x++) {}
    //       arrayConstructor();
    score += arrayConstructor(cArr.slice(1), cBS, ".", (bArr += "."));
  }

  if (cArr[0] === "#" && cBS.length > 0) {
    if (fits(cArr, cBS[0])) {
      tmpString = bArr + cArr.slice(0, cBS[0]).toString();
      score += arrayConstructor(
        cArr.slice(cBS[0]),
        cBS.slice(1),
        "#",
        tmpString
      );
    }
  }
  if (cArr[0] === "." && cBS.length > 0) {
    score += arrayConstructor(cArr.slice(1), cBS, ".", (bArr += "."));
  }
  if (cBS.length === 0 && cArr.indexOf("#") === -1) {
    score++;
    //console.log(bArr);
  }
  return score;
}

let score = 0;
for (let x = 0; x < springMap.length; x++) {
  score += arrayConstructor(springMap[x], brokenSprings[x], "", "");
}
console.log(score);
