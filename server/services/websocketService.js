import { Server } from "socket.io";
let io;

export const initWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // client-side url here
    },
  });

  io.on("connection", (socket) => {
    console.log(`🟢 User connected: ${socket.id}`);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    socket.on("disconnect", () => {
      console.log(`🔴 User disconnected: ${socket.id}`);
    });
  });
};

export const emitMigrationProgress = ( userId, data ) => {
    if (io) {
        io.to(userId).emit("migration-progress", data);
    }
};
