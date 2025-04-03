import { ReactNode } from "react";
import { SocketProvider } from "./socketContext";
import { AppContextProvider } from "./appContext";

function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AppContextProvider>
      <SocketProvider>{children}</SocketProvider>
    </AppContextProvider>
  );
}

export default AppProvider;
