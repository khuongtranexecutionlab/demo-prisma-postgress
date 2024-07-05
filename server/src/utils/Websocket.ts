import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import http from "http";

interface ISocketUser {
  uid: string;
  room: string;
}

function parseCookies(request: string) {
  const list: { [key: string]: string } = {};
  const cookieHeader = request;
  if (!cookieHeader) return list;

  cookieHeader.split(";").forEach(function (cookie) {
    let [name, ...rest] = cookie.split("=");
    name = name?.trim();
    if (!name) return;
    const value = rest.join("=").trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });
  return list;
}

export class Websocket extends Server {
  private static io: Websocket;
  private static users: Array<ISocketUser> = [];

  public static init(httpServer: http.Server): void {
    this.io = new Websocket(httpServer, {
      cors: {
        origin: true,
        credentials: true,
      },
    });
    this.applyMiddlewares();
    this.eventListeners();
  }

  private static eventListeners(): void {
    this.io.on("connection", (socket) => {
      socket.on("joinRoom", (id) => {
        const user = { uid: socket.id, room: id };
        const isExisted = this.users.some((u) => u.uid === user.uid);
        if (!isExisted) {
          this.users.push(user);
          socket.join(user.room);
        }
        console.log("connection", this.users);
      });

      socket.on("disconnect", () => {
        this.users = this.users.filter((u) => u.uid !== socket.id);
        console.log("disconnection", this.users);
      });
    });
  }

  private static applyMiddlewares() {
    this.io.use(function (socket: any, next) {
      if (socket.request.headers.cookie) {
        const cookies: { [key: string]: string } = parseCookies(
          socket.request.headers.cookie,
        );
        if (cookies["authjs.session-token"]) {
          jwt.verify(
            cookies["authjs.session-token"],
            `${process.env.AUTH_SECRET}`,
            function (err, decoded) {
              if (err) return next(new Error("Authentication error"));
              socket.user = (decoded as any).user;
              next();
            },
          );
        } else {
          next(new Error("Authentication error"));
        }
      } else {
        next(new Error("Authentication error"));
      }
    });
  }

  public static getInstance(): Websocket {
    return this.io;
  }

  public static getUsers(): Array<ISocketUser> {
    return this.users;
  }
}
