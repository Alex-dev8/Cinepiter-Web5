class Movie {
  recordId;
  id;
  title;
  genres;

  constructor(jsonObj = {}) {
    this.recordId = jsonObj.recordId || "";
    this.id = jsonObj.id || "";
    this.title = jsonObj.title || "";
    this.genres = jsonObj.genres || [];
  }
}

export { Movie };
