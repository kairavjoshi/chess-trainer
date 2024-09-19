let board = null;
let game = new Chess();
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
    $('#message').text('Correct! Good job.');
    correctMoves++;
    $('#correct').text(correctMoves);
    setTimeout(nextPosition, 1500);
  } else {
    $('#message').text('Incorrect. Try again.');
    incorrectMoves++;
    $('#incorrect').text(incorrectMoves);
    game.undo();
    return 'snapback';
  }
}

function nextPosition() {
  currentPosition++;
  if (currentPosition >= trainingPositions.length) {
    $('#message').text('Training complete!');
    $('#startTraining').show();
    return;
  }
  loadPosition(currentPosition);
}

function loadPosition(index) {
  const position = trainingPositions[index];
  game.load(position.fen);
  board.position(position.fen);
  $('#message').text('Make the best move for White.');
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
  $('#correct').text(0);
  $('#incorrect').text(0);
  $('#startTraining').hide();
  loadPosition(currentPosition);
}

$(function() {
  const config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: () => board.position(game.fen())
  };
  board = Chessboard('board', config);
  $('#startTraining').on('click', fetchPuzzles);
});
