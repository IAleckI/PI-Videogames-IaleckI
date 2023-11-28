import {
  GET_VIDEOGAMES,
  GET_DETAIL,
  GET_GENRES,
  GET_VIDEOGAMES_ASCEND_NAME,
  GET_VIDEOGAMES_BY_RATING,
  GET_API_VIDEOGAMES,
  GET_DB_VIDEOGAMES,
  FILTER_BY_GENRES,
} from "./Actions";

let initialState = {
  getVideogames: [],
  getDetail: [],
  getGenres: [],
  sortedGamesOrder: "",
  sortedRatingOrder: "",
  getDBVideogames: [],
  getAPIVideogames: [],
  filterByGenres: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        getVideogames: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        getDetail: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        getGenres: action.payload,
      };
    case GET_VIDEOGAMES_ASCEND_NAME:
      return {
        ...state,
        getVideogames: action.payload.getVideogames,
        getDBVideogames: action.payload.getDBVideogames,
        getAPIVideogames: action.payload.getAPIVideogames,
        sortedGamesOrder: state.sortedGamesOrder === "asc" ? "desc" : "asc",
      };
    case GET_VIDEOGAMES_BY_RATING:
      return {
        ...state,
        getVideogames: action.payload.getVideogames,
        getDBVideogames: action.payload.getDBVideogames,
        getAPIVideogames: action.payload.getAPIVideogames,
        sortedRatingOrder: state.sortedRatingOrder === "asc" ? "desc" : "asc",
      };
    case GET_DB_VIDEOGAMES:
      return {
        ...state,
        getDBVideogames: action.payload,
      };
    case GET_API_VIDEOGAMES:
      return {
        ...state,
        getAPIVideogames: action.payload,
      };

    case FILTER_BY_GENRES:
      return {
        ...state,
        getVideogames: action.payload.getVideogames,
        getDBVideogames: action.payload.getDBVideogames,
        getAPIVideogames: action.payload.getAPIVideogames,
        filterByGenres: action.payload.filterByGenres,
      };
    default:
      return state;
  }
}
