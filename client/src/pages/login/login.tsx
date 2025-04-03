import "./login.scss";
import logo from "../../assets/image/gamelife.png";

const Login = () => {
  return (
    <div className="Login">
      <div className="leftSide">
        <div className="logo">
          <img src={logo} alt="logo" />
          <p>Game Life</p>
        </div>
        <div className="text">
          <p>
            Welcome to the fascinating world of cellular automata, where each
            cell follows simple rules to create astonishingly complex patterns!
          </p>
        </div>
      </div>

      <div className="rightSide">
        <div className="form">
          <div className="item-form">
            <label htmlFor="">Username</label>
            <input type="text" name="" id="" />
          </div>
          <div className="item-form">
            <label htmlFor="">Room ID</label>
            <input type="text" name="" id="" />
          </div>
          <button>Join Parti</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
