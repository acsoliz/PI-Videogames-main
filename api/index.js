const server = require('./src/app.js');
const { default: axios } = require('axios');
const { conn, Videogame, Genre } = require('./src/db.js');
const API_GENRES = 'https://api.rawg.io/api/genres?key=';
const API_GAMES = 'https://api.rawg.io/api/games?key=';
const { API_KEY } = process.env;

conn.sync({ force: false }).then(async () => {
	//             ----------------  Lleno la tabla Genres----------------------

	const maxId = await Videogame.max('id');
	console.log(maxId, "soy el id");
	if (!maxId) {
		const AllGenres = await axios(`${API_GENRES}${API_KEY}`);

		const genres =
			AllGenres &&
			AllGenres.data.results.map((e) => {
				return {
					name : e.name
				};
			});
		for (let genre of genres) {
			Genre.create({
				name : genre.name
			});
		}

		try {
		} catch (error) {
			console.log('ERROR AL CREAR DB GENRES', error);
		}

		//                  -----------------llenando la tabla VideoGames------------------
		try {
			let array = [];
			for (let i = 1; i < 6; i++) {
				const resultsArray = await axios(`${API_GAMES}${API_KEY}&page=${i}`);
				array.push(resultsArray.data.results);
			}
			array = array.flat(); //

			array = array.map((el) => {
				// foreach
				return {
					id               : el.id,
					name             : el.name,
					background_image : el.background_image,
					rating           : el.rating,
					platforms        :
						el.platforms.length[2] ? el.platforms.map((e) => e.platforms.name) :
						'--',
					genres           : el.genres.map((el) => el.name),
					released         : el.released
				};
			});

			for (const videogame of array) {
				// aqui hacer
				let game = await Videogame.create({
					id               : videogame.id,
					name             : videogame.name,
					background_image : videogame.background_image,
					rating           : videogame.rating,
					platforms        : videogame.platforms,
					released         : videogame.released,
					db               : false
				});
				const genre = await Genre.findAll({
					where : {
						name : videogame.genres
					}
				});

				game.addGenre(genre); // aqui
			}
		} catch (error) {
			console.log(error);
		}
	}

	server.listen(process.env.PORT, () => {
		console.log('%s listening at 3001'); // eslint-disable-line no-console
	});
});
