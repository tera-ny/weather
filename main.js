// @ts-nocheck
const limit = 200;
const baseSpeed = 400;
var current = 0;
const max = 4;
const maxHeight = 100;
var drops = [];
var prev = 0;

const canvas = document.querySelector("canvas");

const configureCanvasSize = () => {
  canvas.setAttribute("width", `${innerWidth}px`);
  canvas.setAttribute("height", `${innerHeight}px`);
  window.addEventListener("resize", () => {
    canvas.setAttribute("width", `${innerWidth}px`);
    canvas.setAttribute("height", `${innerHeight}px`);
  });
};
const init = () => {
  if (!canvas) return;
  configureCanvasSize();
  requestAnimationFrame(draw);
};

class Drop {
  constructor(left, timestamp, magnification) {
    this.left = left;
    this.timestamp = timestamp;
    this.magnification = magnification;
  }
  get height() {
    return this.magnification * maxHeight;
  }
  get speed() {
    const range = 500;
    return this.magnification * range + baseSpeed;
  }
}

const draw = (timestamp) => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  if (timestamp % 100 !== prev && current < limit) {
    const raindrops = Math.min((Math.random() * 100) % max, limit - current);
    for (let i = 0; i <= raindrops; i++) {
      drops.push(
        new Drop(
          innerWidth * Math.random(),
          timestamp,
          Math.max(0.001, Math.random())
        )
      );
    }
  }
  prev = timestamp % 100;
  ctx.strokeStyle = "rgba(255,255,255,1)";
  ctx.fillStyle = "rgba(255,255,255,1)";
  drops.forEach((drop) => {
    const top =
      ((innerHeight + drop.height) / drop.speed) *
        (timestamp - drop.timestamp) -
      drop.height;
    ctx.fillRect(drop.left, top, 1, drop.height);
  });
  drops = drops.filter((drop) => timestamp - drop.timestamp < drop.speed);
  current = drops.length;
  requestAnimationFrame(draw);
};

init();
