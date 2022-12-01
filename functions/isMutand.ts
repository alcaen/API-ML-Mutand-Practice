// Import Lib
import { z } from 'zod';

// Schema
export const dnaSchema = z
  .string() //String
  .regex(new RegExp('([ATCG]{6})')) // String that contains (A,T,C,G) 6 times
  .length(6) //string length 6
  .array() // array of that kind of strings
  .length(6); // array of length 6

// Typesafe Ts
export type dnaType = z.infer<typeof dnaSchema>;

// Main Function
export const isMutant = (dna: dnaType): boolean => {
  // Transpose the rows with the cols
  const trasposeDna = (dna: dnaType) => {
    const transpose = dna[0]
      .split('')
      .map((_, colIndex) => dna.map((row) => row[colIndex]))
      .map((row) => row.join(''));
    return transpose;
  };
  // ReverseDna
  const reverseDna = (dna: dnaType) => {
    const reversed = dna.map((row) => row.split('').reverse().join(''));
    return reversed;
  };
  // Count if DNA sequence is mutand type in row
  const countXDna = (dna: dnaType) => {
    const count = dna
      .map((row) => (row.match('(A{4}|T{4}|C{4}|G{4})') !== null ? 1 : 0))
      .reduce(
        (accumulator: number, currentValue) => accumulator + currentValue,
        0
      );
    return count;
  };
  // Extract the diagonals (\) that have atleast 4 of length
  const diagonalDna = (dna: dnaType) => {
    const halfDiagonal = (dna: dnaType) => {
      const arr = [];
      const dnaArray = dna.map((row) => row.split(''));
      for (let indexRow = 0; indexRow < dnaArray.length; indexRow++) {
        for (
          let indexCol = 0;
          indexCol < dnaArray[indexRow].length;
          indexCol++
        ) {
          const element = dnaArray[indexRow][indexCol];
          if (!arr[indexCol]) {
            arr.push([element]);
          } else if (arr[indexCol - indexRow]) {
            arr[indexCol - indexRow].push(dnaArray[indexRow][indexCol]);
          }
        }
      }
      return arr
        .map((row) => row.join(''))
        .filter((dnaChain) => dnaChain.length >= 4);
    };
    const firstHalf = halfDiagonal(dna);
    const secondHalf = halfDiagonal(trasposeDna(dna)).splice(1); // Splice is cause the first row is repeated with the first half
    return firstHalf.concat(secondHalf); // Total Diagonals Both directions where the length is atleast 4
  };

  // Check if the dna is valid
  const validation = dnaSchema.safeParse(dna);
  if (validation.success) {
    const MutantDnaChains =
      countXDna(dna) + // Count Mutand DNA chains on Rows
      countXDna(trasposeDna(dna)) + // Count Mutand DNA chains on Columns
      countXDna(diagonalDna(dna)) + // Count Mutand DNA chains on Diagonals (\)
      countXDna(diagonalDna(reverseDna(dna))); // Count Mutand DNA chains on Diagonals (/)
    return MutantDnaChains > 1 && true;
  }
  return false;
};
