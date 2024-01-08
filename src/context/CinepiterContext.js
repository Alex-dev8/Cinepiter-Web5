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
  const [recommendedMovies, setRecommendedMovies] = useState([]);

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

  useEffect(() => {
    if (algorithmStats.length > 0) {
      getRecommendedMovies();
    }
  }, [algorithmStats]);

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
    const { id, title, genre_ids: genres } = movie;
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
      const uniqueArray = genreArray.filter(
        (value, index, self) =>
          self.findIndex((obj) => obj.id === value.id) === index
      );
      setAllGenres(uniqueArray);
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

  function shuffleMovies(movies) {
    for (let i = movies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [movies[i], movies[j]] = [movies[j], movies[i]];
    }
  }

  async function getRecommendedMovies() {
    const sortedGenres = algorithmStats.sort((a, b) => b.count - a.count);
    const topGenres = sortedGenres.slice(0, 5);
    const _topGenres = topGenres
      .map((topGenre) =>
        allGenres.find((genre) => genre.name === topGenre.genre)
      )
      .filter((genre) => genre)
      .map((genre) => genre.id);
    const filteredFavorites = favourites.filter((favourite) =>
      favourite.genres.every((genreId) => _topGenres.includes(genreId))
    );
    let _recommendedMovies = [];
    await Promise.all(
      filteredFavorites.map(async (favourite) => {
        const id = favourite.id.toString();
        try {
          const response = await axios.get(requests.fetchRecommendedMovies(id));
          const data = response.data.results;
          if (data.length > 0) {
            _recommendedMovies = _recommendedMovies.concat(data);
          }
        } catch (err) {
          console.log(err);
        }
      })
    );
    const recommendedWithoutDuplicates = removeDuplicates(_recommendedMovies);
    shuffleMovies(recommendedWithoutDuplicates);
    const randomRecommendedMovies = recommendedWithoutDuplicates.splice(0, 25);
    setRecommendedMovies(randomRecommendedMovies);
  }

  function removeDuplicates(array) {
    const uniqueIds = new Set();
    return array.filter((obj) => {
      if (!uniqueIds.has(obj.id)) {
        uniqueIds.add(obj.id);
        return true;
      }
      return false;
    });
  }

  const value = {
    user,
    favourites,
    updateFavourites,
    algorithmStats,
    allGenres,
    recommendedMovies,
    getRecommendedMovies,
  };
  return (
    <CinepiterContext.Provider value={value}>
      {children}
    </CinepiterContext.Provider>
  );
};
