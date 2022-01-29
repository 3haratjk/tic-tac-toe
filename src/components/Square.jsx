import React from 'react';

const Square = ({ value, handleClick }) => {
  return (
    <button onClick={handleClick} className="board__square">
      {value}
    </button>
  );
};

export default Square;
