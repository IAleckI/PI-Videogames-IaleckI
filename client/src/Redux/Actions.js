export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_DETAIL = "GET_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const GET_VIDEOGAMES_ASCEND_NAME = "GET_VIDEOGAMES_ASCEND_NAME";
export const GET_VIDEOGAMES_BY_RATING = "GET_VIDEOGAMES_BY_RATING";
export const GET_DB_VIDEOGAMES = "GET_DB_VIDEOGAMES";
export const GET_API_VIDEOGAMES = "GET_API_VIDEOGAMES";
export const FILTER_BY_GENRES = " FILTER_BY_GENRES";

export const getVideogames = () => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:3001/videogames");
      const data = await res.json();
      return dispatch({ type: "GET_VIDEOGAMES", payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};
export const getGenres = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/genres");
      const data = await response.json();
      dispatch({ type: "GET_GENRES", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetail = (id) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:3001/videogames/${id}`);
    if (!res.ok) {
      throw new Error("there is no detail for this id");
    }
    const data = await res.json();
    dispatch({ type: "GET_DETAIL", payload: data });
  } catch (error) {
    error.message = "there is not information by the moment";
  }
};

export const getSortedNameGames = (order) => {
  return async (dispatch, getState) => {
    try {
      const { getVideogames, getDBVideogames, getAPIVideogames } = getState();

      const sortedGames = [...getVideogames].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return order === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });

      const sortedDBGames = [...getDBVideogames].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return order === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });

      const sortedAPIGames = [...getAPIVideogames].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return order === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });

      dispatch({
        type: "GET_VIDEOGAMES_ASCEND_NAME",
        payload: {
          getVideogames: sortedGames,
          getDBVideogames: sortedDBGames,
          getAPIVideogames: sortedAPIGames,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getSortedByRating = (order) => async (dispatch, getState) => {
  try {
    const { getVideogames, getDBVideogames, getAPIVideogames } = getState();

    const sortedGamesByRating = [...getVideogames].sort((a, b) => {
      const ratingA = a.rating;
      const ratingB = b.rating;
      return order === "asc" ? ratingA - ratingB : ratingB - ratingA;
    });

    const sortedDBGamesByRating = [...getDBVideogames].sort((a, b) => {
      const ratingA = a.rating;
      const ratingB = b.rating;
      return order === "asc" ? ratingA - ratingB : ratingB - ratingA;
    });

    const sortedAPIGamesByRating = [...getAPIVideogames].sort((a, b) => {
      const ratingA = a.rating;
      const ratingB = b.rating;
      return order === "asc" ? ratingA - ratingB : ratingB - ratingA;
    });

    dispatch({
      type: "GET_VIDEOGAMES_BY_RATING",
      payload: {
        getVideogames: sortedGamesByRating,
        getDBVideogames: sortedDBGamesByRating,
        getAPIVideogames: sortedAPIGamesByRating,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getDBVideogames = () => {
  return async (dispatch, getState) => {
    try {
      const { getVideogames } = getState();
      const isUUID = (str) =>
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          str
        );
      const dbGames = getVideogames.filter((game) => isUUID(game.id));
      dispatch({ type: GET_DB_VIDEOGAMES, payload: dbGames });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAPIVideogames = () => {
  return async (dispatch, getState) => {
    try {
      const { getVideogames } = getState();
      const apiGames = getVideogames.filter((game) => !isNaN(game.id));
      dispatch({ type: GET_API_VIDEOGAMES, payload: apiGames });
    } catch (error) {
      console.error(error);
    }
  };
};

export const filterByGenres = (genres) => {
  return async (dispatch, getState) => {
    try {
      const { getVideogames, getDBVideogames, getAPIVideogames } = getState();

      const filteredGenres = getVideogames.filter((game) => {
        return genres.every((genre) => game.genres.includes(genre));
      });

      const filteredDBGenres = getDBVideogames.filter((game) => {
        return genres.every((genre) => game.genres.includes(genre));
      });

      const filteredAPIGenres = getAPIVideogames.filter((game) => {
        return genres.every((genre) => game.genres.includes(genre));
      });

      dispatch({
        type: FILTER_BY_GENRES,
        payload: {
          getVideogames: filteredGenres,
          getDBVideogames: filteredDBGenres,
          getAPIVideogames: filteredAPIGenres,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
};
