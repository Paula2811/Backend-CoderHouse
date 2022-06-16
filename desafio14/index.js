import app from './src/app.js'
import {Server as ioServer} from 'socket.io'
import {Server as http} from 'http'
import {connectDB} from './src/db.js'
import args from './src/global/yargs.js'
import sockets from './src/sockets.js'
import Server from './src/server/server.js'

connectDB()
const https = http(app)
const io = new ioServer(https)
sockets(io)

const server= new Server()
server[args.mode](args.port, https)