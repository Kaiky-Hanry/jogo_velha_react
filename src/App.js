import React from 'react';
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function hadleClick(i) {
    if (squares[i] || calculaWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculaWinner(squares);
  let resultado;

  if (winner) {
    resultado = "Ganhador é: " + winner;
  } else {
    resultado = "Vez do: " + (xIsNext ? "X" : "O");
  }

  return (
    <React.Fragment>
      <div className="resultado">{resultado}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => hadleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => hadleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => hadleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => hadleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => hadleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => hadleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => hadleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => hadleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => hadleClick(8)} />
      </div>
    </React.Fragment>

  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let descricao;
    if (move > 0) {
      descricao = 'Vá para jogada ' + move;
    } else {
      descricao = 'Jogar Novamente';
    }
    return (
      <li key={move}>
        <button class="btn btn-click" onClick={() => jumpTo(move)}>{descricao}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculaWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
