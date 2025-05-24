export interface Score {
    username: string;
    total_guess: number;
    guess_right: number;
    accuracy: number;
    timer: string;
    difficulty: string;
}

export interface GameStatsProps {
  totalGuess: number;
  guessRight: number;
  handleSubmitScore: (e: React.FormEvent) => void;
  handleCooldownClick: () => void;
  handleReplay: () => void;
}

export interface GameGridProps {
    numbers: number[];
    guesses: { [key: number]: 'right' | 'wrong'};
    handleClick: (num: number, index: number) => void;
    handleAllLocalMaxClick: () => void;
    handleReset: () => void;
    handleReplayMemory: (num: number, index: number) => void;
}

export type GameState = {
  username: string;
  totalGuess: number;
  guessRight: number;
  cooldown: number;
  timer: string;
  isTimerActive: boolean;
  isUsernameSubmitted: boolean;
  guesses: { [key: number]: 'right' | 'wrong' };
  rightGuesses: number[];
  difficulty: string;
  timerButtonDisabled: boolean;
  difficultyButton: string;
  replayButtonDisabled: boolean;
};

export interface ScoreBoardProps {
  scores: Score[];
}

export type ColumnMeta = {
  className?: string;
};

export type ClickEvent = {
  num: number;
  index: number;
  timestamp: number;
}
