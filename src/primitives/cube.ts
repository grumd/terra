import type { Point3d, Polygon } from 'types';

export const getCube = <ParentObject>(
  from: Point3d,
  to: Point3d,
  options: { stroke?: string; fill?: string; parentObject?: ParentObject } = {}
): Polygon<ParentObject>[] => {
  return [
    {
      ...options,
      normalVector: { x: 0, y: 0, z: 1 },
      points: [
        { x: from.x, y: from.y, z: from.z },
        { x: to.x, y: from.y, z: from.z },
        { x: to.x, y: to.y, z: from.z },
        { x: from.x, y: to.y, z: from.z },
      ],
    },
    {
      ...options,
      normalVector: { x: 0, y: 0, z: -1 },
      points: [
        { x: from.x, y: from.y, z: to.z },
        { x: to.x, y: from.y, z: to.z },
        { x: to.x, y: to.y, z: to.z },
        { x: from.x, y: to.y, z: to.z },
      ],
    },
    {
      ...options,
      normalVector: { x: 0, y: 1, z: 0 },
      points: [
        { x: from.x, y: from.y, z: from.z },
        { x: to.x, y: from.y, z: from.z },
        { x: to.x, y: from.y, z: to.z },
        { x: from.x, y: from.y, z: to.z },
      ],
    },
    {
      ...options,
      normalVector: { x: 0, y: -1, z: 0 },
      points: [
        { x: from.x, y: to.y, z: from.z },
        { x: to.x, y: to.y, z: from.z },
        { x: to.x, y: to.y, z: to.z },
        { x: from.x, y: to.y, z: to.z },
      ],
    },
    {
      ...options,
      normalVector: { x: 1, y: 0, z: 0 },
      points: [
        { x: from.x, y: from.y, z: from.z },
        { x: from.x, y: to.y, z: from.z },
        { x: from.x, y: to.y, z: to.z },
        { x: from.x, y: from.y, z: to.z },
      ],
    },
    {
      ...options,
      normalVector: { x: -1, y: 0, z: 0 },
      points: [
        { x: to.x, y: from.y, z: from.z },
        { x: to.x, y: to.y, z: from.z },
        { x: to.x, y: to.y, z: to.z },
        { x: to.x, y: from.y, z: to.z },
      ],
    },
  ];
};
