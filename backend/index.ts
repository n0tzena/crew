import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import type { Message } from "../shared/types.ts"

const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.on('connection', (socket) => {
    console.log('a user connected')
    io.emit('message', {
        user: "Teste",
        text: "Message",
        image: "aaa"
    } satisfies Message)

    socket.on("message", (msg: Message) => {
        io.emit("message", msg)
    })
});

server.listen(3000, () => {
    console.log("server initialized at port 3000")
});