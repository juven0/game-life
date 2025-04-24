import { position } from "../utils/algo";
import { Game } from "./game";
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
  userPopulation: position[];
  setUserPopulation: (
    userPopulation: position[] | ((userPopulation: position[]) => position[])
  ) => void;
  gameState: Game;
  setGameState: (gameState: Game | ((gameState: Game) => Game)) => void;
}

export type { AppContext };
