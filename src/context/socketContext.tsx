import { createContext, ReactNode, useContext, useMemo } from "react";
import { socketContext as socketContextType } from "../types/context";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<socketContextType | null>(null);

export const useSocket = (): socketContextType => {
  const socket = useContext(SocketContext);

  if (!socket) {
    throw new Error("useSocket must be used within socketProvider");
  }

  return socket;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket: Socket = useMemo(
    () =>
      io(BACKEND_URL, {
        reconnectionAttempts: 2,
      }),
    []
  );

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
export default SocketContext;
