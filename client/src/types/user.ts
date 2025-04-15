enum USER_CONNECTION_STATUS {
  ONLINE = "online",
  OFFLINE = "offline",
}

interface User {
  userName: string;
  roomId: string;
}

interface RemoteUser {
  userName: string;
  roomId: string;
  socketId: string;
  status: USER_STATUS;
}

enum USER_STATUS {
  INITIAL = "initial",
  CONNECTING = "connecting",
  ATTEMPTING_JOIN = "attempting-join",
  JOINED = "joined",
  CONNECTION_FAILED = "connection-failed",
  DISCONNECTED = "disconnected",
  READY = "ready",
}

export { USER_CONNECTION_STATUS, USER_STATUS };
export type { User, RemoteUser };
