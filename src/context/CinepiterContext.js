import { createContext, useEffect, useState } from "react";
import { Web5 } from "@tbd54566975/web5";
import { Movie } from "../models/Movie";

export const CinepiterContext = createContext();

export const CinepiterProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [web5, setWeb5] = useState();
  const [favourites, setFavourites] = useState([]);

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
  }, []);

  useEffect(() => {
    if (user && web5) {
      loadFavourites();
    }
  }, [user, web5]);

  useEffect(() => {
    console.log({ favourites });
  }, [favourites]);

  async function loadFavourites() {
    const { records } = await web5.dwn.records.query({
      message: {
        filter: {
          schema: "http://some-schema-registry.org/favourites",
        },
      },
    });
    const _favourites = [];

    for (let record of records) {
      const data = await record.data.json();
      const fav = new Movie({
        recordId: record.id,
        id: data.id,
        title: data.name,
      });
      _favourites.push(fav);
    }
    console.log({ _favourites });
    setFavourites(_favourites);
  }

  async function updateFavourites(movie) {
    const isFavourite = favourites.some((fav) => fav.id === movie.id);
    if (isFavourite) {
      console.log("already favourite");
      removeFavourite(movie);
    } else {
      console.log("not fav yet");
      saveFavourite(movie);
    }
  }

  async function saveFavourite(movie) {
    const { id, original_title: name } = movie;
    const movieData = {
      id,
      name,
    };
    console.log({ movieData });
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

  const value = { user, favourites, updateFavourites };
  return (
    <CinepiterContext.Provider value={value}>
      {children}
    </CinepiterContext.Provider>
  );
};
