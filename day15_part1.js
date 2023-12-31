import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay15.txt", "utf-8");
const hashData = file.split(",");

// console.log(hashData);

let finalValue = 0;
for (let hashD of hashData) {
  let currentValue = 0;
  for (let x = 0; x < hashD.length; x++) {
    //  console.log(hashD.charCodeAt(x));
    currentValue += hashD.charCodeAt(x);
    currentValue *= 17;
    currentValue %= 256;
  }
  finalValue += currentValue;
}

console.log(finalValue);
