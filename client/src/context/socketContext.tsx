import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  socketContext as socketContextType,
  socketEvents,
} from "../types/socket";
import { io, Socket } from "socket.io-client";
import { RemoteUser, User, USER_STATUS } from "../types/user";
import { UseAppContext } from "./appContext";

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
  const { setCurrentUser, setUsers, setStatus } = UseAppContext();

  const handelJoinAccept = useCallback(
    ({ user, users }: { user: User; users: RemoteUser[] }) => {
      setCurrentUser(user);
      setUsers(users);
      setStatus(USER_STATUS.JOINED);
    },
    [setCurrentUser, setUsers, setStatus]
  );

  const socket: Socket = useMemo(
    () =>
      io(BACKEND_URL, {
        reconnectionAttempts: 2,
      }),
    []
  );

  useEffect(() => {
    socket.on(socketEvents.USER_JOINED, handelJoinAccept);
    return () => {
      socket.off(socketEvents.USER_JOINED);
    };
  }, [handelJoinAccept, socket, setUsers]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
export default SocketContext;
