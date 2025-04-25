enum GAME_STATUS {
  WAITING = "waiting",
  STARTED = "started",
  STOPED = "stoped",
}

interface Game {
  status: GAME_STATUS;
}

export { GAME_STATUS };
export type { Game };
