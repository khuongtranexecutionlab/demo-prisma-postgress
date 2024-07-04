import { useEffect, useRef } from "react";
import io, { ManagerOptions, Socket, SocketOptions } from "socket.io-client";
import { type User } from 'next-auth'

export const useSocket = (
    url: string,
    options?: Partial<ManagerOptions & SocketOptions> | undefined,
    author?: User
): Socket => {
    const { current: socket } = useRef(io(url, options));

    useEffect(() => {
        (async () => {
            socket.connect();
        })();

        if (author) {
            socket.connect();
        }

        return () => {
            if (socket.connected) {
                socket.close();
            }
        };
    }, [socket, author]);

    return socket;
};