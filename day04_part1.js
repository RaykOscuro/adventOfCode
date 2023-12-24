import { readFileSync } from "fs";
import { posix } from "path";

function isEmptyString(input) { 
  return input !== ''; 
} 

const file = readFileSync("./inputDataDay4.txt", "utf-8");
const splitFile = file.split("\r\n");

let sumOfEarnings = 0;

for (let card of splitFile) {
  let exponent = null;
  let droppedCardInfo = card.split(":");
  droppedCardInfo = droppedCardInfo[1].split("|");
  const winningNumbers = droppedCardInfo[0].trim().split(" ").filter(isEmptyString);
  const ourNumbers = droppedCardInfo[1].trim().split(" ").filter(isEmptyString);
  for (let winN of winningNumbers) {
    //    console.log(ourNumbers,winN);
    if (ourNumbers.includes(winN)) {
      exponent === null ? (exponent = 0) : (exponent += 1);
      //      console.log("match!",exponent)
    }
  }
  if (exponent !== null) {
    sumOfEarnings += Math.pow(2, exponent);
  }
}
console.log(sumOfEarnings);

// const maybeNumbers = splitFile[0].split(".");

// function identifyNumbers(testLine) {
//   const numbers = [];
//   let currentNumber = "";
//   let currentIndeces = [];
//   for (let x = 0; x < testLine.length; x++) {
//     if (!isNaN(Number(testLine[x]))) {
//       currentNumber += testLine[x];
//       currentIndeces.push(x);
//       if (isNaN(Number(testLine[x + 1]))) {
//         numbers.push([Number(currentNumber), currentIndeces]);
//         currentNumber = "";
//         currentIndeces = [];
//       }
//     }
//   }
//   return numbers;
// }

// function identifySymbols(testLine) {
//   const indeces = [];
//   for (let x = 0; x < testLine.length; x++) {
//     //    if (isNaN(Number(testLine[x])) && testLine[x] != ".") {
//     if (testLine[x] == "*") {
//       indeces.push(x);
//     }
//   }
//   return indeces;
// }

// let addedGearR = 0;
// for (let x = 0; x < splitFile.length; x++) {
//   const previousL = splitFile[x - 1] ? splitFile[x - 1] : "..........";
//   const currentL = splitFile[x];
//   const followL = splitFile[x + 1] ? splitFile[x + 1] : "..........";
//   const previousN = identifyNumbers(previousL);
//   const currentS = identifySymbols(currentL);
//   const currentN = identifyNumbers(currentL);
//   const nextN = identifyNumbers(followL);
//   for (const star of currentS) {
//     let matched = [];
//     for (const number of currentN) {
//       for (const location of number[1]) {
//         if (location + 1 === star || location - 1 === star) {
//           matched.push(number[0]);
//         }
//       }
//     }
//     for (const number of previousN) {
//       for (const location of number[1]) {
//         if (
//           location === star ||
//           location - 1 === star ||
//           location + 1 === star
//         ) {
//           matched.push(number[0]);
//           break;
//         }
//       }
//     }
//     for (const number of nextN) {
//       for (const location of number[1]) {
//         if (
//           location === star ||
//           location - 1 === star ||
//           location + 1 === star
//         ) {
//           matched.push(number[0]);
//           break;
//         }
//       }
//     }
//     if (matched.length > 1) {
//       addedGearR += matched[0] * matched[1];
//     }
//   }
// }
// console.log(addedGearR);
// console.log(maybeNumbers);
// let sumOfParts = 0;

// for (let x = 0; x < splitFile.length; x++) {
//   const previousL = splitFile[x - 1] ? splitFile[x - 1] : "..........";
//   const currentL = splitFile[x];
//   const followL = splitFile[x + 1] ? splitFile[x + 1] : "..........";
//   const previousS = identifySymbols(previousL);
//   const currentS = identifySymbols(currentL);
//   const currentNumbers = identifyNumbers(currentL);
//   const nextS = identifySymbols(followL);
//   for (let cNumber of currentNumbers) {
//     for (let z of cNumber[1]) {
//       var matched = false;
//       for (let a of previousS) {
//         if (z === a || z === a - 1 || z === a + 1) {
//           console.log("match!", cNumber[0]);
//           sumOfParts += cNumber[0];
//           matched = true;
//         }
//         if (matched) break;
//       }
//       if (!matched) {
//         for (let a of currentS) {
//           if (z === a - 1 || z === a + 1) {
//             console.log("match!", cNumber[0]);
//             sumOfParts += cNumber[0];
//             matched = true;
//           }
//           if (matched) break;
//         }
//       }
//       if (!matched) {
//         for (let a of nextS) {
//           if (z === a || z === a - 1 || z === a + 1) {
//             console.log("match!", cNumber[0]);
//             sumOfParts += cNumber[0];
//             matched = true;
//           }
//           if (matched) break;
//         }
//       }
//       if (matched) break;
//     }
//   }
// }

//console.log(sumOfParts);

// function extractID(input) {
//   return input.split(":")[0].slice(5);
// }

// function extractGames(input) {
//   return input.split(":")[1].split(";");
// }

// function getAmount(game, index) {
//   let myAmount = 0;
//   let x = 0;
//   while (!isNaN(Number(game[index - x - 2]))) {
//     myAmount += game[index - x - 2] * Math.pow(10, x);
//     x++;
//   }
//   return myAmount;
// }

// var sumOfIDs = 0;
// var powerSet = 0;
// for (let x of file.split("\r\n")) {
//   var currentGames = extractGames(x);
//   var maxRed = 0;
//   var maxGreen = 0;
//   var maxBlue = 0;
//   for (const game of currentGames) {
//     const redIndex = game.indexOf("red");
//     const greenIndex = game.indexOf("green");
//     const blueIndex = game.indexOf("blue");
//     maxRed = Math.max(maxRed, getAmount(game, redIndex));
//     maxGreen = Math.max(maxGreen, getAmount(game, greenIndex));
//     maxBlue = Math.max(maxBlue, getAmount(game, blueIndex));
//   }
//   //  console.log(currentGames,maxRed,maxGreen,maxBlue)
//   // if (maxRed<13 && maxGreen<14 && maxBlue<15){
//   //   sumOfIDs+=Number(extractID(x));
//   //   console.log(extractID(x));
//   // }

//   powerSet = maxRed * maxGreen * maxBlue;
//   sumOfIDs += powerSet;
// }

// console.log(sumOfIDs);

// console.log(isNaN(Number(currentGames[0][3])));

// const blueIndex = extractGames(splitFile[0])[0].indexOf("blue");
// const greenIndex = extractGames(splitFile[0])[0].indexOf("green");
