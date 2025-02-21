import "./App.css";

function App() {
  const cellSize = 10;
  const numCell = 200;

  return (
    <div className="container">
      <svg width={900} height={900}>
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
                fill={col == 10 && row == 10 ? "black" : "white"}
                className="cell"
              />
            );
          })
        )}
      </svg>
    </div>
  );
}

export default App;
