const game = {};

const createNewGame = (player) => {
  return {
    currentPlayer: player,
    round: 1,
    positions: {
      X: [],
      O: [],
    },
  };
};

const firstPlayer = () => (Math.random() >= 0.5 ? 'X' : 'O');

const isRepeatedPosition = (positions, position) => {
  const { x: newPositionX, y: newPositionY } = position;
  const isRepeatedPositionX = positions.X.some(({ x, y }) => x === newPositionX && y === newPositionY);
  const isRepeatedPositionO = positions.O.some(({ x, y }) => x === newPositionX && y === newPositionY);

  if (isRepeatedPositionX) return true;
  if (isRepeatedPositionO) return true;
};

const isWinner = (moves) => {
  const diagonalRightCheck = moves.filter(({ x, y }) => x === y);

  const diagonalLeftCheck = moves.filter(({ x, y }) => x === 2 - y);

  const columnsCheck = moves.reduce((acc, { x }) => {
    acc[x] = acc[x] + 1;
    return acc;
  }, [0, 0, 0]);

  const rowsCheck = moves.reduce((acc, { y }) => {
    acc[y] = acc[y] + 1;
    return acc;
  }, [0, 0, 0]);

  if (diagonalRightCheck.length === 3 || diagonalLeftCheck.length === 3) return true;

  if (columnsCheck.indexOf(3) >= 0 || rowsCheck.indexOf(3) >= 0) return true;

  return false;
};

const getWinner = (positionsPlayerX, positionsPlayerO) => {
  const playerX = isWinner(positionsPlayerX);
  const playerO = isWinner(positionsPlayerO);

  if (playerX) return 'X';
  if (playerO) return 'O';
};

module.exports = {
  firstPlayer,
  isRepeatedPosition,
  getWinner,
  game,
  createNewGame
};
