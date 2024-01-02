import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDRhMTEzMTI1ZTY0NzkxNmJmMzRjZDhkNDAyOTJiNSIsInN1YiI6IjY1MGJkM2Q3M2Q3NDU0MDBlMTIzN2JhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f4jOiEvrymFTrkj8731Gd7EEpkzuHv8r_CZM-IjEaSE",
  },
});

export default instance;
