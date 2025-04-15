import { createContext, ReactNode, useContext, useState } from "react";
import {
  userData,
  usersDataConctext as usersDataConctexType,
} from "../types/userDataContext";

const UserDataContext = createContext<usersDataConctexType | null>(null);

export const useUserData = (): usersDataConctexType => {
  const userData = useContext(UserDataContext);

  if (!userData)
    throw new Error("useUserData must be used within socketProvider");

  return userData;
};

function UserDataProvider({ children }: { children: ReactNode }) {
  const [datas, setDatas] = useState<userData[]>([]);
  return (
    <UserDataContext.Provider value={{ datas, setDatas }}>
      {children}
    </UserDataContext.Provider>
  );
}

export { UserDataProvider };
export default UserDataContext;
