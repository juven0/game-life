import { useEffect } from "react";
import Owner from "../../components/Owner/owner";
import Players from "../../components/players/players";
import { useSocket } from "../../context/socketContext";
import "./main.scss";
import { socketEvents } from "../../types/socket";
import { RemoteUser } from "../../types/user";

const Main = () => {
  const { socket } = useSocket();

  // useEffect(() => {
  //   socket.on(socketEvents.USER_JOINED, ({ user }: { user: RemoteUser }) => {
  //     console.log(user);
  //   });

  //   return () => {
  //     socket.off(socketEvents.USER_JOINED);
  //   };
  // }, [socket]);

  return (
    <div className="main">
      <div className="content">
        <div className="part">
          <Owner />
        </div>
        <div className="part">
          <Players />
        </div>
      </div>
    </div>
  );
};

export default Main;
