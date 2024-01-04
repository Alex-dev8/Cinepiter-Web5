import "./App.css";
import Row from "./Row";
import Banner from "./Banner";
import requests from "./requests";
import { useEffect, useContext } from "react";
import { Web5 } from "@tbd54566975/web5";
import { CinepiterContext } from "./context/CinepiterContext";

function App() {
  // const user = useSelector((state) => state.user);
  const { user } = useContext(CinepiterContext)

  // useEffect(() => {
  //   const initWeb5 = async () => {
  //     const { web5, did } = await Web5.connect();
  //     dispatch(createDid({ web5, did }));
  //   };
  //   initWeb5();
  // }, [dispatch]);

  useEffect(() => {
    // if (user) {
    //   const createRecord = async () => {
    //     const { record } = await user.web5.dwn.records.create({
    //       data: "Testing",
    //       message: {
    //         dataFormat: "text/plain",
    //       },
    //     });
    //     const results = await record.data.text();
    //     console.log({ results });
    //   };
    //   createRecord();
    // }
    console.log({ user })
  }, [user]);

  return (
    <div className="app">
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
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

export default App;
