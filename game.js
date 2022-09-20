// console.log(maps);
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame() {
  // game.fillRect(0, 50, 100, 100); // amarillo
  // game.clearRect(50, 50, 50, 50); // negro
  // game.clearRect();
  // game.clearRect(0,0,50,50);

  game.font = '25px Verdana';
  game.fillStyle = 'purple';
  game.textAlign = 'center';
  game.fillText('platzi', 25, 25)
}