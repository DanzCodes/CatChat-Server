import app from "./app";
import dotenv from "dotenv";
import PortFinder from "./utils/portFinder";
import { Server as SocketServer } from "socket.io";
import { createServer } from "http";
import socketEvents from "./events/sockets";
import database from "./db";

dotenv.config();

const main = async () => {
  const server = createServer(app);
  const io = new SocketServer(server, {
    cors: { origin: "http://localhost:3001" },
  });

  socketEvents(io);

  database().then(() => {
    PortFinder.fport().then((port) => {
      server.listen(port, () =>
        console.log(`Server listening on port ${port}`)
      );
    });
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
