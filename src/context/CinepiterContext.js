import { createContext, useEffect, useState } from "react";
import { Web5 } from "@tbd54566975/web5";
import { Movie } from "../models/Movie";
import requests from "../requests";
import axios from "./../axios";

export const CinepiterContext = createContext();

export const CinepiterProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [web5, setWeb5] = useState();
  const [favourites, setFavourites] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [favouriteGenreNames, setFavouriteGenreNames] = useState([]);
  const [algorithmStats, setAlgorithmStats] = useState([]);

  useEffect(() => {
    const initWeb5 = async () => {
      const { web5, did } = await Web5.connect();
      try {
        setWeb5(web5);
        setUser(did);
      } catch (err) {
        console.error("error starting did", err);
      }
    };
    initWeb5();
    fetchAllGenres();
  }, []);

  useEffect(() => {
    if (user && web5) {
      loadFavourites();
    }
  }, [user, web5]);

  useEffect(() => {
    if (favourites.length > 0 && allGenres.length > 0) {
      getFavouriteGenres();
    }
  }, [favourites, allGenres]);

  useEffect(() => {
    if (favouriteGenreNames.length > 0) {
      statisticsAlgorithm();
    }
  }, [favouriteGenreNames]);

  async function loadFavourites() {
    const { records } = await web5.dwn.records.query({
      message: {
        filter: {
          schema: "http://some-schema-registry.org/favourites",
        },
      },
    });
    let _favourites = [];

    for (let record of records) {
      const data = await record.data.json();
      const fav = new Movie({
        recordId: record.id,
        id: data.id,
        title: data.title,
        genres: data.genres,
      });
      _favourites.push(fav);
    }
    setFavourites(_favourites);
  }

  async function updateFavourites(movie) {
    const isFavourite = favourites.some((fav) => fav.id === movie.id);
    if (isFavourite) {
      removeFavourite(movie);
    } else {
      saveFavourite(movie);
    }
  }

  async function saveFavourite(movie) {
    const { id, original_title: title, genre_ids: genres } = movie;
    const movieData = {
      id,
      title,
      genres,
    };
    await web5.dwn.records.create({
      data: movieData,
      message: {
        schema: "http://some-schema-registry.org/favourites",
        dataFormat: "application/json",
      },
    });
    loadFavourites();
  }

  async function removeFavourite(movie) {
    const index = favourites.findIndex((fav) => fav.id === movie.id);
    const movieToDelete = favourites[index];
    await web5.dwn.records.delete({
      message: {
        recordId: movieToDelete.recordId,
      },
    });
    loadFavourites();
  }

  async function fetchAllGenres() {
    try {
      const movieGenres = await axios.get(requests.fetchMovieGenres);
      const tvGenres = await axios.get(requests.fetchTvGenres);
      const _movieGenres = movieGenres.data.genres;
      const _tvGenres = tvGenres.data.genres;
      const genreArray = [..._movieGenres, ..._tvGenres];
      setAllGenres(genreArray);
    } catch (err) {
      console.error("Error fetching genres", err);
    }
  }

  async function getFavouriteGenres() {
    const favNames = [];
    const genreIds = favourites.map((movie) => movie.genres).flat();

    const matchingGenres = genreIds.map((genre) => {
      return allGenres.find((item) => item.id === genre);
    });
    matchingGenres.forEach((genre) => {
      favNames.push(genre.name);
    });
    setFavouriteGenreNames(favNames);
  }

  function statisticsAlgorithm() {
    const genreArray = [];
    const genreCounts = {};
    favouriteGenreNames.forEach((genre) => {
      if (genreCounts[genre]) {
        genreCounts[genre] += 1;
      } else {
        genreCounts[genre] = 1;
      }
    });

    for (const genre in genreCounts) {
      genreArray.push({
        genre: genre,
        count: genreCounts[genre],
      });
    }

    setAlgorithmStats(genreArray);
  }

  const value = { user, favourites, updateFavourites, algorithmStats };
  return (
    <CinepiterContext.Provider value={value}>
      {children}
    </CinepiterContext.Provider>
  );
};
