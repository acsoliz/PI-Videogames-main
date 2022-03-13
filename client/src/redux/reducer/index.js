import { GET_VIDEOGAMES, FILTER_BY_GENRES, FILTER_BY_Db, GET_BY_NAME, GET_DETAILS } from '../actions';
const initialState = {
	videogames    : [],
	videogamesAux : [],
	filters       : []
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
		case GET_DETAILS:
			console.log(action.payload, 'Soy GET detailskkkkk'); 
			return {
				...state,
				videogames : action.payload
			};

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
			console.log('Soy el filtro Db', gamesDbFilter);
			return {
				...state,
				videogames : gamesDbFilter
			};

		default:
			return state;
	}
}
