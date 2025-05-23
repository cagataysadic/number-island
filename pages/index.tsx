import React, { useEffect, useCallback, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import UsernameModal from '../components/UsernameModal';
import GameStats from '../components/GameStats';
import GameGrid from '../components/GameGrid';
import ScoreBoard from '../components/ScoreBoard';
import useLocalMax from '../hooks/useLocalMax';
import { fetchScores, postScore } from '../services/api';
import { Score } from '../types/interface';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { incrementCorrect, incrementGuess, resetGame, setCooldown, setGameDifficulty, setGuessResult, setRightGuesses, setRightGuessesReset, setTimer, setTimerButtonDisabled, setUsername, submitUsername, toggleTimerActive } from '../redux/gameSlice';


function Home() {
  const username = useSelector((state: RootState) => state.game.username);
  const isUsernameSubmitted = useSelector((state: RootState) => state.game.isUsernameSubmitted);
  const totalGuess = useSelector((state: RootState) => state.game.totalGuess);
  const guessRight = useSelector((state: RootState) => state.game.guessRight);
  const guesses = useSelector((state: RootState) => state.game.guesses);
  const rightGuesses = useSelector((state: RootState) => state.game.rightGuesses);
  const cooldown = useSelector((state: RootState) => state.game.cooldown);
  const timer = useSelector((state: RootState) => state.game.timer);
  const isTimerActive = useSelector((state: RootState) => state.game.isTimerActive);
  const gameDifficulty = useSelector((state: RootState) => state.game.difficulty);
  const dispatch = useDispatch();

  const [numbers, setNumbers] = useState<number[]>([]);
  const [allLocalMax, setAllLocalMax] = useState<number[]>([]);
  const [allMaxNum, setAllMaxNum] = useState<number[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);
  const [scores, setScores] = useState<Score[]>([]);
  const { localMax } = useLocalMax();

  const totalGuessRef = useRef(totalGuess);
  const guessRightRef = useRef(guessRight);

  useEffect(() => {
    totalGuessRef.current = totalGuess;
  }, [totalGuess]);

  useEffect(() => {
    guessRightRef.current = guessRight;
  }, [guessRight]);

  const fetchAndSetScores = useCallback(async () => {
    try {
      const data = await fetchScores();
      setScores(data);
    } catch (error) {
      console.error('Skorlar çekilemedi:', error);
    }
  }, []);

  const handleSubmitScore = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    try {
      await postScore({
        username,
        total_guess: totalGuessRef.current,
        guess_right: guessRightRef.current,
        accuracy: parseFloat(((guessRightRef.current / totalGuessRef.current) * 100).toFixed(2)) || 0,
        timer,
        difficulty: gameDifficulty,
      });
    } catch (error) {
      console.error('Skor kaydedilirken hata oluştu:', error);
    }
    dispatch(resetGame());
    dispatch(toggleTimerActive(false));
    dispatch(setUsername(''));
    dispatch(submitUsername(false));
    dispatch(setGameDifficulty('easy'));
    setClicked(false);
    refresh();
    fetchAndSetScores();
  };

  useEffect(() => {
    let clock: NodeJS.Timeout;
    if (cooldown > 0) {
      clock = setTimeout(() => {
        handleSubmitScore();
        dispatch(setCooldown(0));
        dispatch(toggleTimerActive(false));
        dispatch(setTimer('Hayır'));
        dispatch(setTimerButtonDisabled(false));
      }, 30000);
    }
    return () => clearTimeout(clock);
  }, [cooldown, isTimerActive]);

  const handleCooldownClick = () => {
    if (cooldown === 0) {
      dispatch(setCooldown(30));
      dispatch(setTimer('Evet'));
      dispatch(toggleTimerActive(true));
      dispatch(setTimerButtonDisabled(true));
    }
  };

  const refresh = useCallback(() => {
    const tempNumbers: number[] = [];
    for (let i = 0; i < 36; i++) {
      tempNumbers.push(Math.floor(Math.random() * 101));
    }
    setNumbers(tempNumbers);
    const tempLocalMax: number[] = [];
    const tempMaxNum: number[] = [];
    for (let i = 0; i < 36; i++) {
      if (localMax(tempNumbers[i], i, tempNumbers, gameDifficulty)) {
        tempLocalMax.push(i);
        tempMaxNum.push(tempNumbers[i])
      }
    }
    setAllLocalMax(tempLocalMax);
    setAllMaxNum(tempMaxNum);
  }, [localMax]);

  useEffect(() => {
    fetchAndSetScores();
  }, [fetchAndSetScores]);

  useEffect(() => {
    if (isUsernameSubmitted) {
      refresh();
    }
  }, [isUsernameSubmitted, refresh]);

  const handleClick = (num: number, index: number) => {
    if (!guesses[index]) {
      dispatch(incrementGuess());
      const isMax = localMax(num, index, numbers, gameDifficulty);
      if (isMax) {
        dispatch(setGuessResult({ index, result: 'right' }));
        dispatch(setRightGuesses({ num }));
        dispatch(incrementCorrect());
      } else {
        dispatch(setGuessResult({ index, result: 'wrong' }));
      }
    }
  };

  useEffect(() => {
    if (rightGuesses.length > 0 && allMaxNum.length > 0 && rightGuesses.length === allMaxNum.length) {
      toast.success("Well done. You have found every local max number");
    }
  }, [guessRight])

  const handleAllLocalMaxClick = () => {
    if (!clicked) {
      allLocalMax.forEach((index) => {
        dispatch(setGuessResult({ index, result: 'right' }));
      });
      dispatch(setRightGuessesReset());
      setClicked(true);
    } else {
      dispatch(resetGame());
      setClicked(false);
    }
  };

  const handleReset = () => {
    dispatch(resetGame());
    setClicked(false);
    refresh();
  };

  useEffect(() => {
    handleReset();
  }, [gameDifficulty])

  return (
    <div className='flex flex-col items-center mt-20 bg-white'>
      <ToastContainer />
      <UsernameModal scores={scores}/>
      {isUsernameSubmitted && (
        <GameStats
          totalGuess={totalGuess}
          guessRight={guessRight}
          handleSubmitScore={handleSubmitScore}
          handleCooldownClick={handleCooldownClick}
        />
      )}
      {isUsernameSubmitted && (
        <GameGrid
          numbers={numbers}
          guesses={guesses}
          handleClick={handleClick}
          handleAllLocalMaxClick={handleAllLocalMaxClick}
          handleReset={handleReset}
        />
      )}
      <ScoreBoard scores={scores} />
    </div>
  );
}

export default Home;