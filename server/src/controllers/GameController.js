const { v4: generateId } = require('uuid');
const {
  game,
  createNewGame,
  firstPlayer,
  isRepeatedPosition,
  getWinner
} = require('../services/game');

const newGame = (_req, res) => {
  const id = generateId();
  const currentPlayer = firstPlayer();
  game[id] = createNewGame(currentPlayer);
  return res.status(200).json({
    id,
    firstPlayer: currentPlayer
  });
};

const newMovement = (req, res) => {
  // const { id } = req.params;
  const { player, position, id } = req.body;

  if (!game[id]) {
    return res.status(400).json({
      msg: 'Partida não encontrada'
    });
  }

  let {
    currentPlayer,
    round,
    positions,
    gameOver = false
  } = game[id];

  if (gameOver) {
    return res.status(400).json({
      msg: 'Partida finalizada',
      winner: game[id].winner
    });
  }

  if (player != currentPlayer) {
    return res.status(400).json({
      msg: 'Não é turno do jogador'
    });
  }

  const { x, y } = position;
  if (x > 2 || y > 2 || x < 0 || y < 0) {
    return res.status(400).json({
      msg: 'Posição inválida. Tente novamente'
    });
  }

  const repeatedPosition = isRepeatedPosition(positions, position);

  if (round != 1 && repeatedPosition) {
    return res.status(400).json({
      msg: 'Jogada já realizada. Tente novamente'
    });
  }

  positions[player] = [...positions[player], position];

  if (round > 4) {
    const isThereAWinner = getWinner(positions.X, positions.O);

    if (isThereAWinner || round === 9) {
      game[id] = {
        ...game[id],
        gameOver: true,
        winner: isThereAWinner ? isThereAWinner : 'Draw'
      };

      return res.status(200).json({
        msg: 'Partida Finalizada',
        winner: game[id].winner
      });
    }
  }

  const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
  game[id] = {
    ...game[id],
    round: round + 1,
    currentPlayer: nextPlayer
  };

  return res.status(200).json({
    msg: 'Jogada realizada com sucesso',
    nextPlayer
  });
};

module.exports = {
  newGame,
  newMovement
};
