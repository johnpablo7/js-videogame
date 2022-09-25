// window.innerWidth
// window.innerHeight

// game.fillRect(0, 0, 100, 100); // negro
// game.clearRect(50, 50, 50, 50); // negro
// game.clearRect();
// game.clearRect(0,0,50,50);

// game.font = '25px Verdana';
// game.fillStyle = 'purple';
// game.textAlign = 'center';
// game.fillText('platzi', 25, 25)

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvasSize = Math.floor(canvasSize);
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  tileSize = canvasSize / 10;

  startGame();
}

function startGame() {
  // console.log({ canvasSize, tileSize });
  game.font = (tileSize) * 0.75 + 'px Verdana';
  game.textAlign = 'center';
  game.textBaseline = 'middle';

  const map = maps[1];
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      game.fillText(
        emojis[mapRowCols[row][col]],
        tileSize * (col + 0.5),
        tileSize * (row + 0.5)
      );
    }
  }
}