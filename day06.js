import { readFileSync } from "fs";
import { posix } from "path";

const file = readFileSync("./inputDataDay6.txt", "utf-8");
const splitFile = file.split("\r\n");
const times = splitFile[0].split(" ");
const dists = splitFile[1].split(" ");

let allOptions = 1;
for (let x = 0; x < times.length; x++) {
  let currentOptions = 0;
  for (let y = 1; y < times[x]; y++) {
    let dist = y * (times[x] - y);
    if (dist > dists[x]) {
      currentOptions++;
    }
  }
  allOptions = allOptions * currentOptions;
}
console.log(allOptions);
