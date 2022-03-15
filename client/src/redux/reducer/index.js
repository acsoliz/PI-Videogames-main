import { GET_VIDEOGAMES, FILTER_BY_GENRES, FILTER_BY_Db, GET_BY_NAME, GET_DETAIL, ADD_GAME } from '../actions';
const initialState = {
	videogames    : [],
	videogamesAux : [],
	filters       : [],
	details       : []
};

export default function rootReducer(state = initialState, action) {
	const allDbGames = state.videogamesAux;
	switch (action.type) {
		case GET_VIDEOGAMES:
			return {
				...state,
				videogames    : action.payload,
				videogamesAux : action.payload,
				filters       : action.payload
			};
		case GET_BY_NAME:
			return {
				...state,
				videogames : action.payload
			};
		case GET_DETAIL:
			return {
				...state,
				details : action.payload
			};
		case ADD_GAME:
			return{
				...state
			}

		case FILTER_BY_GENRES:
			const gamesFiltered =

					action.payload === 'All' ? allDbGames :
					allDbGames.filter((el) => el.genresString.includes(action.payload));
			return {
				...state,
				videogames : gamesFiltered
			};
		case FILTER_BY_Db:
			const gamesDbFilter =

					action.payload === 'All' ? allDbGames :
					allDbGames.filter((el) => el.db.toString() === action.payload.toString());

			return {
				...state,
				videogames : gamesDbFilter
			};

		default:
			return state;
	}
}
