import { useMemo } from 'react';
import type { Polygon, ProjectedPolygon } from 'types';

import { useCameraPosition } from './useCameraPosition';
import type { Camera } from './useCamera';

import { multiply } from 'utils/matrix';
import { notNull } from 'utils/notNull';

const projectPolygon = ({
  polygon,
  cameraX,
  cameraY,
  cameraZ,
  cz,
  sz,
  cx,
  sx,
}: {
  polygon: Polygon;
  cameraX: number;
  cameraY: number;
  cameraZ: number;
  cx: number;
  sx: number;
  sz: number;
  cz: number;
}): ProjectedPolygon | null => {
  // Hide polygons facing away from camera according to normal vector (naive version)
  if (
    polygon.normalVector.x * (cameraX - polygon.points[0].x) > 0 ||
    polygon.normalVector.y * (cameraY - polygon.points[0].y) > 0 ||
    polygon.normalVector.z * (cameraZ - polygon.points[0].z) > 0
  ) {
    return null;
  }

  const projectedPoints = polygon.points.map((point) => {
    const x = point.x - cameraX;
    const y = point.y - cameraY;
    const z = point.z - cameraZ;

    const [[rotatedX], [rotatedY], [rotatedZ]] = multiply(
      [
        [1, 0, 0],
        [0, cz, sz],
        [0, -sz, cz],
      ],
      multiply(
        [
          [cx, sx, 0],
          [-sx, cx, 0],
          [0, 0, 1],
        ],
        [[x], [y], [z]]
      )
    );

    return {
      x: rotatedX / rotatedZ,
      y: rotatedY / rotatedZ,
      z: rotatedZ,
    };
  });

  // Hide points behind the camera
  if (projectedPoints.some((point) => point.z > 0)) {
    return null;
  }

  let sum = projectedPoints[0].z;
  let zIndexMin = projectedPoints[0].z;
  let zIndexMax = projectedPoints[0].z;
  for (let i = 1; i < projectedPoints.length; i++) {
    const zIndex = projectedPoints[i].z;
    sum += zIndex;
    if (zIndex < zIndexMin) zIndexMin = zIndex;
    if (zIndex > zIndexMax) zIndexMax = zIndex;
  }

  return {
    ...polygon,
    points: projectedPoints,
    zIndexMin: zIndexMin + Number.EPSILON,
    zIndexMax: zIndexMax - Number.EPSILON,
    zIndexAvg: sum / projectedPoints.length,
  };
};

export const usePerspectiveProjection = ({
  polygons,
  camera,
}: {
  polygons: Polygon[];
  camera: Camera;
}) => {
  const { x: cameraX, y: cameraY, z: cameraZ } = useCameraPosition(camera);
  const { pitch, yaw, distance } = camera;

  return useMemo(() => {
    const cx = Math.cos(-yaw);
    const sx = Math.sin(-yaw);
    const cz = Math.cos(-pitch);
    const sz = Math.sin(-pitch);

    const projected = polygons
      .map((polygon) =>
        projectPolygon({
          polygon,
          cameraX,
          cameraY,
          cameraZ,
          cx,
          sx,
          sz,
          cz,
        })
      )
      .filter(notNull);

    projected.sort((a, b) => a.zIndexAvg - b.zIndexAvg);

    return projected;
  }, [polygons, pitch, yaw, distance, cameraX, cameraY, cameraZ]);
};
