import { RemoteUser, User, USER_STATUS } from "./user";

interface AppContext {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  users: RemoteUser[];
  setUsers: (
    users: RemoteUser[] | ((users: RemoteUser[]) => RemoteUser[])
  ) => void;
  status: USER_STATUS;
  setStatus: (status: USER_STATUS) => void;
}

export type { AppContext };
