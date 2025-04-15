import { position } from "../utils/algo";
import { RemoteUser } from "./user";

type userData = {
  userPopulation: position[];
  currentUser: RemoteUser;
};

interface usersDataConctext {
  datas: userData[];
  setDatas: (datas: userData[] | ((datas: userData[]) => userData[])) => void;
}

export type { userData, usersDataConctext };
