import React from 'react';
import { GameStatsProps } from '../types/interface';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const GameStats: React.FC<GameStatsProps> = ({ handleSubmitScore, handleCooldownClick, buttonDisabled }) => {
  const totalGuess = useSelector((state: RootState) => state.game.totalGuess);
  const guessRight = useSelector((state: RootState) => state.game.guessRight);

  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-bold mb-6">Random Number Grid</h1>

      <div className="mb-5">
        <form onSubmit={handleSubmitScore}>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Skoru Kaydet
          </button>
        </form>
      </div>

      <button
        onClick={handleCooldownClick}
        disabled={buttonDisabled}
        className={`px-4 py-2 rounded transition ${
          buttonDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        Timer
      </button>

      <div className="mt-6 space-y-2">
        <h2 className="text-lg font-semibold">Total Guess: {totalGuess}</h2>
        <h2 className="text-lg font-semibold">
          Accuracy: %{guessRight > 0 ? ((guessRight / totalGuess) * 100).toFixed(2) : 0}
        </h2>
      </div>
    </div>
  );
}

export default GameStats;
