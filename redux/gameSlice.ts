import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '../types/interface';

const initialState: GameState = {
  username: '',
  totalGuess: 0,
  guessRight: 0,
  cooldown: 0,
  timer: 'Hayır',
  isTimerActive: false,
  isUsernameSubmitted: false,
  guesses: {},
  rightGuesses: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    submitUsername(state, action: PayloadAction<boolean>) {
      state.isUsernameSubmitted = action.payload;
    },
    incrementGuess(state) {
      state.totalGuess++;
    },
    incrementCorrect(state) {
      state.guessRight++;
    },
    setGuessResult(state, action: PayloadAction<{ index: number; result: 'right' | 'wrong' }>) {
      const { index, result } = action.payload;
      state.guesses[index] = result;
    },
    setRightGuesses(state, action: PayloadAction<{ num: number }>) {
      const { num } = action.payload;
      state.rightGuesses.push(num);
    },
    setRightGuessesReset(state) {
      state.rightGuesses = [];
    },
    resetGame(state) {
      state.totalGuess = 0;
      state.guessRight = 0;
      state.guesses = {};
    },
    setCooldown(state, action: PayloadAction<number>) {
      state.cooldown = action.payload;
    },
    setTimer(state, action: PayloadAction<string>) {
      state.timer = action.payload;
    },
    toggleTimerActive(state, action: PayloadAction<boolean>) {
      state.isTimerActive = action.payload;
    },
  },
});

export const {
  setUsername,
  submitUsername,
  incrementGuess,
  incrementCorrect,
  setGuessResult,
  setRightGuesses,
  setRightGuessesReset,
  resetGame,
  setCooldown,
  setTimer,
  toggleTimerActive,
} = gameSlice.actions;

export default gameSlice.reducer;