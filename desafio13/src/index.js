import app from './app'
import {
    Server as WebSocketServer
} from 'socket.io'
import http from 'http'
import {
    connectDB
} from "./db"
import sockets from "./sockets"
import args from "./global/yargs"

connectDB()
const PORT = args.port
const server = http.createServer(app)
const httpServer = server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
const io = new WebSocketServer(httpServer)


sockets(io)