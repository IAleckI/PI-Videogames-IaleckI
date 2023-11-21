import axios from "axios";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_DETAIL = "GET_DETAIL";
export const GET_GENRES = "GET_GENRES";
export const getVideogames=()=> {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/videogames");
      return dispatch({ type: "GET_VIDEOGAMES", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export const getGenres = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/genres");
      return dispatch({ type: "GET_GENRES", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
}
export const  getDetail =(id) =>{
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/videogames/${id}`);
      return dispatch({ type: "GET_DETAIL", payload: res.data });
    } catch (error) {
        error.message = "No hay detalles que te podamos mostrar por el momento"
    }
  };
}