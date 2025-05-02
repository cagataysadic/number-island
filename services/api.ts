// ✅ Yeni: services/api.ts (Next.js uyumlu)
import { Score } from '../types/interface';

export const fetchScores = async () => {
  const res = await fetch('/api/scores');
  if (!res.ok) throw new Error('Skorlar çekilemedi');
  return res.json();
};

export const postScore = async (score: Score) => {
  const res = await fetch('/api/scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(score),
  });
  if (!res.ok) throw new Error('Skor kaydedilemedi');
  return res.json();
};
