import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// initial state (initial value of the store)
//Start by checking if there is something in localStorage, if there is parse it back into an array and return it, else return an empty array
const initialState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components (a component that allows us to provide the GlobalContext to other components so they can access it)
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //The useEffect will be triggered whenever the state is changed inside of the provider (e.g. when a movie is added to our watchlist)
  //localStorage has to be a string, JSON.stringify converts our watchlist array into a string and stores it in localstorage as "watchlist"
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  // ACTIONS

  //when we click "add to watchlist" we use an action to tell the provider what to do once we've clicked the button
  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  // action to remove a movie from the watchlist
  const removeMovieFromWatchlist = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };

  // action to move a movie from watchlist to watched
  const addMovieToWatched = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  };

  // action to move from watched to watchlist
  const moveToWatchlist = (movie) => {
    dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
  };

  // action to remove from watched (when we remove we only need to pass the id)
  const removeFromWatched = (id) => {
    dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
  };

  return (
    //The global provider will wrap all the children on the application so we can access the GlobalContext from every component
    //value = the values that are available from the provider
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
        addMovieToWatched,
        moveToWatchlist,
        removeFromWatched,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

//This is basically a store that stores all of our state data
//The store holds the object that holds the applications state data
