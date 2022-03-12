import { GET_VIDEOGAMES } from '../actions';
const initialState = {
	videogames    : [],
	videogamesAux : []
};

export default function rootReducer(state = initialState, action) {
	const allDbGames = state.charactersAux;
	switch (action.type) {
		case GET_VIDEOGAMES:
			return {
				...state,
				videogames    : action.payload,
				videogamesAux : action.payload
			};

		default:
			return state;
	}
}
