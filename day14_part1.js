import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay14.txt", "utf-8");
const dishData = file.split("\r\n");

function transpose(thisArray) {
  const transposedArray = [];
  for (let y = 0; y < thisArray[0].length; y++) {
    transposedArray.push([]);
  }

  for (let x of thisArray) {
    for (let y = 0; y < x.length; y++) {
      transposedArray[y].push(x[y]);
    }
  }
  return transposedArray;
}

const turnedDish = transpose(dishData);

//console.log(turnedDish);

let score = 0;

for (let col of turnedDish) {
  let maxScore = col.length;
  let step = col.length;
  for (let pos of col) {
    step--;
    if (pos === "O") {
      score += maxScore;
      console.log(maxScore);
      maxScore--;
    }
    if (pos === "#") {
      maxScore = step;
    }
  }
}

console.log(score);
