export const tiles: Record<
  string,
  {
    z: number;
    height: number;
    stroke: string;
    fill: string;
    allowedNeighborIds: string[];
  }
> = {
  '-2': {
    // deep water
    z: -1,
    height: 1,
    stroke: 'darkblue',
    fill: '#000088AA',
    allowedNeighborIds: ['-2', '-1'],
  },
  '-1': {
    // deep water
    z: -1,
    height: 1,
    stroke: 'darkblue',
    fill: '#0000DDAA',
    allowedNeighborIds: ['-2', '-1', '0'],
  },
  '0': {
    // deep water
    z: -0.5,
    height: 0.5,
    stroke: 'darkblue',
    fill: '#0000FFAA',
    allowedNeighborIds: ['-1', '0', '1'],
  },
  '1': {
    // shallow water
    z: 0,
    height: 0,
    stroke: 'lightblue',
    fill: 'aqua',
    allowedNeighborIds: ['0', '1', '2'],
  },
  '2': {
    // sand
    z: 0,
    height: 0.25,
    stroke: '#e0c27b',
    fill: '#e4d0a0',
    allowedNeighborIds: ['1', '2', '3'],
  },
  '3': {
    // grass
    z: 0.25,
    height: 0.25,
    stroke: '#7CFC00',
    fill: 'green',
    allowedNeighborIds: ['2', '3', '3.1', '4'],
  },
  '3.1': {
    // dark grass
    z: 0.25,
    height: 0.5,
    stroke: 'green',
    fill: 'darkgreen',
    allowedNeighborIds: ['3', '3.1', '4'],
  },
  '4': {
    // dirt
    z: 0.5,
    height: 0.5,
    stroke: '#9b7653',
    fill: '#503915',
    allowedNeighborIds: ['3', '4', '3.1', '5'],
  },
  '5': {
    // mountain
    z: 1,
    height: 0.5,
    stroke: '#9b7653',
    fill: '#402905',
    allowedNeighborIds: ['6', '4', '5'],
  },
  '6': {
    // snow
    z: 1.5,
    height: 0.25,
    stroke: '#ccdfe5',
    fill: '#aed4e0',
    allowedNeighborIds: ['6', '5'],
  },
};
