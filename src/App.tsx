import { useEffect, useState } from "react";
import "./App.css";
import mainLop, { position } from "./algo";

const iteration = 1;
const timeSleep = 6000;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
  let Gp = [
    { x: 10, y: 10 },
    { x: 11, y: 11 },
    { x: 10, y: 12 },
  ];
  // const [Ga, setGa] = useState<position[]>([]);
  const cellSize = 10;
  const numCell = 70;

  // async function loopWithDelay() {
  //   for (let i = 0; i < iteration; i++) {
  //     const Gf = mainLop(69, Gp);
  //     Gp = Gf;
  //     await delay(timeSleep);
  //   }
  // }
  mainLop(69, Gp);
  // loopWithDelay();
  // console.log(Gp);

  return (
    <div className="container">
      {/* <svg width={700} height={700}>
        {Array.from({ length: numCell }).map((_, col) =>
          Array.from({ length: numCell }).map((_, row) => {
            const cellId = `${row}-${col}`;
            return (
              <rect
                key={cellId}
                x={col * cellSize}
                y={row * cellSize}
                height={cellSize}
                width={cellSize}
                fill={
                  Gp.find((e) => e.x === row && e.y === col) ? "black" : "white"
                }
                className="cell"
              />
            );
          })
        )}
      </svg> */}
    </div>
  );
}

export default App;
