import express from 'express'
import http from 'http'
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin: "*" }, // allow all origins
})

io.on('connection', socket => {
    console.log('New user has connected', socket.id)

    socket.on('chatMessage', (msg) => {
        console.log('Message recieved', msg)

        io.emit('chatMessage', msg)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
})

server.listen(8000)