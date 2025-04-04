import { Socket } from "socket.io-client";

type socketId = string;

interface socketContext {
  socket: Socket;
}

enum socketEvents {
  JOIN_REQUEST = "join_request",
  USERNAME_EXIST = "username_exist",
  USER_JOINED = "user_joined",
  JOIN_ACCEPTED = "join_accepted",
  UPDATE_ROOM_ARRAY = "update_room_array",
  USER_READY = "user_ready",
}

export { socketEvents };
export type { socketContext, socketId };
