import { Server } from "socket.io";

let io; // keep reference so it doesn’t reinitialize on hot reload

export async function GET(req) {
  if (!io) {
    console.log("Starting Socket.IO server...");
    io = new Server(resSocketServer, {
      path: "/api/socket/io", // custom path
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      // listen for messages from client
      socket.on("message", (msg) => {
        // broadcast to all clients
        io.emit("message", msg);
      });
    });
  }

  return new Response("Socket server is running");
}
