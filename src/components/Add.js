import React, { useState } from "react";
import { ResultCard } from "./ResultCard";

export const Add = () => {
  //STATE
  //A query string that's going to be the value of our input, the initial state is an empty string:
  const [query, setQuery] = useState("");
  //A state to store the API results, the initial state value is an empty array since we want to return an array of results:
  const [results, setResults] = useState([]);

  //FUNCTIONS
  const onChange = (e) => {
    e.preventDefault();

    setQuery(e.target.value); //We set the state equal to the value that's typed in the input

    //Every time we type in the input field we want to fetch movies from the API
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=f800e5b690dde892553c0758c7c9b9f6&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      });
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={onChange}
            />
          </div>
          {results.length > 0 && (
            <ul className="results">
              {results.map((movie) => (
                <li key={movie.id}>
                  <ResultCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
