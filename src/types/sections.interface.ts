export const Difficulty = {
  Easy: 1,
  Normal: 2,
  Hard: 3,
} as const;

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];
