import type { Tile } from './types';

import { tiles } from './tiles';

type TerrainTileState = {
  possibleIds: (keyof typeof tiles)[];
  index: number;
};

const logTerrain = (terrain: TerrainTileState[], width: number) => {
  // console log as a grid
  console.log(
    terrain
      .map((tile, index) => {
        if (index % width === 0) {
          return `
(${tile.possibleIds.join('-').padEnd(5)})`;
        }
        return `(${tile.possibleIds.join('-').padEnd(5)})`;
      })
      .join('')
  );
};

const logTerrainPart = (
  terrain: TerrainTileState[],
  index: number,
  width: number,
  radius: number = 2
) => {
  // console log as a grid
  let text = '';
  for (let i = -radius; i <= radius; i++) {
    for (let j = -radius; j <= radius; j++) {
      const tile = terrain[index + i * width + j];
      const x = index % width;
      const y = Math.floor(index / width);
      if (!tile || x + j < 0 || x + j >= width || y + i < 0 || y + i >= width) {
        text += '-------';
        continue;
      }
      text += `(${tile.possibleIds.join('-').padEnd(5)})`;
    }
    text += '\n';
  }
  console.log(text);
};

const getRandomFrom = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getNeighbors = (
  array: TerrainTileState[],
  index: number,
  width: number
): TerrainTileState[] => {
  const neighbors: TerrainTileState[] = [];
  const x = index % width;
  if (x >= 1) neighbors.push(array[index - 1]);
  if (x < width - 1) neighbors.push(array[index + 1]);
  if (index >= width) neighbors.push(array[index - width]);
  if (index + width < array.length) neighbors.push(array[index + width]);
  return neighbors;
};

export const shiftTerrain = ({
  terrain,
  width,
  height,
}: {
  terrain: Tile[];
  width: number;
  height: number;
}) => {
  if (!width || !height) {
    return [];
  }

  return generateTerrain({
    width,
    height,
    initialTerrain: [
      ...terrain.slice(width).map((tile, index) => ({
        possibleIds: [tile.tileId],
        index,
      })),
      ...Array.from({ length: width }).map((_, index) => ({
        possibleIds:
          tiles[terrain[terrain.length - width + index].tileId]
            .allowedNeighborIds,
        index: terrain.length - width + index,
      })),
    ].map((tile, index) => ({ ...tile, index })),
  });
};

export const getEmptyTerrainState = (length: number) => {
  return Array.from({ length }).map(
    (_, index): TerrainTileState => ({
      possibleIds: Object.entries(tiles).map(([id]) => id),
      index,
    })
  );
};

export const generateTerrain = ({
  width,
  height,
  initialTerrain,
}: {
  width: number;
  height: number;
  initialTerrain?: TerrainTileState[];
}): Tile[] => {
  if (!width || !height) return [];

  const terrain: TerrainTileState[] =
    initialTerrain ?? getEmptyTerrainState(width * height);

  const nonCollapsedIndexes = terrain
    .filter((tile) => tile.possibleIds.length > 1)
    .map((tile) => tile.index);

  // Pick random tile to collapse first
  let indexToCollapse: number | null = getRandomFrom(nonCollapsedIndexes);

  const removeImpossibleNeighborStates = (centerIndex: number) => {
    const centerTile = terrain[centerIndex];
    const possibleNeighborIds = centerTile.possibleIds.flatMap((id) => {
      return tiles[id].allowedNeighborIds;
    });

    const neighborTiles = getNeighbors(terrain, centerIndex, width);
    // console.log(structuredClone(neighborTiles));
    neighborTiles.forEach((neighbor) => {
      if (!neighbor) return;
      const newPossibleIds = neighbor.possibleIds.filter((possibleId) => {
        return possibleNeighborIds.includes(possibleId);
      });

      if (newPossibleIds.length === 0) {
        console.log('No possible ids for neighbor');
        logTerrainPart(terrain, neighbor.index, width);
        console.log({ possibleNeighborIds, centerTile, neighbor });
        throw 'error';
      }

      if (newPossibleIds.length < neighbor.possibleIds.length) {
        neighbor.possibleIds = newPossibleIds;

        if (newPossibleIds.length === 1) {
          nonCollapsedIndexes.splice(
            nonCollapsedIndexes.indexOf(neighbor.index),
            1
          );
        }
        removeImpossibleNeighborStates(neighbor.index);
      }
    });
  };

  while (indexToCollapse !== null) {
    const tileToCollapse = terrain[indexToCollapse];
    // Pick a random possible state for current tile
    const tileId = getRandomFrom(tileToCollapse.possibleIds);
    // Collapse to one of allowed states
    tileToCollapse.possibleIds = [tileId];
    nonCollapsedIndexes.splice(nonCollapsedIndexes.indexOf(indexToCollapse), 1);
    // logTerrainPart(terrain, tileToCollapse.index, width);
    removeImpossibleNeighborStates(indexToCollapse);

    const neighborTiles = getNeighbors(terrain, indexToCollapse, width);
    const nonCollapsedNeighbors = neighborTiles.filter(
      (candidate) => candidate && nonCollapsedIndexes.includes(candidate.index)
    );

    if (nonCollapsedNeighbors.length) {
      indexToCollapse = getRandomFrom(nonCollapsedNeighbors).index;
    } else if (nonCollapsedIndexes.length > 0) {
      indexToCollapse = getRandomFrom(nonCollapsedIndexes);
    } else {
      indexToCollapse = null;
    }
  }

  return terrain.map((tile) => {
    return {
      ...tiles[tile.possibleIds[0]],
      tileId: tile.possibleIds[0],
    };
  });
};
