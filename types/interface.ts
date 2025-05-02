export interface Score {
    username: string;
    total_guess: number;
    guess_right: number;
    accuracy: number;
    timer: string;
}

export interface GameStatsProps {
  totalGuess: number;
  guessRight: number;
  handleSubmitScore: (e: React.FormEvent) => void;
  handleCooldownClick: () => void;
}

export interface GameGridProps {
    numbers: number[];
    guesses: { [key: number]: 'right' | 'wrong'};
    handleClick: (num: number, index: number) => void;
    handleAllLocalMaxClick: () => void;
    handleReset: () => void;
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
};