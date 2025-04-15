import { ReactNode } from "react";
import { SocketProvider } from "./socketContext";
import { AppContextProvider } from "./appContext";
import { UserDataProvider } from "./usersData";

function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AppContextProvider>
      <UserDataProvider>
        <SocketProvider>{children}</SocketProvider>
      </UserDataProvider>
    </AppContextProvider>
  );
}

export default AppProvider;
