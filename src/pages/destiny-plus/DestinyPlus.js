import "./DestinyPlus.css";
import Row from "../../components/destiny-plus/Row";
import requests from "../../requests";
import { CinepiterContext } from "../../context/CinepiterContext";
import { useContext } from "react";

function DestinyPlus() {
  const { recommendedMovies } = useContext(CinepiterContext);

  return (
    <div className="destiny_container">
      <div className="destiny_header_container">
        <img
          src={require("../../assets/destiny-plus.png")}
          alt=""
          className="destiny_header"
        />
      </div>
      <div className="destiny_row_container">
        {recommendedMovies.length && (
          <Row title="RECOMMENDED FOR YOU" recommended />
        )}
        <Row title="ANIMATIONS" fetchUrl={requests.fetchAnimations} />
        <Row title="FAMILY" fetchUrl={requests.fetchFamily} />
        <Row title="FANTASY" fetchUrl={requests.fetchFantasy} />
        <Row title="MUSICALS" fetchUrl={requests.fetchMusic} />
        <Row title="KIDS TV" fetchUrl={requests.fetchKidsTV} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      </div>
    </div>
  );
}

export default DestinyPlus;
