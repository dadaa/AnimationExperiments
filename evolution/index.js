const EXPERIMENT_COUNT = 5;

const TRUNK_COUNT = 5;
const TRUNK_HEIGHT = 120;
const TRUNK_WIDTH = 14;
const NODE_COUNT = 5;
const NODE_HEIGHT = 70;
const NODE_WIDTH = 8;
const LEAF_COUNT = 5;
const LEAF_HEIGHT = 40;
const LEAF_WIDTH = 2;

function appendAnimationContainer() {
  const container = document.createElement("div");
  container.classList.add("container");
  document.querySelector("main").appendChild(container);
  return container;
}

window.addEventListener("DOMContentLoaded", function() {
  const baseAnimationContainer = appendAnimationContainer();
  baseAnimationContainer.classList.add("base");

  for (let i = 0; i < TRUNK_COUNT; i++) {
    const trunkElement = document.createElement("div");
    let bottom = i * TRUNK_HEIGHT / 2;
    let angle = i;
    let border = TRUNK_WIDTH / 2 - i;
    let endLeft = - bottom * angle * Math.PI / 180 * 0.5;
    let beginLeft = endLeft - border;
    let delay = 1500 * i - 1500 * i * 0.6;
    trunkElement.classList.add("node");
    trunkElement.style.bottom = `${bottom}px`;
    trunkElement.style.transform = `rotate(${angle}deg)`;
    trunkElement.style.transformOrigin = "50% 100%";

    trunkElement.animate(
      { borderBottomWidth: ["0px", `${TRUNK_HEIGHT}px`],
        borderLeftWidth: ["0px", `${border}px`],
        borderRightWidth: ["0px", `${border}px`],
        left: [`calc(20% - ${beginLeft}px)`, `calc(20% - ${endLeft}px)`] },
      { fill: "both", duration: 1500, delay: delay }
    );
    baseAnimationContainer.appendChild(trunkElement);
  }

  for (let i = 0; i < NODE_COUNT; i++) {
    const nodeElement = document.createElement("div");
    let angle = 40 + i * 7;
    let bottom = i * NODE_HEIGHT / 2 + 100;
    let border = NODE_WIDTH / 2 - i;
    let endLeft = - bottom * angle * Math.PI / 180 + i * 8;
    let beginLeft = endLeft - border;
    let delay = 3000 + 1000 * i - 1000 * i * 0.3;
    nodeElement.classList.add("node");
    nodeElement.style.bottom = `${bottom}px`;
    nodeElement.style.transform = `rotate(${angle}deg)`;
    nodeElement.style.transformOrigin = "0% 100%";
    nodeElement.animate(
      { borderBottomWidth: ["0px", `${NODE_HEIGHT}px`],
        borderLeftWidth: ["0px", `${border}px`],
        borderRightWidth: ["0px", `${border}px`],
        left: [`calc(0% - ${beginLeft}px)`, `calc(0% - ${endLeft}px)`] },
      { fill: "both", duration: 1000, delay: delay }
    );
    baseAnimationContainer.appendChild(nodeElement);
  }

  for (let i = 0; i < LEAF_COUNT; i++) {
    const leafElement = document.createElement("div");
    let border = LEAF_WIDTH / 2;
    let delay = 5000 + 1000 * i - 1000 * i * 0.8;

    let angle = 40 + i * 7;
    let bottom = i * NODE_HEIGHT / 2 + 100;
    let endLeft = - bottom * angle * Math.PI / 180 + i * 8;
    let beginLeft = endLeft - border;
    switch (i) {
    case 0:
      angle = 30;
      bottom = 190;
      endLeft = "calc(55%)";
      beginLeft = `calc(55% - ${border}px)`;
      break;
    case 1:
      angle = 90;
      bottom = 160;
      endLeft = "calc(52%)";
      beginLeft = `calc(52% - ${border}px)`;
      break;
    case 2:
      angle = 100;
      bottom = 160;
      endLeft = "calc(60%)";
      beginLeft = `calc(60% - ${border}px)`;
      break;
    case 3:
      angle = 40;
      bottom = 210;
      endLeft = "calc(65%)";
      beginLeft = `calc(65% - ${border}px)`;
      break;
    case 4:
      angle = 80;
      bottom = 200;
      endLeft = "calc(75%)";
      beginLeft = `calc(75% - ${border}px)`;
      break;
    }
    leafElement.classList.add("node");
    leafElement.style.bottom = `${bottom}px`;
    leafElement.style.transform = `rotate(${angle}deg)`;
    leafElement.style.transformOrigin = "0% 100%";
    leafElement.animate(
      { borderBottomWidth: ["0px", `${LEAF_HEIGHT}px`],
        borderLeftWidth: ["0px", `${border}px`],
        borderRightWidth: ["0px", `${border}px`],
        left: [endLeft, beginLeft] },
      { fill: "both", duration: 1000, delay: delay }
    );
    baseAnimationContainer.appendChild(leafElement);
  }
});
