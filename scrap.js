const canvas = document.getElementById('shindovs');
const clearButton = document.getElementById('clear');
const undoButton = document.getElementById('undo');
const ctx = canvas.getContext('2d');
const image = new Image();

image.src="err.png";
let halfImageWidth, halfImageHeight;

const snapshotsArray = [];

image.onload = function() {
  halfImageWidth = image.width / 2;
  halfImageHeight = image.height / 2;
};
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let isMouseDown = false;

undoButton.addEventListener("click", () => {
  event.stopPropagation();
  undo();
});

clearButton.addEventListener("click", () => {
  event.stopPropagation();
  clear();
});

canvas.addEventListener("mousedown", () => {
  isMouseDown = true;
});

canvas.addEventListener("mouseup", () => {
  pushToSnapshots();
  isMouseDown = false;
});

canvas.addEventListener('mousemove', event => {
  if (isMouseDown)
    ctx.drawImage(image, event.clientX - halfImageWidth, event.clientY  - halfImageHeight);
});

function clear () {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function pushToSnapshots () {
  let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  snapshotsArray.push(imageData);
}

function removeLastSnapshot () {
  snapshotsArray.splice(snapshotsArray.length - 1, 1);
}

function undo() {
  if (snapshotsArray.length === 0)
    return;
  if (snapshotsArray.length === 1) {
    removeLastSnapshot();
    clear();
  } else {
    removeLastSnapshot();
    const imageDataToRestore = snapshotsArray[snapshotsArray.length - 1];
    ctx.putImageData(imageDataToRestore, 0, 0);
  }
}