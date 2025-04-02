import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { Server } from "socket.io";
import http from "http";
import { SocketEvent } from "./types/socket";
import { User, USER_STATUS } from "./types/user";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
});

let userSocketMap: User[] = [];

function getUserInRoom(roomId: string) {
  return userSocketMap.filter((user) => (user.roomId = roomId));
}

io.on("connection", (socket) => {
  socket.on(SocketEvent.JOIN_REQUEST, ({ roomId, userName }) => {
    const isUserExist = getUserInRoom(roomId).filter(
      (user) => (user.userName = userName)
    );

    if (isUserExist.length > 0) {
      socket.to(socket.id).emit(SocketEvent.USERNAME_EXIST);
      return;
    }

    const user: User = {
      userName: userName,
      roomId: roomId,
      status: USER_STATUS.ONLINE,
      socketId: socket.id,
    };

    userSocketMap.push(user);
    socket.join(roomId);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
