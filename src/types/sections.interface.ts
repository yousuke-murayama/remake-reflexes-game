export const Difficulty = {
  Easy: 1,
  Normal: 2,
  Hard: 3,
} as const;

export type Difficulty = (typeof Difficulty)[keyof typeof Difficulty];

export interface Target {
  id: number;
  position: {
    x: number;
    y: number;
  };
  size: number;
  visible: boolean;
}

export interface PlusEffect {
  id: number;
  position: {
    x: number;
    y: number;
  };
  visible: boolean;
}
