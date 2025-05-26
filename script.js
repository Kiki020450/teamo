const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);
let drops = new Array(columns).fill(1);

let extraMessages = [];

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#FF00FF";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    ctx.fillText("TE AMO", i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  extraMessages.forEach((msg, index) => {
    ctx.fillText("TE AMO", msg.x, msg.y);
    msg.life--;
    msg.y -= 2; // Suben hacia arriba
    if (msg.life <= 0) {
      extraMessages.splice(index, 1);
    }
  });
}

setInterval(draw, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drops = new Array(Math.floor(canvas.width / fontSize)).fill(1);
});

function addColumnsAt(x, y) {
  const col = Math.floor(x / fontSize);
  for (let i = -1; i <= 1; i++) {
    if (col + i >= 0 && col + i < drops.length) {
      drops[col + i] = 0;
    }
  }

  for (let i = 0; i < 5; i++) {
    extraMessages.push({
      x: x + Math.random() * 100 - 50,
      y: y + Math.random() * 50 - 25,
      life: 50 // duración del mensaje
    });
  }
}

canvas.addEventListener("click", (e) => {
  addColumnsAt(e.clientX, e.clientY);
});

canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  addColumnsAt(touch.clientX, touch.clientY);
});
