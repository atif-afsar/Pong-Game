const api = require("./api");
const server = require("http").createServer(api);

const port = process.env.PORT || 3001;
const sockets = require("./sockets");


const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(port, () => {
  console.log("listening on " + port);
});

sockets.listen(io);



