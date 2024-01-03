import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import { IoFlash, IoFlashOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { updateFavourites } from "./redux/favouritesSlice";
import { useSelector } from "react-redux";

function Row({ title, fetchUrl }) {
  const favourites = useSelector((state) => state.favourites);
  const dispatch = useDispatch();
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);

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
            onClick={() => dispatch(updateFavourites(movie.id))}
          >
            {favourites.includes(movie.id) ? (
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
