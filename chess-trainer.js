let board = null;
let game = null;
let currentPosition = 0;
let correctMoves = 0;
let incorrectMoves = 0;
let trainingPositions = [];

function onDragStart(source, piece, position, orientation) {
  if (game.game_over()) return false;
  if (piece.search(/^b/) !== -1) return false;
}

function onDrop(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';

  if (move.from + move.to === trainingPositions[currentPosition].correctMove) {
    document.getElementById('message').textContent = 'Correct! Good job.';
    correctMoves++;
    document.getElementById('correct').textContent = correctMoves;
    setTimeout(nextPosition, 1500);
  } else {
    document.getElementById('message').textContent = 'Incorrect. Try again.';
    incorrectMoves++;
    document.getElementById('incorrect').textContent = incorrectMoves;
    game.undo();
    return 'snapback';
  }
}

function nextPosition() {
  currentPosition++;
  if (currentPosition >= trainingPositions.length) {
    document.getElementById('message').textContent = 'Training complete!';
    document.getElementById('startTraining').style.display = 'inline';
    return;
  }
  loadPosition(currentPosition);
}

function loadPosition(index) {
  const position = trainingPositions[index];
  game.load(position.fen);
  board.position(position.fen);
  document.getElementById('message').textContent = 'Make the best move for White.';
}

async function fetchPuzzles() {
  const response = await fetch('/api/puzzles');
  trainingPositions = await response.json();
  startTraining();
}

function startTraining() {
  currentPosition = 0;
  correctMoves = 0;
  incorrectMoves = 0;
  document.getElementById('correct').textContent = '0';
  document.getElementById('incorrect').textContent = '0';
  document.getElementById('startTraining').style.display = 'none';
  loadPosition(currentPosition);
}

document.addEventListener('DOMContentLoaded', function() {
  game = new Chess();
  const config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: () => board.position(game.fen())
  };
  board = Chessboard('board', config);
  document.getElementById('startTraining').addEventListener('click', fetchPuzzles);
});
