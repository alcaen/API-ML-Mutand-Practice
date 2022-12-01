import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllMutands } from '../../prisma/mutand';
import { generateStats } from './../../functions/generateStats';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    const mutands = await getAllMutands();
    const stats = generateStats(mutands);
    res.status(200).json(stats);
  } else {
    res.status(404).json({ status: 'Use Get Method' });
  }
}
