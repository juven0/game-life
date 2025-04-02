import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { Server } from "socket.io";
import http from "http";

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

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
