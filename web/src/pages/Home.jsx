import React, { useContext, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import api from '../services/api';
import './home.css';
import Cell from './Cell';
import tictactoe from '../images/tic-tac-toe.png';

function Home() {
  const { board, setBoard, setCurrentPlayer, setGame, result, setResult } = useContext(GameContext);

  const newGame = () => {
    api.post('game')
      .then(response => {
        setGame(response.data)
        setCurrentPlayer(response.data.firstPlayer)
      })
      .catch((err) => {
        console.error('Error trying to reach api: ', err);
        alert(err);
      });
  };

  useEffect(() => {
    newGame();
  }, []);

  const resetGame = () => {
    newGame();
    setBoard(Array(9).fill(null));
    setResult({});
  }

  const positions = [
    [0, 2],
    [1, 2],
    [2, 2],
    [0, 1],
    [1, 1],
    [2, 1],
    [0, 0],
    [1, 0],
    [2, 0],
  ];

  return (
    <main>
      <img src={tictactoe} className="logo" alt="" />
      <h1 className="title">Tic Tac Toe Game</h1>

      <div className={`board ${result.winner ? "game-over" : ""}`}>
        {board.map((value, index) => {
          const [a, b] = positions[index];
          return <Cell key={index} value={value} x={a} y={b} index={index} />
        })}
      </div>

      {result.winner && result.winner !== 'Draw' &&
        <footer>
          <h2 className="winner-message">
            Player <span className={result.winner}>{result.winner}</span> won!!!
          </h2>
          <button onClick={resetGame}>Restart Game</button>
        </footer>
      }

      {result.winner === 'Draw' &&
        <footer>
          <h2 className="winner-message">Draw</h2>
          <button onClick={resetGame}>Restart Game</button>
        </footer>
      }

    </main>
  );
}

export default Home;