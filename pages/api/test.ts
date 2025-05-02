import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json({
    password: process.env.DB_PASSWORD,
    type: typeof process.env.DB_PASSWORD,
  });
}
