import { createContext, ReactNode, useContext, useState } from "react";
import { AppContext as AppContextType } from "../types/app";
import { RemoteUser, User, USER_STATUS } from "../types/user";

const AppContext = createContext<AppContextType | null>(null);

export const UseAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useSocket must be used within socketProvider");
  }

  return context;
};

function AppContextProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>({
    roomId: "",
    userName: "",
  });

  const [users, setUsers] = useState<RemoteUser[]>([]);

  const [status, setStatus] = useState<USER_STATUS>(USER_STATUS.INITIAL);
  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        setUsers,
        status,
        setStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider };
export default AppContext;
