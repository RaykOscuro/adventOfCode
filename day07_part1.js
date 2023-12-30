import { readFileSync } from "fs";

const fiveOAK = [];
const fourOAK = [];
const fullHouse = [];
const threeOAK = [];
const twoPairs = [];
const twoOAK = [];
const highCard = [];

const cardOrder = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

function compareFn(a, b) {
  if (a[0][0] !== b[0][0]) {
    return cardOrder.indexOf(b[0][0]) - cardOrder.indexOf(a[0][0]);
  } else if (a[0][1] !== b[0][1]) {
    return cardOrder.indexOf(b[0][1]) - cardOrder.indexOf(a[0][1]);
  } else if (a[0][2] !== b[0][2]) {
    return cardOrder.indexOf(b[0][2]) - cardOrder.indexOf(a[0][2]);
  } else if (a[0][3] !== b[0][3]) {
    return cardOrder.indexOf(b[0][3]) - cardOrder.indexOf(a[0][3]);
  } else if (a[0][4] !== b[0][4]) {
    return cardOrder.indexOf(b[0][4]) - cardOrder.indexOf(a[0][4]);
  }
}

function firstSort(hand) {
  let cardTracker = [];
  let cardCount = [];
  for (let x = 0; x < 5; x++) {
    const cardPos = cardTracker.indexOf(hand[0][x]);
    if (cardPos !== -1) {
      cardCount[cardPos]++;
    } else {
      cardTracker.push(hand[0][x]);
      cardCount.push(1);
    }
  }
  cardCount.sort();
  if (cardCount.toString() == [1, 1, 1, 1, 1].toString()) {
    highCard.push(hand);
  } else if (cardCount.toString() == [1, 1, 1, 2].toString()) {
    twoOAK.push(hand);
  } else if (cardCount.toString() == [1, 2, 2].toString()) {
    twoPairs.push(hand);
  } else if (cardCount.toString() == [1, 1, 3].toString()) {
    threeOAK.push(hand);
  } else if (cardCount.toString() == [2, 3].toString()) {
    fullHouse.push(hand);
  } else if (cardCount.toString() == [1, 4].toString()) {
    fourOAK.push(hand);
  } else if (cardCount.toString() == [5].toString()) {
    fiveOAK.push(hand);
  } else {
    console.log("!!!");
  }
}

const file = readFileSync("./inputDataDay7.txt", "utf-8");
const splitFile = file.split("\r\n");
for (let x = 0; x < splitFile.length; x++) {
  splitFile[x] = splitFile[x].split(" ");
  splitFile[x][1] = Number(splitFile[x][1]);
  const output = firstSort(splitFile[x]);
  //console.log(output);
}
//console.log(splitFile);

const results = [
  fiveOAK,
  fourOAK,
  fullHouse,
  threeOAK,
  twoPairs,
  twoOAK,
  highCard,
];
//console.log(results);
//const testArr = ["KK55A","KK55J"];
//testArr.sort(compareFn);
//console.log(testArr);
let finalResults = [];
for (const result of results) {
  if (result.length !== 0) {
    finalResults.push(result.sort(compareFn));
  }
}

finalResults = finalResults.flat();

//console.log(finalResults);

let score = 0;
let multiplier = finalResults.length;

for (const result of finalResults) {
  //  console.log(multiplier);
  score += result[1] * multiplier;
  multiplier--;
}

console.log(score);
