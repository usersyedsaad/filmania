"use client";
import React, { useEffect, useState } from "react";
import Styles from "./App.module.css";

const API_URL = "http://www.omdbapi.com/?apikey=d245818b";

// Define Movie Type
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const App: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (!searchText) return; // Prevent unnecessary API calls

    const getData = async () => {
      try {
        const response = await fetch(`${API_URL}&s=${searchText}`);
        const data = await response.json();

        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]); // Clear movies if no results
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getData();
  }, [searchText]);

  return (
    <div className={Styles.App}>
      <h1>Filmedia</h1>
      <div className={Styles.search_container}>
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => setSearchText(input)}>Search</button>
      </div>
      <div className={Styles.movies_container}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className={Styles.movie}>
              <div className={Styles.img_div}>
                {movie.Poster === "N/A" ? (
                  <img
                    src="https://via.placeholder.com/150"
                    alt="No Image Found"
                  />
                ) : (
                  <img
                    src={movie.Poster || "https://via.placeholder.com/150"}
                    alt={movie.Title}
                    className={Styles.img}
                  />
                )}
              </div>

              <p>
                {movie.Title} <br /> ({movie.Year})
              </p>
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default App;
