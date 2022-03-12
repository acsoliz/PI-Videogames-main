import axios from 'axios';
const URL_GET = 'http://localhost:3001/videogames';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';

export const getAllGames = () => {
	return async (dispatch) => {
		try {
			const json = await axios.get(URL_GET);
			return dispatch({
				type    : GET_VIDEOGAMES,
				payload : json.data
			});
		} catch (error) {
			console.log(error);
		}
	};
};



export function filterByGenres(payload) {
    return { type: 'FILTER_BY_GENRES', payload };
}