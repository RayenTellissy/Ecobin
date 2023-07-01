const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const morgan = require("morgan")
const { Server } = require("socket.io")

app.use(morgan("combined"))
app.use(cors())

app.get("/", (req,res) => {
  res.send("Socket.")
})

const server = http.createServer(app)

const io = new Server(server)

io.on("connection", socket => {
  console.log("user connected", socket.id)

  socket.on("join_room", data => {
    socket.join(data)
  })

  socket.on("send_message", data => {
    socket.to(data.conversation).emit("receive_message", data)
  })
})

server.listen(5000, () => {
  console.log("> Socket Running")
})