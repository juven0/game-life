import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { Server } from "socket.io";
import http from "http";
import { SocketEvent } from "./types/socket";
import { User, USER_STATUS, USER_GAME_STATUS } from "./types/user";

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

function verifyRoomStatus(roomId: string) {
  return userSocketMap.every(
    (user) => user.gameStatus === USER_GAME_STATUS.READY
  );
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
      gameStatus: USER_GAME_STATUS.CREATE,
    };

    userSocketMap.push(user);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit(SocketEvent.USER_JOINED, { user });
    const users = getUserInRoom(roomId);
    io.to(socket.id).emit(SocketEvent.JOIN_ACCEPTED, { user, users });
  });

  socket.on(SocketEvent.UPDATE_ROOM_ARRAY, ({ roomId, userArray, user }) => {
    socket.broadcast
      .to(roomId)
      .emit(SocketEvent.UPDATE_ROOM_ARRAY, { user, userArray });
  });

  socket.on(SocketEvent.USER_READY, (data) => {
    userSocketMap.map((user) => {
      if (user.userName === data.currentUser.userName) {
        user.gameStatus = USER_GAME_STATUS.READY;
      }
    });

    const resp = {
      [data.currentUser.userName]: data,
    };
    socket.broadcast
      .to(data.currentUser.roomId)
      .emit(SocketEvent.USER_READY, resp);

    if (verifyRoomStatus(data.currentUser.roomId)) {
      socket.broadcast
        .to(data.currentUser.roomId)
        .emit(SocketEvent.GAME_START, data.currentUser.roomId);
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
