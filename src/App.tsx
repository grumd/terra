import './App.css';

import { useEffect, useMemo, useState } from 'react';

import { useElementSize } from 'utils/useElementSize';
import { SvgCanvas } from 'rendering/SvgCanvas';

import { generateTerrain, shiftTerrain } from 'terrain/generator';
import { getTerrainPolygons } from 'terrain/renderer';

function App() {
  const [ref, rect] = useElementSize();
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(10);
  const [isMoving, setMoving] = useState(true);

  useEffect(() => {
    setTerrain(() => generateTerrain({ width, height }) ?? []);
  }, [width, height]);

  useEffect(() => {
    if (isMoving) {
      const id = setInterval(() => {
        setTerrain((prevTerrain) => {
          return shiftTerrain({
            terrain: prevTerrain,
            width,
            height,
          });
        });
      }, 150);
      return () => clearInterval(id);
    }
  }, [isMoving, width, height]);

  const [terrain, setTerrain] = useState(
    () => generateTerrain({ width, height }) ?? []
  );

  const polygons = useMemo(() => {
    return getTerrainPolygons({ terrain, width, height });
  }, [terrain]);

  return (
    <div className="App">
      <header>
        <button
          onClick={() => {
            setTerrain(generateTerrain({ width, height }) ?? []);
          }}
        >
          Randomize
        </button>
        <button
          onClick={() => {
            setMoving((prev) => !prev);
          }}
        >
          {isMoving ? 'Stop' : 'Start'} moving
        </button>
        W:{' '}
        <input
          type="number"
          defaultValue={width}
          onChange={(e) => e.target.value && setWidth(Number(e.target.value))}
        />
        H:{' '}
        <input
          type="number"
          defaultValue={height}
          onChange={(e) => e.target.value && setHeight(Number(e.target.value))}
        />
      </header>
      <div ref={ref} className="svg-canvas-container">
        {rect && (
          <SvgCanvas width={'100%'} height={rect.height} polygons={polygons} />
        )}
      </div>
    </div>
  );
}

export default App;
