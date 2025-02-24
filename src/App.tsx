import { useEffect, useState } from "react";
import "./App.css";
import mainLop, { position } from "./algo";

const iteration = 2;
const timeSleep = 2000;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
  let Gp = [
    // { x: 10, y: 10 },
    // { x: 11, y: 11 },
    // { x: 12, y: 11 },
    // { x: 11, y: 12 },
    // { x: 10, y: 12 },
  ];
  const [Ga, setGa] = useState<position[]>(Gp);
  const [isRuning, setRuning] = useState(false);
  const cellSize = 10;
  const numCell = 70;

  async function loopWithDelay() {
    for (let i = 0; i < iteration; i++) {
      await delay(timeSleep);
    }
  }
  loopWithDelay();

  const next = () => {
    const Gf = mainLop(69, Ga);
    setGa(Gf);
  };

  const addCell = (row: number, col: number) => {
    setGa((prev) => [...prev, { x: row, y: col }]);
  };

  useEffect(() => {
    if (!isRuning) return;
    delay(timeSleep);
    const interval = setInterval(() => {
      setGa((prevGa) => mainLop(69, prevGa));
    }, 200);

    return () => clearInterval(interval);
  }, [isRuning]);

  return (
    <div className="container">
      <svg width={700} height={700}>
        {Array.from({ length: numCell }).map((_, row) =>
          Array.from({ length: numCell }).map((_, col) => {
            const cellId = `${row}-${col}`;
            return (
              <rect
                key={cellId}
                x={col * cellSize}
                y={row * cellSize}
                height={cellSize}
                width={cellSize}
                onClick={() => addCell(row, col)}
                fill={
                  Ga.find((e) => e.x === row && e.y === col) ? "black" : "white"
                }
                className="cell"
              />
            );
          })
        )}
      </svg>
      <button onClick={() => next()}>next</button>
      <button onClick={() => setRuning(!isRuning)}>
        {isRuning ? "pause" : "play"}
      </button>

      <label htmlFor="">{Ga.length}</label>
    </div>
  );
}

export default App;
