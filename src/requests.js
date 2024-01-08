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
  fetchMovieGenres: "/genre/movie/list",
  fetchTvGenres: "/genre/tv/list",
  fetchRecommendedMovies: (movie_id) => {
    return `/movie/${movie_id}/recommendations`;
  },
  fetchAnimations: "/discover/movie?with_genres=16",
  fetchFamily: "/discover/movie?with_genres=10751",
  fetchFantasy: "/discover/movie?with_genres=14",
  fetchMusic: "/discover/movie?with_genres=10402",
  fetchKidsTV: "/discover/tv?with_genres=10762"
};

export default requests;
