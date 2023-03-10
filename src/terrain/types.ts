import type { tiles } from './tiles';

export type Tile = {
  height: number;
  z: number;
  stroke: string;
  fill: string;
  tileId: keyof typeof tiles;
};

export type TileId =
  | '-2'
  | '-1'
  | '0'
  | '1'
  | '2'
  | '3'
  | '3.5'
  | '4'
  | '5'
  | '6';
