const server = require("http").createServer();

const port = process.env.PORT || 3001;

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(port, () => {
  console.log("listening on " + port);
});

let readyPlayers = 0

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('ready', () => {
    console.log('Player ready', socket.id);

    readyPlayers++;

    if (readyPlayers === 2) {
      io.emit('start');
    }
  });
});