import React, { useState, useEffect, useContext } from "react";
import axios from "../../axios";
import "./DestinyRow.css";
import { CinepiterContext } from "../../context/CinepiterContext";

function Row({ title, fetchUrl, recommended = false }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const { favourites, updateFavourites, recommendedMovies } =
    useContext(CinepiterContext);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }

    if (!recommended) {
      fetchData();
    } else {
      setMovies(recommendedMovies);
    }
  }, [fetchUrl, recommended, recommendedMovies]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <div
            className="poster"
            key={movie.id}
            onClick={() => updateFavourites(movie)}
          >
            {favourites.some((fav) => fav.id === movie.id) ? (
              <img
                src={require("../../assets/thunder-green.png")}
                alt=""
                className="overlay"
              />
            ) : (
              <img
                src={require("../../assets/thunder-black.png")}
                alt=""
                className="overlay"
              />
            )}
            <img
              key={movie.id}
              className="destiny_row_poster"
              src={`${BASE_URL}${movie.poster_path}`}
              alt={movie.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
