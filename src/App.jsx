import React, { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./SearchIcon.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=ecc27a69";

document.title = "MovieLand";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);

    const returnedData = await response.json();

    setMovies(returnedData.Search);

    window.history.replaceState(null, "", `/MovieLand?search=${title}`);
    localStorage.setItem("lastSearch", title);
  };

  const lastSearch = localStorage.getItem("lastSearch");

  useEffect(() => {
    if (lastSearch) {
      searchMovies(lastSearch);
    }
  }, []);

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleEnterPress}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
