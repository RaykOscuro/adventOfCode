import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay14.txt", "utf-8");
const turnedDish = [];
const dishData = file.split("\r\n");
for (let y = 0; y < dishData[0].length; y++) {
  turnedDish.push([]);
}

for (let x of dishData) {
  for (let y = 0; y < x.length; y++) {
    turnedDish[y].push(x[y]);
  }
}

console.log(turnedDish);
