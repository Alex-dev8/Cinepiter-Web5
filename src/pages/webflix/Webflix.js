import "./Webflix.css";
import Row from "../../components/webflix/Row";
import requests from "../../requests";
import { CinepiterContext } from "../../context/CinepiterContext";
import { useContext } from "react";

function Webflix() {
  const { recommendedMovies } = useContext(CinepiterContext);

  return (
    <div className="webflix_container">
      <div className="webflix_header_container">
        <img
          src={require("../../assets/webflix-logo.png")}
          alt=""
          className="webflix_header"
        />
      </div>
      {recommendedMovies.length && (
        <Row title="RECOMMENDED FOR YOU" recommended />
      )}
      <Row
        title="WEBFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginalMovies}
      />
      <Row title="Popular Movies" fetchUrl={requests.fetchPopularMovies} />
      <Row title="Top Rated Movies" fetchUrl={requests.fetchTopRatedMovies} />
      <Row title="Trending Movies" fetchUrl={requests.fetchTrendingMovies} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default Webflix;
