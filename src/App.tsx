import './App.css';

import { useEffect, useMemo, useState } from 'react';

import { SvgCanvas } from 'rendering/SvgCanvas';

import { generateTerrain, shiftTerrain } from 'terrain/generator';
import { getTerrainPolygons } from 'terrain/renderer';

function App() {
  const [width, setWidth] = useState(15);
  const [height, setHeight] = useState(10);
  const [isMoving, setMoving] = useState(false);
  const [terrain, setTerrain] = useState(() =>
    generateTerrain({ width, height })
  );

  useEffect(() => {
    setTerrain(() => generateTerrain({ width, height }));
  }, [width, height]);

  useEffect(() => {
    if (isMoving) {
      const id = setInterval(() => {
        setTerrain((prevTerrain) => {
          console.log(prevTerrain, width, height);
          return shiftTerrain({
            terrain: prevTerrain,
            width,
            height,
          });
        });
      }, 200);
      return () => clearInterval(id);
    }
  }, [isMoving, width, height]);

  const polygons = useMemo(() => {
    return getTerrainPolygons({ terrain, width, height });
  }, [terrain]);

  return (
    <div className="App">
      <header>
        <button
          onClick={() => {
            setTerrain(generateTerrain({ width, height }));
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
        <label>
          W:
          <input
            type="number"
            defaultValue={width}
            onChange={(e) => e.target.value && setWidth(Number(e.target.value))}
          />
        </label>
        <label>
          H:
          <input
            type="number"
            defaultValue={height}
            onChange={(e) =>
              e.target.value && setHeight(Number(e.target.value))
            }
          />
        </label>
      </header>
      <SvgCanvas width="100%" height="100%" polygons={polygons} />
    </div>
  );
}

export default App;
