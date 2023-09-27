import net from "node:net";

export default class PortFinder {
  static async fport(
    f_port: number = Number(process.env.DEFAULT_PORT) ?? 3000,
  ) {
    return new Promise((re, rej) => {
      const server = net.createServer();

      server.listen(f_port, () => {
        const { port } = server.address() as net.AddressInfo;
        server.close(() => {
          re(port);
        });
      });

      server.on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
          console.error(err + `Port ${f_port} is in use, trying ${f_port + 1} instead.`);
          this.fport(f_port + 1).then((port) => re(port));
        } else rej(err);
      });
    });
  }
}
