import {GET_VIDEOGAMES , GET_DETAIL , GET_GENRES} from "./Actions";

let initialState = {
    getVideogames: [],
    getDetail: [],
    getGenres: [],
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                getVideogames: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                getDetail: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                getGenres: action.payload
            }
        
        default:
            return state

    }
}
