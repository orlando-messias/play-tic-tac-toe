import React, { createContext, useState } from 'react';

export const GameContext = createContext();

function GameContextProvider({ children }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [game, setGame] = useState({});
  const [result, setResult] = useState({});

  const state = {
    board,
    setBoard,
    currentPlayer,
    setCurrentPlayer,
    game,
    setGame,
    result,
    setResult,
  };

  return (
    <GameContext.Provider value={state}>
      {children}
    </GameContext.Provider>
  )
}

export default GameContextProvider;
