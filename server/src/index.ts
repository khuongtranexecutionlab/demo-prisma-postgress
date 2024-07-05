import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoute";
import orderRoutes from "./routes/orderRoute";
import crawRoutes from "./routes/crawRoute";
import cookieParser from "cookie-parser";

import cors from "cors";
import * as http from "http";
import { Websocket } from "./utils/Websocket";

dotenv.config();

const app = express();

const server = http.createServer(app);
Websocket.init(server);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

const port = 9090;

app.get("/", (req, res) => {
  res.send("Server Is Ready!");
});

app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/craw", crawRoutes);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
