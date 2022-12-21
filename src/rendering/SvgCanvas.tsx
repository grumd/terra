import type { Polygon } from 'types';

import { useCamera } from './useCamera';
import { usePerspectiveProjection } from './usePerspectiveProjection';

export const SvgCanvas = ({
  polygons,
  width,
  height,
}: {
  polygons: Polygon[];
  width: number | string;
  height: number | string;
}) => {
  const { events, camera } = useCamera();

  const projected = usePerspectiveProjection({ polygons, camera });

  return (
    <>
      <svg
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        {...events}
        viewBox="-1 -1 2 2"
      >
        {projected.map((polygon, i) => {
          const points = polygon.points.map((point) => {
            return `${point.x},${point.y}`;
          });

          return (
            <polygon
              points={points.join(' ')}
              key={i}
              fill={polygon.fill ?? 'grey'}
              stroke={polygon.stroke ?? 'white'}
              strokeWidth={1 / camera.distance / 20}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}
      </svg>
    </>
  );
};
