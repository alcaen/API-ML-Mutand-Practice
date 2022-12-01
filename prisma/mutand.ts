import prisma from './prisma';
import type { dnaType } from './../functions/isMutand';
// Create New Mutand In DB
export const createMutand = async (dna: dnaType, isMutand: boolean) => {
  const user = await prisma.mutand.create({
    data: {
      dna,
      isMutand,
    },
  });
  return user;
};
// Read All Mutands
export const getAllMutands = async () => {
  const mutands = await prisma.mutand.findMany({});
  return mutands;
};
