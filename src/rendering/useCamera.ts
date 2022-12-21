import { useRef, useState } from 'react';

export type Camera = {
  pitch: number;
  yaw: number;
  distance: number;
};

export const useCamera = (): {
  camera: Camera;
  events: {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseUp: (e: React.MouseEvent) => void;
    onMouseLeave: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onWheel: (e: React.WheelEvent) => void;
  };
} => {
  const mouseDown = useRef(false);
  const [pitch, setPitch] = useState(-Math.PI / 4);
  const [yaw, setYaw] = useState((-3 * Math.PI) / 4);
  const [distance, setDistance] = useState(20);

  const onMouseDown = (e: React.MouseEvent) => {
    mouseDown.current = true;
  };

  const onMouseUp = (e: React.MouseEvent) => {
    mouseDown.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (mouseDown.current) {
      setPitch(pitch + e.movementY * 0.01);
      setYaw(yaw + e.movementX * 0.01);
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    setDistance((prev) =>
      Math.max(3, prev + 0.05 * (e.deltaY > 0 ? 1 : -1) * prev)
    );
  };

  return {
    camera: {
      pitch,
      yaw,
      distance,
    },
    events: {
      onMouseDown,
      onMouseUp,
      onMouseMove,
      onMouseLeave: onMouseUp,
      onWheel,
    },
  };
};
