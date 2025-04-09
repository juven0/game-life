import Owner from "../../components/Owner/owner";
import Players from "../../components/players/players";
import "./main.scss";

const Main = () => {
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
