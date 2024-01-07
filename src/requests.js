// const API_KEY = "244a113125e647916bf34cd8d40292b5";

const requests = {
  fetchPopularMovies: "/movie/popular",
  fetchTopRatedMovies: "/movie/top_rated",
  fetchTrendingMovies: "/trending/all/week?language=en-US",
  fetchNetflixOriginalMovies: "/discover/tv?language=en-US",
  fetchActionMovies: "/discover/movie?with_genres=28",
  fetchComedyMovies: "/discover/movie?with_genres=35",
  fetchHorrorMovies: "/discover/movie?with_genres=27",
  fetchRomanceMovies: "/discover/movie?with_genres=10749",
  fetchDocumentaries: "/discover/movie?with_genres=99",
  fetchSimilarMovies: (movie_id) => {
    return `/movie/${movie_id}/similar`;
  },
  fetchMovieGenres: "/genre/movie/list",
  fetchTvGenres: "/genre/tv/list"
};

export default requests;
