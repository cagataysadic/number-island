import React from 'react';
import { GameStatsProps, Difficulty } from '../types/interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { resetGame, setGameDifficulty } from '@/redux/gameSlice';

const GameStats: React.FC<GameStatsProps> = ({ handleSubmitScore, handleCooldownClick, handleReplay }) => {
  const totalGuess = useSelector((state: RootState) => state.game.totalGuess);
  const guessRight = useSelector((state: RootState) => state.game.guessRight);
  const timerButtonDisabled = useSelector((state: RootState) => state.game.timerButtonDisabled);
  const difficultyButton = useSelector((state: RootState) => state.game.difficultyButton);
  const replayButtonDisabled = useSelector((state: RootState) => state.game.replayButtonDisabled);

  

  const dispatch = useDispatch();

  return (
    <div className="text-center p-6 flex flex-col items-center">
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

      <div className='mb-5 space-x-2'>
        <button
          onClick={handleCooldownClick}
          disabled={timerButtonDisabled}
          className={`px-4 py-2 rounded transition ${
            timerButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Timer
        </button>

        <button
          onClick={() => {handleReplay(), dispatch(resetGame());}}
          disabled={replayButtonDisabled}
          className={`px-4 py-2 rounded transition ${
            replayButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Replay
        </button>
      </div>

      <div className="space-x-2">
        <button
          onClick={() => dispatch(setGameDifficulty(Difficulty.Easy))}
          disabled={difficultyButton === Difficulty.Easy}
          className={`px-4 py-2 rounded transition ${
            difficultyButton === Difficulty.Easy
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Easy
        </button>
        <button
          onClick={() => dispatch(setGameDifficulty(Difficulty.Normal))}
          disabled={difficultyButton === Difficulty.Normal}
          className={`px-4 py-2 rounded transition ${
            difficultyButton === Difficulty.Normal
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Normal
        </button>
        <button
          onClick={() => dispatch(setGameDifficulty(Difficulty.Hard))}
          disabled={difficultyButton === Difficulty.Hard}
          className={`px-4 py-2 rounded transition ${
            difficultyButton === Difficulty.Hard
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Hard
        </button>
      </div>

      <div className="mt-5 space-y-2">
        <h2 className="text-lg font-semibold">Total Guess: {totalGuess}</h2>
        <h2 className="text-lg font-semibold">
          Accuracy: %{guessRight > 0 ? ((guessRight / totalGuess) * 100).toFixed(2) : 0}
        </h2>
      </div>
    </div>
  );
}

export default GameStats;
