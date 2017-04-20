const UNEXPECTED_NUMBER = 3;

const UnexpectedAnimation = {
  initialize: () => {
    document.querySelector("#unexpected").addEventListener(
      "click", UnexpectedAnimation.execute);

    document.querySelector("#pause").addEventListener(
      "click", UnexpectedAnimation.pauseAll);

    document.querySelector("#resume").addEventListener(
      "click", UnexpectedAnimation.resumeAll);

    document.querySelector("#replay").addEventListener(
      "click", UnexpectedAnimation.replayAll);

    const mainEl = document.querySelector("main");
    for (let i = 0; i < UNEXPECTED_NUMBER + 1; i++) {
      const iframe = document.createElement("iframe");
      mainEl.appendChild(iframe);
    }
  },

  execute: () => {
    const url = document.querySelector("#url").value;
    const selector = document.querySelector("#selector").value;
    const iframes = document.querySelectorAll("main iframe");

    const enableUnexpected = {
      easing: document.querySelector("#easing").checked,
      duration: document.querySelector("#duration").checked,
      delay: document.querySelector("#delay").checked,
    };

    let loaded;
    if (UnexpectedAnimation.previousURL !== url) {
      UnexpectedAnimation.previousURL = url;
      loaded = new Promise((resolve, reject) => {
        const listener = () => {
          listener.counter = !listener.counter ? 1 : listener.counter + 1;
          if (iframes.length === listener.counter) {
            resolve();
          }
        }
        iframes.forEach(iframe => {
          iframe.src = url;
          iframe.addEventListener("load", listener);
        });
      });
    } else {
      loaded = Promise.resolve();
    }

    // wait to load the content
    loaded.then(() => {
      UnexpectedAnimation.pauseAll();
      for (let i = 1; i < iframes.length; i++) {
        const iframe = iframes[i];
        // save the original as index 0
        const isRandomAll = i === iframes.length - 1;
        if (selector === "") {
          UnexpectedAnimation.unexpectize(iframe.contentDocument,
                                          enableUnexpected, isRandomAll);
          continue;
        }

        const selectedEls = iframe.contentDocument.querySelectorAll(selector);
        if (selectedEls.length === 0) {
          UnexpectedAnimation.unexpectize(iframe.contentDocument,
                                          enableUnexpected, isRandomAll);
          continue;
        }

        selectedEls.forEach(selectedEl => {
          UnexpectedAnimation.unexpectize(selectedEl,
                                          enableUnexpected, isRandomAll);
        });
      }
      UnexpectedAnimation.replayAll();
    });
  },

  pauseAll: () => {
    const iframes = document.querySelectorAll("main iframe");
    iframes.forEach(iframe => {
      iframe.contentDocument.getAnimations().forEach(animation => {
        animation.pause();
      });
    });
  },

  resumeAll: () => {
    const iframes = document.querySelectorAll("main iframe");
    iframes.forEach(iframe => {
      iframe.contentDocument.getAnimations().forEach(animation => {
        animation.play();
      });
    });
  },

  replayAll: () => {
    const iframes = document.querySelectorAll("main iframe");
    iframes.forEach(iframe => {
      iframe.contentDocument.getAnimations().forEach(animation => {
        animation.currentTime = 0;
        animation.play();
      });
    });
  },

  unexpectize: (element, enableUnexpected, isAllRandom) => {
    const unexpectizer = {
      getEasing: easing => {
        if (!enableUnexpected.easing) {
          return easing;
        }
        if (isAllRandom) {
          return UnexpectedAnimation.getUnexpectedEasing();
        }
        if (!unexpectizer.easing) {
          unexpectizer.easing = UnexpectedAnimation.getUnexpectedEasing();
        }
        return unexpectizer.easing;
      },
      getDuration: duration => {
        if (!enableUnexpected.duration) {
          return duration;
        }
        if (isAllRandom) {
          return duration * 0.5 + duration * Math.random();
        }
        if (!unexpectizer.durationRatio) {
          unexpectizer.durationRatio = Math.random();
        }
        return duration * 0.5 + duration * unexpectizer.durationRatio;
      },
      getDelay: delay => {
        if (!enableUnexpected.delay) {
          return delay;
        }
        if (isAllRandom) {
          return delay * 0.5 + delay * Math.random();
        }
        if (!unexpectizer.delayRatio) {
          unexpectizer.delayRatio = Math.random();
        }
        return delay * 0.5 + delay * unexpectizer.delayRatio;
      }
    };

    element.getAnimations({ subtree: true }).forEach(animation => {
      const originalTiming = animation.effect.getComputedTiming();
      const timing = Object.assign({}, originalTiming, {
        duration: unexpectizer.getDuration(originalTiming.duration),
        delay: unexpectizer.getDelay(originalTiming.delay),
        easing: unexpectizer.getEasing(originalTiming.easing)
      });
      animation.effect = new KeyframeEffect(animation.effect.target,
                                            animation.effect.getKeyframes(),
                                            timing);
    });
  },

  getUnexpectedEasing: () => {
    return ["linear",
            "ease-in",
            "ease-out",
            "ease-in-out",
            "steps(5)",
            "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
            "cubic-bezier(0.23, 1, 0.32, 1)",
           ][Math.floor(Math.random() * 7)];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  UnexpectedAnimation.initialize();
});
