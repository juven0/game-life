enum USER_STATUS {
  ONLINE = "online",
  OFFLINE = "offline",
}

enum USER_GAME_STATUS {
  READY = "ready",
  CREATE = "create",
}
interface User {
  userName: string;
  roomId: string;
  socketId: string;
  status: USER_STATUS;
  gameStatus: USER_GAME_STATUS;
}

export { USER_STATUS, User, USER_GAME_STATUS };
