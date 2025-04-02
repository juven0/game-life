import { ReactNode } from "react";
import { SocketProvider } from "./socketContext";

function AppProvider({ children }: { children: ReactNode }) {
  return <SocketProvider>{children}</SocketProvider>;
}

export default AppProvider;
