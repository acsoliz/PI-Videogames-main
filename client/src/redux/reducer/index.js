import {
	GET_VIDEOGAMES,
	FILTER_BY_GENRES,
	FILTER_BY_Db,
	GET_BY_NAME,
	GET_DETAIL,
	GET_GENRE,
	ADD_GAME,
	CLEAR_DETAIL,
	GET_PLATFORMS,
	BY_ALPH,
	BY_RATING,
	DESTROY
} from '../actions';
const initialState = {
	videogames    : [], //
	videogamesAux : [], //
	filters       : [],
	details       : [], //
	genres        : [] //
};

export default function rootReducer(state = initialState, action) {
	const videogamesAux = state.videogamesAux;
	switch (action.type) {
		case GET_VIDEOGAMES:
			return {
				...state,
				videogames    : action.payload,
				videogamesAux : action.payload
			};
		case GET_BY_NAME:
			return {
				...state,
				videogames : action.payload
			};
		case GET_GENRE:
			return {
				...state,
				genres : action.payload
			};
		case GET_DETAIL:
			return {
				...state,
				details : action.payload
			};
		case CLEAR_DETAIL:
			return {
				...state,
				details : []
			};
		case GET_PLATFORMS:
			return {
				...state,
				platforms : action.payload
			};
		case ADD_GAME:
			return {
				...state
			};
		case FILTER_BY_GENRES:
			// videogamesAux es un COPIA  de mi estado y se carga con todos los juegos en GET_Videogames
			if (!state.filters[0]) {
				const getGenres = videogamesAux;
				const gamesFiltered =

						action.payload === 'All' ? getGenres :
						getGenres.filter((el) => el.genres.includes(action.payload));
				console.log('Deberia ser un array con todos los elementos  by genres', gamesFiltered);
				return {
					...state,
					videogames : gamesFiltered // gamesFiltered tiene todos los jueos ya filtrados
				};
			} else {
				const filtrados = state.filters;
				let filtersByDBandGenres =
				
				action.payload === 'All' ? filtrados :
				filtrados.filter((el) => el.genres.includes(action.payload));
				console.log('Deberia ser un array con todos los elementos  by genres', filtersByDBandGenres);
				return {
					...state,
					videogames : filtersByDBandGenres // gamesFiltered tiene todos los jueos ya filtrados
				};
			}

		case FILTER_BY_Db:
			const getGamesByDb = videogamesAux;
			const gamesDbFilter =

					action.payload === 'All' ? getGamesByDb :
					getGamesByDb.filter((el) => el.db.toString() === action.payload.toString());

			return {
				...state,
				videogames : gamesDbFilter,
				filters    : gamesDbFilter
			};
		case BY_ALPH: {
			// console.log("deberia ser a-z o z-a:  ",action.payload)
			console.log(state.videogames)
			const byAlph =

					action.payload === 'a-z' ? state.videogames.sort((a, b) => {
						if (a.name > b.name) {
							return 1;
						}
						if (a.name < b.name) {
							return -1;
						}
						return 0;
					}) :
					state.videogames.sort((a, b) => {
						if (a.name > b.name) {
							return -1;
						}
						if (a.name < b.name) {
							return 1;
						}
						return 0;
					});
					console.log("Seberia estar ordenado",byAlph)
			return {
				...state,
				videogames : byAlph
			};
		}
		case BY_RATING: {
			const sortByRating =

					action.payload === 'most' ? state.videogames.sort((a, b) => {
						if (a.rating < b.rating) {
							return 1;
						}
						if (a.rating > b.rating) {
							return -1;
						}
					}) :
					state.videogames.sort((a, b) => {
						if (a.rating > b.rating) {
							return 1;
						}
						if (a.rating < b.rating) {
							return -1;
						}
					});
			return {
				...state,
				videogames : sortByRating
			};
		}
		case DESTROY: {
		}
		default:
			return state;
	}
}
