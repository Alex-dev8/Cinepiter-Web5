import React, { useState, useEffect, useContext } from "react";
import axios from "./axios";
import "./Row.css";
import { IoFlash, IoFlashOutline } from "react-icons/io5";
import { CinepiterContext } from "./context/CinepiterContext";

function Row({ title, fetchUrl }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const { favourites, updateFavourites } = useContext(CinepiterContext);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

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
              <IoFlash className="overlay" />
            ) : (
              <IoFlashOutline className="overlay" />
            )}
            <img
              key={movie.id}
              className="row_poster"
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
