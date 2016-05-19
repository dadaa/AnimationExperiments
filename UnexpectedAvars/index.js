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
  container.addEventListener("click", function(e) {
    replay(e.target);
  });
  return container;
}

function createAnimation(container, trunkConfig, nodeConfig, leafConfig) {
  for (let i = 0; i < TRUNK_COUNT; i++) {
    const trunkElement = document.createElement("div");
    let bottom = i * TRUNK_HEIGHT / 2;
    let angle = i;
    let border = TRUNK_WIDTH / 2 - i;
    let endLeft = - bottom * angle * Math.PI / 180 * 0.5;
    let beginLeft = endLeft - border;
    let delay = trunkConfig.duration * i
                - trunkConfig.duration * i * trunkConfig.delayRatio;
    trunkElement.classList.add("node");
    trunkElement.style.bottom = `${bottom}px`;
    trunkElement.style.transform = `rotate(${angle}deg)`;
    trunkElement.style.transformOrigin = "50% 100%";

    trunkElement.animate(
      { borderBottomWidth: ["0px", `${TRUNK_HEIGHT}px`],
        borderLeftWidth: ["0px", `${border}px`],
        borderRightWidth: ["0px", `${border}px`],
        left: [`calc(20% - ${beginLeft}px)`, `calc(20% - ${endLeft}px)`] },
      { fill: "both", duration: trunkConfig.duration,
        delay: delay, easing: trunkConfig.easing }
    );
    container.appendChild(trunkElement);
  }

  for (let i = 0; i < NODE_COUNT; i++) {
    const nodeElement = document.createElement("div");
    let angle = 40 + i * 7;
    let bottom = i * NODE_HEIGHT / 2 + 100;
    let border = NODE_WIDTH / 2 - i;
    let endLeft = - bottom * angle * Math.PI / 180 + i * 8;
    let beginLeft = endLeft - border;
    let delay = nodeConfig.startDelay + nodeConfig.duration * i
                - nodeConfig.duration * i * nodeConfig.delayRatio;
    nodeElement.classList.add("node");
    nodeElement.style.bottom = `${bottom}px`;
    nodeElement.style.transform = `rotate(${angle}deg)`;
    nodeElement.style.transformOrigin = "0% 100%";
    nodeElement.animate(
      { borderBottomWidth: ["0px", `${NODE_HEIGHT}px`],
        borderLeftWidth: ["0px", `${border}px`],
        borderRightWidth: ["0px", `${border}px`],
        left: [`calc(0% - ${beginLeft}px)`, `calc(0% - ${endLeft}px)`] },
      { fill: "both", duration: nodeConfig.duration,
        delay: delay, easing: nodeConfig.easing }
    );
    container.appendChild(nodeElement);
  }

  for (let i = 0; i < LEAF_COUNT; i++) {
    const leafElement = document.createElement("div");
    let border = LEAF_WIDTH / 2;
    let delay = leafConfig.startDelay + leafConfig.duration * i
                - leafConfig.duration * i * leafConfig.delayRatio;
    let angle;
    let bottom;
    let endLeft;
    let beginLeft;
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
      { fill: "both", duration: leafConfig.duration,
        delay: delay, easing: leafConfig.easing }
    );
    container.appendChild(leafElement);
  }
}

function getRandomEasing() {
  return ["linear", "ease-in", "ease-out", "ease-in-out"][Math.floor(Math.random()*4)];
}

function createBaseAnimation() {
  const baseAnimationContainer = appendAnimationContainer();
  baseAnimationContainer.classList.add("base");
  const baseTrunkConfig = {
    duration: 1500,
    delayRatio: 0.5,
    easing: "linear"
  };
  const baseNodeConfig = {
    startDelay: 1000,
    duration: 1000,
    delayRatio: 0.3,
    easing: "linear"
  };
  const baseLeafConfig = {
    startDelay: 2000,
    duration: 1000,
    delayRatio: 0.8,
    easing: "linear"
  };
  createAnimation(baseAnimationContainer, baseTrunkConfig,
                  baseNodeConfig, baseLeafConfig);
}

function fork() {
  const previousAnimations = document.querySelectorAll(".forked");
  Array.prototype.forEach.call(previousAnimations, function(element) {
    element.parentNode.removeChild(element);
  });

  for (let i = 0; i < EXPERIMENT_COUNT; i++) {
    const container = appendAnimationContainer();
    container.classList.add("forked");

    const trunkConfig = {
      duration: 1500 * Math.random(),
      delayRatio: Math.random(),
      easing: getRandomEasing()
    };

    const nodeConfig = {
      startDelay: 1500 * Math.random(),
      duration: 1500 * Math.random(),
      delayRatio: Math.random(),
      easing: getRandomEasing()
    };

    const leafConfig = {
      startDelay: 1500 * Math.random(),
      duration: 1500 * Math.random(),
      delayRatio: Math.random(),
      easing: getRandomEasing()
    };

    createAnimation(container, trunkConfig, nodeConfig, leafConfig);
  }
}

function replay(target) {
  const animations = target.getAnimations({ subtree: true });
  animations.forEach(function(animation) {
    animation.currentTime = 0;
  });
}

function replayAll() {
  replay(document.querySelector("main"));
}

window.addEventListener("DOMContentLoaded", function() {
  createBaseAnimation();
  document.getElementById("fork-button").addEventListener("click", fork);
  document.getElementById("replay-all-button").addEventListener("click",
                                                                replayAll);
});
