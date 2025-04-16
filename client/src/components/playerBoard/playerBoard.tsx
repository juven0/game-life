import { userData } from "../../types/userDataContext";
import "./playerBoard.scss";

const PlayerBoard = ({
  playerName,
  userData,
}: {
  playerName: string;
  userData: userData;
}) => {
  const cellSize = 7;
  const numCell = 50;

  console.log(userData);
  return (
    <div className="playerBoard">
      <div className="playerInfo">
        <label htmlFor="">{playerName}</label>
        <label htmlFor="">122</label>
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
                fill={
                  userData !== undefined
                    ? userData[playerName].userPopulation?.length > 1
                      ? userData[playerName].userPopulation.find(
                          (e) => e.x === row && e.y === col
                        )
                        ? "black"
                        : "white"
                      : "white"
                    : "white"
                }
                className="cell"
              />
            );
          })
        )}
      </svg>
    </div>
  );
};

export default PlayerBoard;
