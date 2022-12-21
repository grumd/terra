import type { tiles } from './tiles';

export type Tile = {
  height: number;
  z: number;
  stroke: string;
  fill: string;
  tileId: keyof typeof tiles;
};
