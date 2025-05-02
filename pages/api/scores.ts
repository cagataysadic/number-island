// pages/api/scores.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM scores ORDER BY accuracy DESC');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Veritabanı hatası:', error);
      res.status(500).json({ error: 'Skorlar alınamadı' });
    }
  } else if (req.method === 'POST') {
    const { username, total_guess, guess_right, accuracy, timer } = req.body;
    if (!username || typeof username !== 'string') {
      return res.status(400).json({ error: 'Geçersiz username' });
    }
    try {
      const result = await pool.query(
        'INSERT INTO scores (username, total_guess, guess_right, accuracy, timer, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
        [username.trim(), total_guess, guess_right, accuracy, timer]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Skor kaydedilemedi' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
