import type { Point3d } from 'types';
import type { Camera } from './useCamera';

export const useCameraPosition = (camera: Camera): Point3d => {
  const x = camera.distance * Math.sin(camera.pitch) * Math.sin(camera.yaw);
  const y = camera.distance * Math.sin(camera.pitch) * Math.cos(camera.yaw);
  const z = camera.distance * Math.cos(camera.pitch);
  return { x, y, z };
};
