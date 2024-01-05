import { Link } from "react-router-dom";
import "./Welcome.css";
import Header from "../../components/Header";

function Welcome() {
  return (
    <div>
      <Header />
      <div className="title_container">
        <img
          className="title_logo"
          src={require("./../../assets/title-algorithm.png")}
          alt=""
        />
        <Link to={"/dashboard"}>
          <button className="button">Enter</button>
        </Link>
        <h2 className="text_subtitle">Connect to different movie platforms using a single DID.
        Share your watching preferences with a single like.
        </h2>
      </div>
    </div>
  );
}

export default Welcome;
