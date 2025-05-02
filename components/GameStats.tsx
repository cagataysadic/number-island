import React from 'react';
import { GameStatsProps } from '../types/interface';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const GameStats: React.FC<GameStatsProps> = ({ handleSubmitScore, handleCooldownClick }) => {
  const totalGuess = useSelector((state: RootState) => state.game.totalGuess);
  const guessRight = useSelector((state: RootState) => state.game.guessRight);

  return (
    <div>
      <h1>Random Number Grid</h1>
      <div style={{ marginBottom: "20px" }}>
        <form onSubmit={handleSubmitScore}>
          <button type="submit">Skoru Kaydet</button>
        </form>
      </div>
      <button onClick={handleCooldownClick}>Timer</button>
      <h2>Total Guess: {totalGuess}</h2>
      <h2>Accuracy: %{guessRight > 0 ? ((guessRight / totalGuess) * 100).toFixed(2) : 0}</h2>
    </div>
  );
}

export default GameStats;
