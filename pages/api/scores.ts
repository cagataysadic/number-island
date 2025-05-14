import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const allScores = await pool.query('SELECT * FROM scores ORDER BY accuracy DESC');
      res.json(allScores.rows);
    } catch (error) {
      console.error('Error fetching scores:', error);
      res.status(500).send('Server error');
    }
  } else if (req.method === 'POST') {
    const { username, total_guess, guess_right, accuracy, timer } = req.body;
    
      if (!username || typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({ error: 'Invalid Username' });
      }
    
      try {
        const result = await pool.query(
          'INSERT INTO scores (username, total_guess, guess_right, accuracy, timer, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
          [username.trim(), total_guess, guess_right, accuracy, timer]
        );
        res.status(201).json(result.rows[0]);
      } catch (error) {
        console.error('DB error:', error);
        res.status(500).send('Server error');
      }
  }
}
