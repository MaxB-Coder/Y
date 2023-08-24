import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import main from "./src/db/main.js";

dotenv.config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ``}`,
});

import { peeps } from "./src/routes/peeps.route.js";
import { login } from "./src/routes/login.route.js";
import { signUp } from "./src/routes/sign-up.route.js";

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const app = express();

main().catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/", peeps);
app.use("/login", login);
app.use("/sign-up", signUp);

const server = app.listen(PORT, HOST, () => {
  const SERVERHOST = server.address().address;
  const SERVERPORT = server.address().port;
  console.log(`Server is listening at http://${SERVERHOST}:${SERVERPORT}`);
});

export default server;
