class Movie {
  recordId;
  id;
  title;

  constructor(jsonObj = {}) {
    this.recordId = jsonObj.recordId || "";
    this.id = jsonObj.id || "";
    this.title = jsonObj.title || "";
  }
}

export { Movie };
