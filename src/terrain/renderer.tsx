import { getCube } from 'primitives/cube';
import type { Tile } from './types';

export const getTerrainPolygons = ({
  terrain,
  width,
  height,
}: {
  terrain: Tile[];
  width: number;
  height: number;
}) => {
  const polygons = terrain.flatMap((tile, index) => {
    const { z, height: zHeight, stroke, fill } = tile;
    const x = index % width;
    const y = Math.floor(index / width);
    return getCube(
      {
        x: x - width / 2 - 0.5,
        y: y - height / 2 - 0.5,
        z: z,
      },
      {
        x: x - width / 2 + 0.5,
        y: y - height / 2 + 0.5,
        z: z + zHeight,
      },
      {
        stroke,
        fill,
        parentObject: tile,
      }
    );
  });

  return polygons;
};
