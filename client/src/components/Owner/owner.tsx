import { useEffect, useState } from "react";
import mainLop, { position } from "../../utils/algo";
import "./owner.scss";
import { UseAppContext } from "../../context/appContext";

const iteration = 2;
const timeSleep = 2000;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Owner = () => {
  const [Ga, setGa] = useState<position[]>([]);
  const [isRuning, setRuning] = useState(false);
  const cellSize = 10;
  const numCell = 50;

  const { currentUser } = UseAppContext();

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
      <div className="info">
        <div className="userInfo">
          <label htmlFor="">{currentUser.userName}</label>
        </div>
        <div className="population">Population {Ga.length}</div>
      </div>
      <svg width={500} height={500}>
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
    </div>
  );
};

export default Owner;
