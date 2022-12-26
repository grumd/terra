import { useState } from 'react';
import { useGesture } from '@use-gesture/react';

export type Camera = {
  pitch: number;
  yaw: number;
  distance: number;
};

export const useCamera = (): {
  camera: Camera;
  events: React.DOMAttributes<SVGSVGElement>;
} => {
  const [pitch, setPitch] = useState(-Math.PI / 4);
  const [yaw, setYaw] = useState((-3 * Math.PI) / 4);
  const [distance, setDistance] = useState(20);

  const bind = useGesture({
    onPinch: ({ first, memo, movement: [d] }) => {
      if (first) {
        return distance; // record initial distance in a memo
      }
      setDistance(memo / d); // change zoom level when pinching
    },
    onWheel: ({ delta: [, d] }) => {
      if (d !== 0) {
        setDistance((prev) =>
          Math.max(3, prev + 0.05 * (d > 0 ? 1 : -1) * prev)
        );
      }
    },
    onDrag: ({ pinching, cancel, delta: [x, y] }) => {
      if (pinching) return cancel();
      setPitch(pitch + y * 0.01);
      setYaw(yaw - x * 0.01);
    },
  });

  return {
    camera: {
      pitch,
      yaw,
      distance,
    },
    events: bind(),
  };
};
