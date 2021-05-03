import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const MovieControls = ({ movie, type }) => {
  const {
    removeMovieFromWatchlist,
    addMovieToWatched,
    moveToWatchlist,
    removeFromWatched,
  } = useContext(GlobalContext);
  return (
    <div className="inner-card-controls">
      {type === "watchlist" && (
        <>
          <button
            className="control-button"
            onClick={() => addMovieToWatched(movie)}
          >
            Watched
          </button>
          <button
            className="control-button"
            onClick={() => removeMovieFromWatchlist(movie.id)}
          >
            Delete
          </button>
        </>
      )}
      {type === "watched" && (
        <>
          <button
            className="control-button"
            onClick={() => moveToWatchlist(movie)}
          >
            Move to Watchlist
          </button>
          <button
            className="control-button"
            onClick={() => removeFromWatched(movie.id)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};
