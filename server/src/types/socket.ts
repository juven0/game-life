import { Socket } from "socket.io";

enum SocketEvent {
  JOIN_REQUEST = "join_request",
  USERNAME_EXIST = "username_exist",
  USER_JOINED = "user_joined",
  JOIN_ACCEPTED = "join_accepted",
  UPDATE_ROOM_ARRAY = "update_room_array",
  USER_READY = "user_ready",
  GAME_START = "game_start",
}

interface socketContext {
  socket: Socket;
}

type socketId = string;

export { socketContext, SocketEvent, socketId };
