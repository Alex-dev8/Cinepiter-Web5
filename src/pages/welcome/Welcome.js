import { Link } from "react-router-dom";
import "./Welcome.css";
import Header from "../../components/Header";

function Welcome() {
  return (
    <div className="welcome_container">
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
        <h2 className="text_subtitle">
          <p>Connect to different movie platforms using a single DID.</p>
          <p>
            Click on movies and TV shows that you like, and watch your algorithm
            learn and grow in real time across multiple platforms.
          </p>
        </h2>
      </div>
    </div>
  );
}

export default Welcome;
