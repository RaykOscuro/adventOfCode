import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay1.txt", "utf-8");

console.log(typeof file.split("\n"));

const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const writtenDigits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

let sumOfCoords = 0;

for (let x of file.split("\n")) {
  console.log("new one!");
  let firstDigit = null;
  let secondDigit = null;
  console.log(x);
  for (let pos = 0; pos < 9; pos++) {
 //   while (x.indexOf(writtenDigits[pos]) > -1) {
        x=x.replace(writtenDigits[pos],(writtenDigits[pos][0]+digits[pos]+writtenDigits[pos].slice(-1)));
 //   }
  }
  console.log(x);
  for (let y = 0; y < x.length; y++) {
    if (digits.indexOf(x[y]) > -1) {
      console.log(`found ${x[y]}`);
      firstDigit = x[y];
      break;
    }
  }
  for (let z = x.length - 1; z > -1; z--) {
    if (digits.indexOf(x[z]) > -1) {
      console.log(`found ${x[z]}`);
      secondDigit = x[z];
      break;
    }
  }
  const coords = Number(firstDigit + secondDigit);
  console.log(coords);
  sumOfCoords += coords;
  console.log(`finalCoords: ${sumOfCoords}`);
}

let x="twonesixthreeight";
console.log(x);
for (let pos = 0; pos < 9; pos++) {
      x=x.replace(writtenDigits[pos],(writtenDigits[pos][0]+digits[pos]+writtenDigits[pos].slice(-1)));
  }
console.log(x);