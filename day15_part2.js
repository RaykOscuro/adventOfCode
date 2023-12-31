import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay15.txt", "utf-8");
const hashData = file.split(",");
const labelBoxes = [];
const focalBoxes = [];

function getHash(hashD) {
  let currentValue = 0;
  for (let x = 0; x < hashD.length; x++) {
    //  console.log(hashD.charCodeAt(x));
    currentValue += hashD.charCodeAt(x);
    currentValue *= 17;
    currentValue %= 256;
  }
  return currentValue;
}

for (let x = 0; x < 256; x++) {
  labelBoxes.push([]);
  focalBoxes.push([]);
}

//console.log(boxes);

for (let x of hashData) {
  const toHash = x.split("=");
  if (toHash.length === 2) {
    const hashed = getHash(toHash[0]);
    if (labelBoxes[hashed].includes(toHash[0])) {
      focalBoxes[hashed][labelBoxes[hashed].indexOf(toHash[0])] = toHash[1];
    } else {
      labelBoxes[hashed].unshift(toHash[0]);
      focalBoxes[hashed].unshift(toHash[1]);
    }
  }
  if (toHash.length === 1) {
    const label = toHash[0].slice(0, toHash[0].length - 1);
    const hashed = getHash(label);
    if (labelBoxes[hashed].includes(label)) {
      focalBoxes[hashed].splice(labelBoxes[hashed].indexOf(label), 1);
      labelBoxes[hashed].splice(labelBoxes[hashed].indexOf(label), 1);
    }
  }
  
}

//console.log(labelBoxes, focalBoxes);

let totalFocus = 0;

for (let x = 0; x < focalBoxes.length; x++) {
  let boxFocus = 0;
  let pos = 1;
  while (focalBoxes[x].length > 0) {
    boxFocus += (x + 1) * pos * focalBoxes[x].pop();
    pos++;
    console.log(x, boxFocus);
  }

  totalFocus += boxFocus;
}

console.log(totalFocus);
