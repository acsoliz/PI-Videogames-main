import axios from 'axios';
const URL_NAME_GET = 'http://localhost:3001/videogames/?name=';
export const API_PLATFORMS= 'http://localhost:3001/platforms';
export const API_GENRES = 'http://localhost:3001/genres';
const URL_GET = 'http://localhost:3001/videogames/';
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const FILTER_BY_Db = 'FILTER_BY_Db';
export const CLEAR_DETAIL = 'CLEAR_DETAIL';
export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_GENRE = 'GET_GENRE';
export const ADD_GAME = 'ADD_GAME';
export const BY_ALPH = 'BY_ALPH';
export const BY_RATING = 'BY_RATING';

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

export const getPlatforms = () => {
	return async (dispatch) => {
		try{
			const json = await axios.get(API_PLATFORMS);
			return dispatch({
				type:GET_PLATFORMS,
				payload: json.data
			})
		}catch(error){
			console.log(error)
		}
	}
 }


export const getGenres = () => {
	return async (dispatch) => {
		try {
			const json = await axios.get(API_GENRES);
			return dispatch({
				type:GET_GENRE,
				payload: json.data

			})
		} catch (error) {
			console.log(error);
		}
	};
};
export function getByName(name) {
	return async function(dispatch) {
		try {
			var json = await axios.get(URL_NAME_GET + name);
			
			if (!Array.isArray(json.data)){
				json.data="We can't find the VideoGame, please check the name"
			}
			return dispatch({
				type    : GET_BY_NAME,
				payload : json.data
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function filterByGenres(payload) {
	return { type: FILTER_BY_GENRES, payload };
}
export function filterDb(payload) {
	return { type: FILTER_BY_Db, payload };
}

export const getDetail = (id) => {
	return async function(dispatch) {
		try {
			const json = await axios.get(`${URL_GET}${id}`);
			return dispatch({
				type    : GET_DETAIL,
				payload : json.data
			});
		} catch (error) {
			console.log(error);
		}
	};
};

export const clearDetail = (payload) => {
	return {
		type    : CLEAR_DETAIL,
		payload
	};
};

export const createGame = (payload) => {
	return async function(dispatch) {
		const json = await axios.post(`${URL_GET}`, payload);
		return dispatch({
			type    : ADD_GAME,
			payload : json
		});
	};
};


export function sortByAlph(payload){
	return {
		type: BY_ALPH,
		payload
	}
}


export function sortByRating(payload){
	return {
		type: BY_RATING,
		payload
	}
}
