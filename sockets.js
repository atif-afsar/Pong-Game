let readyPlayers = 0;
function listen(io) {

  const pongNamespace = io.of("/pong");
  pongNamespace.on("connection", (socket) => {
    let room;
    console.log("a user connected", socket.id);

    socket.on("ready", () => {
      room = 'room' + Math.floor(readyPlayers / 2)
      socket.join(room);

      console.log("Player ready", socket.id, room);

      readyPlayers++;

      if (readyPlayers % 2 === 0) {
        pongNamespace.in(room).emit("startGame", socket.id);
      }
    });
    socket.on("paddleMoved", (paddleData) => {
      socket.to(room).emit("paddleMoved", paddleData);
    });

    socket.on("ballMoved", (ballData) => {
      socket.to(room).emit("ballMoved", ballData);
    });

    socket.on("disconnect", () => {
      console.log("user ${socket.id} disconnected", socket.id);
      socket.leave(room);
    });
  });
}

module.exports = {listen};
