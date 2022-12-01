import type { NextApiRequest, NextApiResponse } from 'next';
import type { dnaType } from '../../functions/isMutand';
import { dnaSchema, isMutant } from '../../functions/isMutand';
import { createMutand } from '../../prisma/mutand';

type Data = {
  status:
    | 'Is a Mutand'
    | 'Is not a Mutand'
    | 'Is not a Valid DNA'
    | 'Use Only Post Method';
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == 'POST') {
    if (req.body.dna && dnaSchema.safeParse(req.body.dna).success) {
      const dna: dnaType = req.body.dna;
      const checkMutand: boolean = isMutant(dna);
      const user = await createMutand(dna, checkMutand);
      if (checkMutand) {
        console.log('Is a Mutand');
        res.status(200).json({ status: 'Is a Mutand' });
      } else {
        console.log('Is not a Mutand');
        res.status(403).json({ status: 'Is not a Mutand' });
      }
    } else {
      console.log('Is not a Valid DNA');
      res.status(403).json({ status: 'Is not a Valid DNA' });
    }
  } else {
    console.log('Use Only Post Method');
    res.status(404).json({ status: 'Use Only Post Method' });
  }
}
