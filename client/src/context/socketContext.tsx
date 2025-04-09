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
import toast from "react-hot-toast";

const SocketContext = createContext<socketContextType | null>(null);

export const useSocket = (): socketContextType => {
  const socket = useContext(SocketContext);

  if (!socket) {
    throw new Error("useSocket must be used within socketProvider");
  }

  return socket;
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:1212";

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { setCurrentUser, setUsers, setStatus, users } = UseAppContext();

  const handelJoinAccept = useCallback(
    ({ user, users }: { user: User; users: RemoteUser[] }) => {
      setCurrentUser(user);
      setUsers(users);
      toast.dismiss();
      setStatus(USER_STATUS.JOINED);
    },
    [setCurrentUser, setUsers, setStatus]
  );

  const handelJoined = useCallback(
    ({ user }: { user: RemoteUser }) => {
      console.log(user);
      setUsers([...users, user]);
    },
    [setUsers, users]
  );

  const socket: Socket = useMemo(
    () =>
      io(BACKEND_URL, {
        reconnectionAttempts: 2,
      }),
    []
  );

  useEffect(() => {
    socket.on(socketEvents.JOIN_ACCEPTED, handelJoinAccept);
    socket.on(socketEvents.USER_JOINED, handelJoined);
    return () => {
      socket.off(socketEvents.JOIN_ACCEPTED);
      socket.off(socketEvents.USER_JOINED);
    };
  }, [handelJoinAccept, handelJoined, socket, setUsers]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
export default SocketContext;
