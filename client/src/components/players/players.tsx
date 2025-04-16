import { UseAppContext } from "../../context/appContext";
import { useUserData } from "../../context/usersData";
import PlayerBoard from "../playerBoard/playerBoard";
import "./player.scss";

const Players = () => {
  const { users, currentUser } = UseAppContext();
  const { datas } = useUserData();
  return (
    <div className="Players">
      {users.map((user) => {
        return (
          user.userName !== currentUser.userName && (
            <>
              <PlayerBoard
                playerName={user.userName}
                userData={
                  datas.filter(
                    (userData) =>
                      userData[user.userName]?.currentUser?.userName ===
                      user.userName
                  )[0]
                }
              />
            </>
          )
        );
      })}
    </div>
  );
};

export default Players;
