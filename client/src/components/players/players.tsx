import { UseAppContext } from "../../context/appContext";
import "./player.scss";

const Players = () => {
  const { users } = UseAppContext();
  return (
    <div className="Players">
      {users.map((user) => {
        return (
          <>
            <h1>{user.userName}</h1>
          </>
        );
      })}
    </div>
  );
};

export default Players;
