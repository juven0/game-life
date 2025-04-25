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
import { useUserData } from "./usersData";
import { userData } from "../types/userDataContext";
import { GAME_STATUS } from "../types/game";

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
  const { setCurrentUser, setUsers, setStatus, users, setGameState } =
    UseAppContext();
  const { datas, setDatas } = useUserData();

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

  const setUserReady = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (userReadyData: any) => {
      try {
        const parsedData: userData =
          typeof userReadyData === "string"
            ? JSON.parse(userReadyData)
            : userReadyData;
        setDatas([...datas, parsedData]);
      } catch (err) {
        console.error("Erreur de parsing de l'event userReadyData :", err);
      }
    },
    [datas, setDatas]
  );

  const setGameStart = useCallback(() => {
    setGameState({ status: GAME_STATUS.STARTED });
  }, [setGameState]);

  useEffect(() => {
    socket.on(socketEvents.JOIN_ACCEPTED, handelJoinAccept);
    socket.on(socketEvents.USER_JOINED, handelJoined);
    socket.on(socketEvents.USER_READY, setUserReady);
    socket.on(socketEvents.GAME_START, setGameStart);
    return () => {
      socket.off(socketEvents.JOIN_ACCEPTED);
      socket.off(socketEvents.USER_JOINED);
      socket.off(socketEvents.USER_READY);
      socket.off(socketEvents.GAME_START);
    };
  }, [
    handelJoinAccept,
    handelJoined,
    socket,
    setUsers,
    setUserReady,
    setGameStart,
  ]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider };
export default SocketContext;
