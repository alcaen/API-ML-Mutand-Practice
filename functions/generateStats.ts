import type { dnaType } from './isMutand';

type Mutand = {
  id: string;
  dna: dnaType;
  isMutand: boolean;
  createdAt: Date;
};

type stats = {
  count_mutant_dna: number;
  count_human_dna: number;
  ratio: number;
};

export const generateStats = (mutands: Mutand[]): stats => {
  const stats: stats = { count_human_dna: 0, count_mutant_dna: 0, ratio: 0 };
  mutands.forEach((dnaChain) => {
    dnaChain.isMutand ? stats.count_mutant_dna++ : stats.count_human_dna++;
  });
  stats.ratio = stats.count_mutant_dna / stats.count_human_dna;
  return stats;
};
