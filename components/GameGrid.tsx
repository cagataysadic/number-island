import React from 'react';
import { GameGridProps } from '../types/interface';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const GameGrid: React.FC<GameGridProps> = ({ numbers, handleClick, handleAllLocalMaxClick, handleReset }) => {
  const guesses = useSelector((state: RootState) => state.game.guesses);
  const getTileColor = (index: number): string => {
    if (guesses[index] === 'right') return 'green';
    if (guesses[index] === 'wrong') return 'red';
    return '#f0f0f0';
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 50px)",
          gap: "10px",
          justifyContent: "center",
          marginTop: "20px"
        }}
      >
        {numbers.map((num, index) => (
          <div
            key={index}
            onClick={() => handleClick(num, index)}
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: getTileColor(index),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontWeight: "bold"
            }}
          >
            {num}
          </div>
        ))}
      </div>
      <button onClick={handleAllLocalMaxClick}>All Local Max</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default GameGrid;
