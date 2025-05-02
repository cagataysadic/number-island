import React from 'react';
import { Score } from '../types/interface';

interface ScoreBoardProps {
  scores: Score[];
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Geçmiş Skorlar</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {scores.map((score, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <strong>{score.username || "Bilinmeyen"}:</strong> 
            Toplam Tahmin: {score.total_guess}, 
            Doğru Tahmin: {score.guess_right}, 
            Başarı: %{score.accuracy},
            Timer: {score.timer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScoreBoard;
