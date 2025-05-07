import React, { useEffect, useCallback, useState } from 'react';
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
import { incrementCorrect, incrementGuess, resetGame, setCooldown, setGuessResult, setRightGuesses, setRightGuessesReset, setTimer, setUsername, submitUsername, toggleTimerActive } from '../redux/gameSlice';


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
  const dispatch = useDispatch();

  const [numbers, setNumbers] = useState<number[]>([]);
  const [allLocalMax, setAllLocalMax] = useState<number[]>([]);
  const [allMaxNum, setAllMaxNum] = useState<number[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);
  const [scores, setScores] = useState<Score[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const { localMax } = useLocalMax();

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
        total_guess: totalGuess,
        guess_right: guessRight,
        accuracy: parseFloat(((guessRight / totalGuess) * 100).toFixed(2)) || 0,
        timer,
      });
      dispatch(resetGame());
      dispatch(toggleTimerActive(false));
      dispatch(setUsername(''));
      dispatch(submitUsername(false));
      setClicked(false);
      refresh();
      fetchAndSetScores();
    } catch (error) {
      console.error('Skor kaydedilirken hata oluştu:', error);
    }
  };

  useEffect(() => {
    let clock: NodeJS.Timeout;
    if (cooldown > 0) {
      clock = setTimeout(() => {
        handleSubmitScore();
        dispatch(setCooldown(0));
        dispatch(toggleTimerActive(false));
        dispatch(setTimer('Hayır'));
        setButtonDisabled(false);
      }, 3000);
    }
    return () => clearTimeout(clock);
  }, [cooldown, isTimerActive]);

  const handleCooldownClick = () => {
    if (cooldown === 0) {
      dispatch(setCooldown(30));
      dispatch(setTimer('Evet'));
      dispatch(toggleTimerActive(true));
      setButtonDisabled(true);
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
      if (localMax(tempNumbers[i], i, tempNumbers)) {
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
      const isMax = localMax(num, index, numbers);
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ToastContainer />
      <UsernameModal scores={scores}/>
      {isUsernameSubmitted && (
        <GameStats
          totalGuess={totalGuess}
          guessRight={guessRight}
          buttonDisabled={buttonDisabled}
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
      {isUsernameSubmitted && <ScoreBoard scores={scores} />}
    </div>
  );
}

export default Home;