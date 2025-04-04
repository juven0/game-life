import { FormEvent, useRef } from "react";
import "./loginForm.scss";
import { useSocket } from "../../context/socketContext";
import { UseAppContext } from "../../context/appContext";
import { USER_STATUS } from "../../types/user";
import { socketEvents } from "../../types/socket";
import { v4 as uuidv4 } from "uuid";

const LoginForm = () => {
  const { socket } = useSocket();
  const { currentUser, setCurrentUser, status, setStatus } = UseAppContext();

  const usernameRef = useRef<HTMLInputElement | null>(null);

  const createNewRoomId = () => {
    setCurrentUser({ ...currentUser, roomId: uuidv4() });
    usernameRef.current?.focus();
  };

  const joinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === USER_STATUS.ATTEMPTING_JOIN) return;
    socket.emit(socketEvents.JOIN_REQUEST, currentUser);
    setStatus(USER_STATUS.ATTEMPTING_JOIN);
  };

  return (
    <form onSubmit={joinRoom} className="form">
      <div className="item-form">
        <label htmlFor="">Room ID</label>
        <input
          type="text"
          value={currentUser.roomId}
          onChange={(e) =>
            setCurrentUser({ ...currentUser, roomId: e.target.value })
          }
        />
      </div>
      <div className="item-form">
        <label htmlFor="">Username</label>
        <input
          type="text"
          value={currentUser.userName}
          ref={usernameRef}
          onChange={(e) =>
            setCurrentUser({ ...currentUser, userName: e.target.value })
          }
        />
      </div>

      <button className="join" type="submit">
        Join Parti
      </button>
      <button onClick={() => createNewRoomId()} className="createRoom">
        Creat Room
      </button>
    </form>
  );
};

export default LoginForm;
