export default (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
        //payload = movie data
      };
    case "REMOVE_MOVIE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload
        ),
        //this filters through the array and returns all the movies that are not equal to the id we just passed it (removes that id from the state)
      };
    case "ADD_MOVIE_TO_WATCHED":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload.id
        ),
        watched: [action.payload, ...state.watched],
        //first we remove it from the watchlist, then add it to watched
      };
    case "MOVE_TO_WATCHLIST":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.id !== action.payload.id
        ),
        watchlist: [action.payload, ...state.watchlist],
        //first we remove it from watched, then add it to watchlist
        //the reason we use action.payload.id here is because we're passing the whole movie, so we need to access the id from the whole movie
      };
    case "REMOVE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter((movie) => movie.id !== action.payload),
        //this filters through the array and returns all the movies that are not equal to the id we just passed it (removes that id from the state)
        //since we are passing the id here we only need to use action.payload
      };
    default:
      return state;
  }
};

//A reducer is basically a function that returns some state data
//It describes how your state is transferred into the next state
//It tells our store what to do with the data when something has happened

//An action is basically an object that tells the reducer how to change the state
