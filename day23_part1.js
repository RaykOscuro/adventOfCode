import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay23.txt", "utf-8");
const mapData = file.split("\r\n").map((node) => node.split(""));
const pMapData = [];

for (let y of mapData) {
  const tempArray = [];
  for (let x of y) {
    tempArray.push({ type: x, visited: false });
  }
  pMapData.push(tempArray);
}

let start;
let finish;

for (let x = 0; x < pMapData[0].length; x++) {
  if (pMapData[0][x].type === ".") {
    start = x;
  }
}

for (let x = 0; x < pMapData[0].length; x++) {
  if (pMapData[pMapData.length - 1][x].type === ".") {
    finish = x;
  }
}

function getSurround(currentPos, currentMap) {
  const surround = [];
  if (currentMap[currentPos[0] - 1]) {
    if (
      currentMap[currentPos[0]][currentPos[1]].type === "^" &&
      !currentMap[currentPos[0] - 1][currentPos[1]].visited
    ) {
      surround.push([currentPos[0] - 1, currentPos[1]]);
      return surround;
    }
  }

  if (currentMap[currentPos[0] + 1]) {
    if (
      currentMap[currentPos[0]][currentPos[1]].type === "v" &&
      !currentMap[currentPos[0] + 1][currentPos[1]].visited
    ) {
      surround.push([currentPos[0] + 1, currentPos[1]]);
      return surround;
    }
  }

  if (currentMap[currentPos[0]][currentPos[1]] - 1) {
    if (
      currentMap[currentPos[0]][currentPos[1]].type === "<" &&
      !currentMap[currentPos[0]][currentPos[1] - 1].visited
    ) {
      surround.push([currentPos[0], currentPos[1] - 1]);
      return surround;
    }
  }

  if (currentMap[currentPos[0]][currentPos[1] + 1]) {
    if (
      currentMap[currentPos[0]][currentPos[1]].type === ">" &&
      !currentMap[currentPos[0]][currentPos[1] + 1].visited
    ) {
      surround.push([currentPos[0], currentPos[1] + 1]);
      return surround;
    }
  }

  if (currentMap[currentPos[0] - 1]) {
    if (!currentMap[currentPos[0] - 1][currentPos[1]].visited) {
      if (
        currentMap[currentPos[0] - 1][currentPos[1]].type !== "#" &&
        currentMap[currentPos[0] - 1][currentPos[1]].type !== "v"
      ) {
        surround.push([currentPos[0] - 1, currentPos[1]]);
      }
    }
  }

  if (currentMap[currentPos[0] + 1]) {
    if (!currentMap[currentPos[0] + 1][currentPos[1]].visited) {
      if (
        currentMap[currentPos[0] + 1][currentPos[1]].type !== "#" &&
        currentMap[currentPos[0] + 1][currentPos[1]].type !== "^"
      ) {
        surround.push([currentPos[0] + 1, currentPos[1]]);
      }
    }
  }

  if (currentMap[currentPos[0]][currentPos[1] - 1]) {
    if (!currentMap[currentPos[0]][currentPos[1] - 1].visited) {
      if (
        currentMap[currentPos[0]][currentPos[1] - 1].type !== "#" &&
        currentMap[currentPos[0]][currentPos[1] - 1].type !== ">"
      ) {
        surround.push([currentPos[0], currentPos[1] - 1]);
      }
    }
  }

  if (currentMap[currentPos[0]][currentPos[1] + 1]) {
    if (!currentMap[currentPos[0]][currentPos[1] + 1].visited) {
      if (
        currentMap[currentPos[0]][currentPos[1] + 1].type !== "#" &&
        currentMap[currentPos[0]][currentPos[1] + 1].type !== "<"
      ) {
        surround.push([currentPos[0], currentPos[1] + 1]);
      }
    }
  }
  return surround;
}

let longestRoute = 0;

function goFurther(currentPos, currentMap, steps) {
  //console.log(currentPos)
  if (
    JSON.stringify(currentPos) ===
      JSON.stringify([currentMap.length - 1, finish]) &&
    steps > longestRoute
  ) {
    longestRoute = steps;
    console.log(longestRoute);
  }
  currentMap[currentPos[0]][currentPos[1]].visited = true;
  const surround = getSurround(currentPos, currentMap);
  for (let location of surround) {
    goFurther(location, structuredClone(currentMap), steps + 1);
  }
}

goFurther([0, start], pMapData, 0);

console.log(longestRoute);
