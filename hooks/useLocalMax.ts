import { useCallback } from 'react';

function useLocalMax() {
  const rowSize = 6;

  const localMax = useCallback((num: number, index: number, nums: number[]): boolean => {
    const top = index - rowSize >= 0 ? nums[index - rowSize] : -1;
    const bottom = index + rowSize < 36 ? nums[index + rowSize] : -1;
    const left = index % rowSize !== 0 ? nums[index - 1] : -1;
    const right = (index + 1) % rowSize !== 0 ? nums[index + 1] : -1;

    const neighbors = [top, bottom, left, right].filter(n => n !== -1);

    return neighbors.every(n => num > n);
  }, [rowSize]);

  return { localMax };
}

export default useLocalMax;
