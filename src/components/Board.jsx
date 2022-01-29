import React, { useState } from 'react';
import Square from './Square';

const Board = () => {
  const [state, setState] = useState([[], [], []]);
  const [playerX, setPlayerX] = useState(false);
  const [winner, setWinner] = useState('');
  const [moves, setMoves] = useState(0);
  const move = (row, col) => {
    const newState = state;
    if (!newState[row][col] && !winner) {
      if (playerX) {
        newState[row][col] = 'X';
      } else {
        newState[row][col] = 'O';
      }
      setState(newState);
      setPlayerX(!playerX);
      setMoves(moves + 1);
    }

    // check the winning state
    if (!winner) {
      [0, 1, 2].forEach(i => {
        if (
          (state[i][0] &&
            state[i][0] == state[i][1] &&
            state[i][0] == state[i][2]) ||
          (state[0][i] &&
            state[0][i] == state[1][i] &&
            state[0][i] == state[2][i])
        ) {
          setWinner(playerX ? 'X' : 'O');
        }
      });
      if (
        state[1][1] &&
        ((state[0][0] == state[1][1] && state[1][1] == state[2][2]) ||
          (state[1][1] == state[0][2] && state[1][1] == state[2][0]))
      ) {
        setWinner(playerX ? 'X' : 'O');
      }
    }
  };

  if (moves > 8 && !winner) {
    setWinner('D');
  }

  return (
    <div className="board">
      {winner && (
        <h1>
          {winner != 'D'
            ? 'Game Over! Winner is ' + winner
            : 'Game Ended in Draw!'}
        </h1>
      )}
      {winner && (
        <button
          onClick={() => {
            setState([[], [], []]);
            setPlayerX(false);
            setWinner('');
            setMoves(0);
          }}
        >
          Restart
        </button>
      )}
      {[0, 1, 2].map(row => {
        return (
          <div key={row} className="board__row">
            {[0, 1, 2].map(col => {
              return (
                <Square
                  handleClick={() => move(row, col)}
                  value={state[row][col]}
                  key={row * col + col}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
