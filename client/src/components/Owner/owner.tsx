import { useEffect, useState } from "react";
import mainLop, { position } from "../../utils/algo";
import "./owner.scss";
import { UseAppContext } from "../../context/appContext";
import { useSocket } from "../../context/socketContext";
import { socketEvents } from "../../types/socket";
import { USER_STATUS } from "../../types/user";
import { GAME_STATUS } from "../../types/game";

const iteration = 2;
const timeSleep = 2000;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Owner = () => {
  const { userPopulation, setUserPopulation, currentUser, gameState } =
    UseAppContext();
  const { socket } = useSocket();
  const { status, setStatus } = UseAppContext();

  const [Ga, setGa] = useState<position[]>(userPopulation || []);
  // const [isRuning, setRuning] = useState(false);
  const cellSize = 10;
  const numCell = 50;

  async function loopWithDelay() {
    for (let i = 0; i < iteration; i++) {
      await delay(timeSleep);
    }
  }
  loopWithDelay();

  // const next = () => {
  //   const Gf = mainLop(69, Ga);
  //   setGa(Gf);
  // };

  const ready = () => {
    socket.emit(socketEvents.USER_READY, { userPopulation, currentUser });
    setStatus(USER_STATUS.READY);
  };

  const addCell = (row: number, col: number) => {
    setUserPopulation([...userPopulation, { x: row, y: col }]);
    setGa((prev) => [...prev, { x: row, y: col }]);
  };

  useEffect(() => {
    console.log(gameState.status);
    if (gameState.status !== GAME_STATUS.STARTED) return;
    delay(timeSleep);
    const interval = setInterval(() => {
      setGa((prevGa) => mainLop(69, prevGa));
    }, 200);

    return () => clearInterval(interval);
  }, [gameState]);

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
      <button
        disabled={status === USER_STATUS.READY ? true : false}
        className={status === USER_STATUS.READY ? "desable" : "active"}
        onClick={() => ready()}
      >
        Ready
      </button>
      {/* <button onClick={() => setRuning(!isRuning)}>
        {isRuning ? "pause" : "play"}
      </button> */}
    </div>
  );
};

export default Owner;
