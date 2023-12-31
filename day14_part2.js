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

function rotate(thisArray) {
  const rotatedArray = [];
  for (let y = 0; y < thisArray[0].length; y++) {
    rotatedArray.push([]);
  }

  //  123 [36][25][14]
  //  456

  for (let x of thisArray) {
    //[123],[456]
    for (let y = 0; y < x.length; y++) {
      rotatedArray[y].push(x[x.length - 1 - y]);
    }
  }
  return rotatedArray;
}

let turnedDish = transpose(dishData);

//console.log(turnedDish);

function tilt(toTilt) {
  let tiltArray = [];
  for (let col of toTilt) {
    tiltArray.push([]);
    let step = 0;
    for (let pos of col) {
      if (pos === "O") {
        tiltArray[tiltArray.length - 1].push("O");
      } else if (pos === "#") {
        for (let x = 0; x < step; x++) {
          tiltArray[tiltArray.length - 1].push(".");
        }
        tiltArray[tiltArray.length - 1].push("#");
        step = 0;
      } else {
        step++;
      }
    }
    for (let x = 0; x < step; x++) {
      tiltArray[tiltArray.length - 1].push(".");
    }
  }
  return tiltArray;
}

function cycle(thisArray, cycles) {
  let cycleArray = thisArray;
  for (let x = 0; x < 4 * cycles; x++) {
    cycleArray = tilt(cycleArray);
    cycleArray = rotate(cycleArray);
    if ((x + 1) % 4 === 0) {
      console.log(getScore(cycleArray));
    }
  }
  return cycleArray;
}

turnedDish = cycle(turnedDish, 1000);

function getScore(thisArray) {
  let score = 0;

  for (let col of thisArray) {
    let step = 0;
    for (let pos of col) {
      if (pos === "O") {
        score += col.length-step;
        //      console.log(maxScore);
      }
      step++;
    }
  }
  return score;
}
