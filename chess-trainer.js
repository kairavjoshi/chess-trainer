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
