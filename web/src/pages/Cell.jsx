import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import api from '../services/api';

function Cell({ value, x, y, index }) {
  const {
    board,
    setBoard,
    result,
    setResult,
    currentPlayer,
    setCurrentPlayer,
    game,
  } = useContext(GameContext);

  const makeMomevement = (x, y) => {
    api.post(`/game/${game.id}/movement`, {
      player: currentPlayer,
      position: { x, y },
      id: game.id
    })
      .then(response => setResult(response.data))
      .catch((err) => {
        console.error('Error trying to reach api: ', err);
        setBoard(Array(9).fill(null));
        alert(err);
      });
  };

  const handleCellClick = () => {
    if (board[index]) return null;
    if (result.winner) return null;

    setBoard(
      board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item)
    );
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    makeMomevement(x, y);
  };

  return (
    <div className={`cell ${value}`} onClick={handleCellClick}>
      {value}
    </div>
  );
};

export default Cell;