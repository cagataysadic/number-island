import axios from 'axios';
import { Score } from '../types/interface';

export const fetchScores = async () => {
  try {
    const res = await axios.get('/api/scores');
    return res.data;
  } catch (error) {
    console.log("Skorlar çekilemedi");
    throw error;
  }
};

export const postScore = async (score: Score) => {
  try {
    const res = await axios.post('/api/scores', score);
    return res.data;
  } catch (error) {
    console.log("Skor kaydedilemedi");
    throw error;
  }
};
