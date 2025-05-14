import React from 'react';
import { GameGridProps } from '../types/interface';

const GameGrid: React.FC<GameGridProps> = ({ numbers, guesses, handleClick, handleAllLocalMaxClick, handleReset }) => {
  const getTileColor = (index: number): string => {
    if (guesses[index] === 'right') return 'green';
    if (guesses[index] === 'wrong') return 'red';
    return '#f0f0f0';
  };

  return (
    <div>
      <div className="grid grid-cols-6 gap-2 mt-5 justify-center">
        {numbers.map((num, index) => (
          <div
            key={index}
            onClick={() => handleClick(num, index)}
            className={`w-[50px] h-[50px] flex items-center justify-center cursor-pointer border border-gray-300 rounded-lg font-bold`}
            style={{ backgroundColor: getTileColor(index) }}
          >
            {num}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleAllLocalMaxClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          All Local Max
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default GameGrid;
