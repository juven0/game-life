import "./login.scss";
import logo from "../../assets/image/gamelife.png";
import LoginForm from "../../components/loginForm/loginForm";

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
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
