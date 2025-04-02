enum USER_STATUS {
  ONLINE = "online",
  OFFLINE = "offline",
}

interface User {
  userName: string;
  roomId: string;
  socketId: string;
  status: USER_STATUS;
}

export { USER_STATUS, User };
