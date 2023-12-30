import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay2.txt", "utf-8");

const splitFile = file.split("\r\n");

function extractID(input) {
  return input.split(":")[0].slice(5);
}

function extractGames(input) {
  return input.split(":")[1].split(";");
}

function getAmount(game, index) {
  let myAmount = 0;
  let x = 0;
  while (!isNaN(Number(game[index - x - 2]))) {
    myAmount += game[index - x - 2] * Math.pow(10, x);
    x++;
  }
  return myAmount;
}

var sumOfIDs = 0;
var powerSet = 0;
for (let x of file.split("\r\n")) {
  var currentGames = extractGames(x);
  var maxRed = 0;
  var maxGreen = 0;
  var maxBlue = 0;
  for (const game of currentGames) {
    const redIndex = game.indexOf("red");
    const greenIndex = game.indexOf("green");
    const blueIndex = game.indexOf("blue");
    maxRed = Math.max(maxRed, getAmount(game, redIndex));
    maxGreen = Math.max(maxGreen, getAmount(game, greenIndex));
    maxBlue = Math.max(maxBlue, getAmount(game, blueIndex));
  }
  //  console.log(currentGames,maxRed,maxGreen,maxBlue)
  // if (maxRed<13 && maxGreen<14 && maxBlue<15){
  //   sumOfIDs+=Number(extractID(x));
  //   console.log(extractID(x));
  // }

  powerSet = maxRed * maxGreen * maxBlue;
  sumOfIDs += powerSet;
}

console.log(sumOfIDs);

// console.log(isNaN(Number(currentGames[0][3])));

// const blueIndex = extractGames(splitFile[0])[0].indexOf("blue");
// const greenIndex = extractGames(splitFile[0])[0].indexOf("green");