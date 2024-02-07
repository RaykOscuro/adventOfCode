import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay22.txt", "utf-8");
const brickData = file.split("\r\n").map((node) => node.split("~"));

function sortBricks(a, b) {
  const brickAZ = Math.floor(
    a[0].split(",").slice(-1),
    a[1].split(",").slice(-1)
  );
  const brickBZ = Math.floor(
    b[0].split(",").slice(-1),
    b[1].split(",").slice(-1)
  );
  return brickAZ - brickBZ;
}

function getSpace(brick) {
  const brickSpace = [];
  for (let x = brick[0].X; x <= brick[1].X; x++) {
    for (let y = brick[0].Y; y <= brick[1].Y; y++) {
      brickSpace.push({ X: x, Y: y });
    }
  }
  return brickSpace;
}

brickData.sort(sortBricks);

const fallenBricks = [];
const blockedArea = [];

function fall(brick) {
  let z = blockedArea.length + 1;
  const brickSpace = [];
  const brickHeight =
    Number(brick[1].split(",").slice(-1)[0]) -
    Number(brick[0].split(",").slice(-1)[0]);
  // console.log(brickHeight);
  for (
    let x = Number(brick[0].split(",").slice(0, 1)[0]);
    x <= Number(brick[1].split(",").slice(0, 1)[0]);
    x++
  ) {
    for (
      let y = Number(brick[0].split(",").slice(1, 2)[0]);
      y <= Number(brick[1].split(",").slice(1, 2)[0]);
      y++
    ) {
      brickSpace.push({ X: x, Y: y });
    }
  }

  // console.log(blockedArea);

  let newLayer = brickHeight + 1;

  for (let layer = blockedArea.length - 1; layer >= 0; layer--) {
    let done = false;
    for (let oldBrick of blockedArea[layer]) {
      if (overlap(brickSpace, oldBrick)) {
        done = true;
        // console.log(brickSpace, oldBrick, "overlap!");
        break;
      }
      if (done) {
        break;
      }
    }
    if (done) {
      break;
    } else {
      z--;
      newLayer--;
    }
  }
  while (newLayer > 0) {
    blockedArea.push([]);
    newLayer--;
  }
  // console.log("Z: ", z, " Blocked Area: ", blockedArea);
  for (let x = 0; x <= brickHeight; x++) {
    // console.log(x);
    blockedArea[Math.ceil(z - 1 + x, 0)].push(brickSpace);
  }
  fallenBricks.push([
    {
      X: Number(brick[0].split(",").slice(0, 1)[0]),
      Y: Number(brick[0].split(",").slice(1, 2)[0]),
      Z: z,
    },
    {
      X: Number(brick[1].split(",").slice(0, 1)[0]),
      Y: Number(brick[1].split(",").slice(1, 2)[0]),
      Z: z + brickHeight,
    },
  ]);
}

for (let brick of brickData) {
  fall(brick);
}

function overlap(brickA, brickB) {
  const testSet = new Set();
  brickA.forEach((x) => testSet.add(JSON.stringify(x)));
  brickB.forEach((x) => testSet.add(JSON.stringify(x)));

  return testSet.size !== brickA.length + brickB.length;
}

console.log(fallenBricks);
for (let x of blockedArea) {
  console.log(x);
}

let disintegratable = 0;

for (let ind = 0; ind < fallenBricks.length; ind++) {
  const currentBrick = fallenBricks[ind];
  const siblingBricks = fallenBricks.filter(
    (brick) =>
      brick[0].Z === currentBrick[0].Z &&
      (brick[0], brick[1]) !== (currentBrick[0], currentBrick[1])
  );
  let compareBricks = fallenBricks.filter(
    (brick) => brick[0].Z === currentBrick[0].Z + 1
  );
  compareBricks = compareBricks.filter((brick) =>
    overlap(getSpace(brick), getSpace(currentBrick))
  );
  for (let siblingBrick of siblingBricks) {
    compareBricks = compareBricks.filter(
      (brick) => !overlap(getSpace(brick), getSpace(siblingBrick))
    );
  }
  if (compareBricks.length === 0) {
    disintegratable++;
    console.log("found! ", currentBrick);
  }
}

console.log(disintegratable);
