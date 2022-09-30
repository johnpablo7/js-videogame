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
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');

let canvasSize;
let tileSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;



const playerposition = {
  x: undefined,
  y: undefined,
};

const giftPosition = {
  x: undefined,
  y: undefined,
};

let enemyPositions = [];

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
  console.log({ canvasSize, tileSize });

  game.font = (tileSize) * 0.75 + 'px Verdana';
  game.textAlign = 'end';
  game.textBaseline = 'bottom';

  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
  }

  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
  // console.log({ map, mapRows, mapRowCols });

  showLives();

  enemyPositions = [];
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
      } else if (col == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == 'X') {
        enemyPositions.push({
          x: posX,
          y: posY,
        });
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
  const giftCollisionX = playerposition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY = playerposition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;

  if (giftCollision) {
    levelWin();
    // console.log('Subistes de nivel!');
  }

  const enemyCollision = enemyPositions.find(enemy => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerposition.x.toFixed(3);
    const enemyCollisionY = enemy.y.toFixed(3) == playerposition.y.toFixed(3);
    return enemyCollisionX && enemyCollisionY;
  });

  if (enemyCollision) {
    levelFail();
  }

  game.fillText(emojis['PLAYER'], playerposition.x, playerposition.y);
}

function levelWin() {
  console.log('Subistes de nivel');
  level++;
  startGame();
}

function levelFail() {
  console.log('Chocastes contra un enemigo :(');
  lives--;

  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }

  playerposition.x = undefined;
  playerposition.y = undefined;
  startGame();
}

function gameWin() {
  console.log('Terminastes el juego!');
  clearInterval(timeInterval);
}

function showLives() {
  const heartsArray = Array(lives).fill(emojis['HEART']) // [1,2,3]
  // console.log(heartsArray);

  spanLives.innerHTML = "";
  heartsArray.forEach(heart => spanLives.append(heart));
}

function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
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