import { Socket } from "socket.io";

enum SocketEvent {
  JOIN_REQUEST = "join_request",
  USERNAME_EXIST = "username_exist",
}

interface socketContext {
  socket: Socket;
}

type socketId = string;

export { socketContext, SocketEvent, socketId };
