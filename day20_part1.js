import { readFileSync } from "fs";

const file = readFileSync("./inputDataDay20.txt", "utf-8");
const pulseData = file.split("\r\n").map((node) => node.split(" -> "));
const nodeData = [];
const conjunctionData = [];

const nodeStack = [];
let lowPulses = 0;
let highPulses = 0;

const lostDestinations = new Set();

for (let node of pulseData) {
  for (let dest of node[1].split(", ")) {
    lostDestinations.add(dest);
  }
  if (node[0][0] === "b") {
    nodeData.push({
      name: node[0],
      destinations: node[1].split(", "),
      type: "b",
    });
  } else if (node[0][0] === "%") {
    nodeData.push({
      name: node[0].slice(1),
      destinations: node[1].split(", "),
      type: "%",
      state: false,
    });
  } else if (node[0][0] === "&") {
    nodeData.push({
      name: node[0].slice(1),
      destinations: node[1].split(", "),
      type: "&",
      state: [],
    });
    conjunctionData.push(node[0].slice(1));
  }
}

for (let node of nodeData) {
  lostDestinations.delete(node.name);
  for (let dest of node.destinations) {
    if (conjunctionData.includes(dest)) {
      nodeData
        .find((element) => element.name === dest)
        .state.push({ name: node.name, state: false });
    }
  }
}

function activateNode(nodeInfo) {
  const node = nodeData.find((element) => element.name === nodeInfo.name);
  if (node.type === "b") {
    lowPulses += node.destinations.length + 1;
    for (let dest of node.destinations) {
      if (!lostDestinations.has(dest)) {
        nodeStack.push({ name: dest, pulse: false, source: nodeInfo.name });
      }
    }
  }
  if (node.type === "%") {
    if (!nodeInfo.pulse) {
      node.state = !node.state;
      if (node.state) {
        highPulses += node.destinations.length;
      } else {
        lowPulses += node.destinations.length;
      }
      for (let dest of node.destinations) {
        if (!lostDestinations.has(dest)) {
          nodeStack.push({
            name: dest,
            pulse: node.state,
            source: nodeInfo.name,
          });
        }
      }
    }
  }
  if (node.type === "&") {
    node.state.find((element) => element.name === nodeInfo.source).state =
      nodeInfo.pulse;
    let allTrue = 0;
    for (let oneState of node.state) {
      if (oneState.state) {
        allTrue += 1;
      }
    }
    if (allTrue === node.state.length) {
      lowPulses += node.destinations.length;
    } else {
      highPulses += node.destinations.length;
    }
    for (let dest of node.destinations) {
      if (allTrue === node.state.length) {
        if (!lostDestinations.has(dest)) {
          nodeStack.push({ name: dest, pulse: false, source: nodeInfo.name });
        }
      } else {
        if (!lostDestinations.has(dest)) {
          nodeStack.push({ name: dest, pulse: true, source: nodeInfo.name });
        }
      }
    }
  }
}

// console.log(nodeData);

for (let x = 1; x <= 1000; x++) {
  // console.log(nodeStack);
  nodeStack.push({ name: "broadcaster", pulse: false, source: null });
  while (nodeStack.length > 0) {
    const nextNodeName = nodeStack.shift();
    activateNode(nextNodeName);
    // console.log(nodeStack, highPulses, lowPulses);
  }
}

// console.log(nodeData);
console.log(highPulses*lowPulses);
