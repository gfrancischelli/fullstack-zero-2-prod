import Koa from "koa";
import Router from "koa-router";
import Static from "koa-static";
import socketIo from "socket.io";
import { createServer } from "http";
// import redisAdapter from "socket.io-redis";

const { PORT = 8080 } = process.env;

const dev = process.env.NODE_ENV !== "production";

const koa = new Koa();
const router = new Router();

router.get("/graphql", ctx => (ctx.response.body = "hello world"));

if (!dev) koa.use(Static("../web/build"));

koa.use(router.routes());

const server = createServer(koa.callback());

server.listen(Number(PORT), () =>
  console.log(`Running on http://localhost:${PORT}`)
);

const io = socketIo(server);
// io.adapter(redisAdapter({ host: "localhost", port: 6379 }));

let seconds = 0;
setInterval(() => {
  io.emit("msg", `${seconds}s`);
  seconds++;
}, 1000);
