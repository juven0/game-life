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

function getUserInRoom(roomId: string): User[] {
  return userSocketMap.filter((user) => user.roomId === roomId);
}

function getRoomId(socketId: string): string | null {
  const roomId = userSocketMap.find(
    (user) => user.socketId === socketId
  )?.roomId;
  if (!roomId) {
    return null;
  }
  return roomId;
}

function getUserBySocketId(socketId: string): User | null {
  const user = userSocketMap.find((user) => user.socketId === socketId);
  if (!user) {
    return null;
  }
  return user;
}

io.on("connection", (socket) => {
  socket.on(SocketEvent.JOIN_REQUEST, ({ roomId, userName }) => {
    console.log(userName);
    // const isUserExist = getUserInRoom(roomId)?.filter(
    //   (user: User) => (user.userName = userName)
    // );

    // if (isUserExist.length > 0) {
    //   socket.to(socket.id).emit(SocketEvent.USERNAME_EXIST);
    //   return;
    // }

    const user: User = {
      userName: userName,
      roomId: roomId,
      status: USER_STATUS.ONLINE,
      socketId: socket.id,
    };

    userSocketMap.push(user);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit(SocketEvent.USER_JOINED, { user });
    const users = getUserInRoom(roomId);
    io.to(socket.id).emit(SocketEvent.JOIN_ACCEPTED, { user, users });
    console.log(users);
  });

  socket.on(SocketEvent.UPDATE_ROOM_ARRAY, ({ roomId, userArray, user }) => {
    socket.broadcast
      .to(roomId)
      .emit(SocketEvent.UPDATE_ROOM_ARRAY, { user, userArray });
  });

  socket.on(SocketEvent.USER_READY, ({ roomId, user, userFirstArray }) => {
    socket.broadcast
      .to(roomId)
      .emit(SocketEvent.USER_READY, { user, userFirstArray });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
