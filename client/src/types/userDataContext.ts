import { position } from "../utils/algo";
import { RemoteUser } from "./user";

type userData = {
  [username: string]: {
    userPopulation: position[];
    currentUser: RemoteUser;
  };
};

interface usersDataConctext {
  datas: userData[];
  setDatas: (datas: userData[] | ((datas: userData[]) => userData[])) => void;
}

export type { userData, usersDataConctext };
