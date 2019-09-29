const dev = process.env.NODE_ENV !== "production";

import dotenv from "dotenv-safe";
if (dev) {
  dotenv.config({ example: "./.env.dev.example" });
} else {
  dotenv.config({ path: "~/snitch.env" });
}

import Koa from "koa";
import Router from "koa-router";
import Static from "koa-static";
import socketIo from "socket.io";
import { createServer } from "http";
import redisAdapter from "socket.io-redis";
import { redisConfig } from "./config";

const { PORT = 8080 } = process.env;

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

if (!dev) {
  io.adapter(redisAdapter(redisConfig));
} else {
  io.adapter(redisAdapter());
}

let seconds = 0;
setInterval(() => {
  io.emit("msg", `${seconds}s`);
  seconds++;
}, 1000);
