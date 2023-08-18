import dotenv from "dotenv";
import http from "node:http";
import PortFinder from "./utils/portFinder";

dotenv.config();

const main = async () => {
  const server = http.createServer((req, res) => {
    console.log("request received");
    res.end("Hello World");
  });

  PortFinder.fport().then((port) => {
    server.listen(port, () => console.log(`Server listening on port ${port}`));
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
