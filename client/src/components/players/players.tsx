import { UseAppContext } from "../../context/appContext";
import PlayerBoard from "../playerBoard/playerBoard";
import "./player.scss";

const Players = () => {
  const { users, currentUser } = UseAppContext();
  return (
    <div className="Players">
      {users.map((user) => {
        return (
          user.userName !== currentUser.userName && (
            <>
              <PlayerBoard playerName={user.userName} />
            </>
          )
        );
      })}
    </div>
  );
};

export default Players;
