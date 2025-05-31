import { useCallback, useEffect, useRef } from 'react';
import { Difficulty } from '@/types/interface';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

function useLocalMax() {
  const rowSize = 6;
  const gameDifficulty = useSelector((state: RootState) => state.game.difficulty);

  const gameDifficultyRef = useRef(gameDifficulty);
  
  useEffect(() => {
    gameDifficultyRef.current = gameDifficulty;
  }, [gameDifficulty]);

  const localMax = useCallback((num: number, index: number, nums: number[]) => {
    if (gameDifficultyRef.current === Difficulty.Easy) {
      const west = index % rowSize !== 0 ? nums[index - 1] : -1;
      const east = (index + 1) % rowSize !== 0 ? nums[index + 1] : -1;

      const neighbors = [west, east].filter(n => n !== -1);

      return neighbors.every(n => num > n);
    } else if (gameDifficultyRef.current === Difficulty.Normal) {
      const north = index - rowSize >= 0 ? nums[index - rowSize] : -1;
      const south = index + rowSize < 36 ? nums[index + rowSize] : -1;
      const west = index % rowSize !== 0 ? nums[index - 1] : -1;
      const east = (index + 1) % rowSize !== 0 ? nums[index + 1] : -1;

      const neighbors = [north, south, west, east].filter(n => n !== -1);

      return neighbors.every(n => num > n);
    } else if (gameDifficultyRef.current === Difficulty.Hard) {
      const north = index - rowSize >= 0 ? nums[index - rowSize] : -1;
      const west = index % rowSize !== 0 ? nums[index - 1] : -1;
      const south = index + rowSize < 36 ? nums[index + rowSize] : -1;
      const east = (index + 1) % rowSize !== 0 ? nums[index + 1] : -1;
      const northwest = index - rowSize >= 0 && index % rowSize !== 0 ? nums[index - rowSize - 1] : -1;
      const northeast = index - rowSize >= 0 && (index + 1) % rowSize !== 0 ? nums[index - rowSize + 1] : -1;
      const southwest = index + rowSize < 36 && index % rowSize !== 0 ? nums[index + rowSize - 1] : -1;
      const southeast = index + rowSize < 36 && (index + 1) % rowSize !== 0 ? nums[index + rowSize + 1] : -1;

      const neighbors = [northwest, north, northeast, southwest, south, southeast, west, east].filter(n => n !== -1);

      return neighbors.every(n => num > n);
    }
  }, [rowSize]);

  return { localMax };
}

export default useLocalMax;
