import { useCallback } from 'react';

function useLocalMax() {
  const rowSize = 6;

  const localMax = useCallback((num: number, index: number, nums: number[], gameDifficulty: string) => {
    if (gameDifficulty === 'easy') {
      const west = index % rowSize !== 0 ? nums[index - 1] : -1;
      const east = (index + 1) % rowSize !== 0 ? nums[index + 1] : -1;

      const neighbors = [west, east].filter(n => n !== -1);

      return neighbors.every(n => num > n);
    } else if (gameDifficulty === 'normal') {
      const north = index - rowSize >= 0 ? nums[index - rowSize] : -1;
      const south = index + rowSize < 36 ? nums[index + rowSize] : -1;
      const west = index % rowSize !== 0 ? nums[index - 1] : -1;
      const east = (index + 1) % rowSize !== 0 ? nums[index + 1] : -1;

      const neighbors = [north, south, west, east].filter(n => n !== -1);

      return neighbors.every(n => num > n);
    } else if (gameDifficulty === 'hard') {
      const northwest = index - rowSize + 1 >= 0 ? nums[index - rowSize + 1] : -1;
      const north = index - rowSize >= 0 ? nums[index - rowSize] : -1;
      const northeast = index - rowSize - 1 >= 0 ? nums[index - rowSize - 1] : -1;
      const southwest = index + rowSize - 1 < 36 ? nums[index + rowSize - 1] : -1;
      const south = index + rowSize < 36 ? nums[index + rowSize] : -1;
      const southeast = index + rowSize + 1 < 36 ? nums[index + rowSize + 1] : -1;
      const west = index % rowSize !== 0 ? nums[index - 1] : -1;
      const east = (index + 1) % rowSize !== 0 ? nums[index + 1] : -1;

      const neighbors = [northwest, north, northeast, southwest, south, southeast, west, east].filter(n => n !== -1);

      return neighbors.every(n => num > n);
    }
  }, [rowSize]);

  return { localMax };
}

export default useLocalMax;
