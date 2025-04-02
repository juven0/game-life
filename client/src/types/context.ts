import { Socket } from "socket.io-client";

type socketId = string;

interface socketContext {
  socket: Socket;
}

enum socketEvents {}

export { socketEvents };
export type { socketContext, socketId };
