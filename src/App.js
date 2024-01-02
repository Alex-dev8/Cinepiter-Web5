import "./App.css";
import Row from "./Row";
import Banner from "./Banner";
import requests from "./requests";

function App() {
  return (
    <div className="app">
      <Banner />
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginalMovies} isLargeRow />
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

export default App;
