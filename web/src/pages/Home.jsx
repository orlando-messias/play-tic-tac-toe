import React from 'react';
import { useState, useEffect } from 'react';
import api from '../services/api';
import './home.css';
import Cell from './Cell';
import tictactoe from '../images/tic-tac-toe.png';

function Home() {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [game, setGame] = useState({});
  const [result, setResult] = useState({});

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

  const makeMomevement = (x, y) => {
    api.post(`/game/${game.id}/movement`, {
      player: currentPlayer,
      position: { x, y },
      id: game.id
    })
    .then(response => setResult(response.data))
    .catch((err) => {
      console.error('Error trying to reach api: ', err);
      setBoard(emptyBoard);
      alert(err);
    });
  };

  const handleCellClick = (x, y, index) => {
    if (board[index] !== '') return null;
    if (result.winner) return null;

    setBoard(
      board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item)
    );

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

    makeMomevement(x, y);
  }

  const resetGame = () => {
    newGame();
    setBoard(emptyBoard);
    setResult({});
  }

  return (
    <main>
      <img src={tictactoe} className="logo" alt=""/>
      <h1 className="title">Tic Tac Toe Game</h1>
      <div className={`board ${result.winner ? "game-over" : ""}`}>
        <Cell cell={`cell ${board[0]}`} onClick={() => handleCellClick(0, 2, 0)}>
          {board[0]}
        </Cell>
        <Cell cell={`cell ${board[1]}`} onClick={() => handleCellClick(1, 2, 1)}>
          {board[1]}
        </Cell>
        <Cell cell={`cell ${board[2]}`} onClick={() => handleCellClick(2, 2, 2)}>
          {board[2]}
        </Cell>
        <Cell cell={`cell ${board[3]}`} onClick={() => handleCellClick(0, 1, 3)}>
          {board[3]}
        </Cell>
        <Cell cell={`cell ${board[4]}`} onClick={() => handleCellClick(1, 1, 4)}>
          {board[4]}
        </Cell>
        <Cell cell={`cell ${board[5]}`} onClick={() => handleCellClick(2, 1, 5)}>
          {board[5]}
        </Cell>
        <Cell cell={`cell ${board[6]}`} onClick={() => handleCellClick(0, 0, 6)}>
          {board[6]}
        </Cell>
        <Cell cell={`cell ${board[7]}`} onClick={() => handleCellClick(1, 0, 7)}>
          {board[7]}
        </Cell>
        <Cell cell={`cell ${board[8]}`} onClick={() => handleCellClick(2, 0, 8)}>
          {board[8]}
        </Cell>
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