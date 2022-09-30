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
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let tileSize;

const playerposition = {
  x: undefined,
  y: undefined,
}

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
  game.font = (tileSize) * 0.75 + 'px Verdana';
  game.textAlign = 'end';
  game.textBaseline = 'bottom';

  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
  console.log({ map, mapRows, mapRowCols });

  game.clearRect(0, 0, canvasSize, canvasSize);
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = tileSize * (colI + 1);
      const posY = tileSize * (rowI + 1);

      if (col == 'O') {
        if (!playerposition.x && !playerposition.y) {
          playerposition.x = posX;
          playerposition.y = posY;
          console.log({ playerposition });
        }
      }

      game.fillText(emoji, posX, posY);
      // console.log({ row, rowI, col, colI });
    });
  });
  movePlayer();
  // for (let row = 0; row < 10; row++) {
  //   for (let col = 0; col < 10; col++) {
  //     game.fillText(
  //       emojis[mapRowCols[row][col]],
  //       tileSize * (col + 0.5),
  //       tileSize * (row + 0.5)
  //     );
  //   }
  // }
}

function movePlayer() {
  game.fillText(emojis['PLAYER'], playerposition.x, playerposition.y);
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
  if (event.key == 'KeyW') moveUp();
  else if (event.key == 'KeyA') moveLeft();
  else if (event.key == 'KeyD') moveRight();
  else if (event.key == 'KeyS') moveDown();
  // console.log(event);
}

function moveUp() {
  console.log('Me quiero mover hacia Arriba');

  if ((playerposition.y - tileSize) < tileSize) {
    console.log('OUT');
  } else {
    playerposition.y -= tileSize;
    startGame();
  }

}

function moveLeft() {
  console.log('Me quiero mover hacia izquierda');

  if ((playerposition.x - tileSize) < tileSize) {
    console.log('OUT');
  } else {
    playerposition.x -= tileSize;
    startGame();
  }
}

function moveRight() {
  console.log('Me quiero mover hacia derecha');

  if ((playerposition.x + tileSize) > canvasSize) {
    console.log('OUT');
  } else {
    playerposition.x += tileSize;
    startGame();
  }
}

function moveDown() {
  console.log('Me quiero mover hacia abajo');

  if ((playerposition.y + tileSize) > canvasSize) {
    console.log('OUT');
  } else {
    playerposition.y += tileSize;
    startGame();
  }
}