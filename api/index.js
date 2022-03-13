const server = require('./src/app.js');
const { default: axios } = require('axios');
const { conn, Videogame } = require('./src/db.js');
const { API_KEY } = process.env;

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
	try {
		let diexElements = [];
		const games = await axios('https://api.rawg.io/api/games?key=7f49531fc430481a95118481eac9022f&page_size=15');
		for (let i = 0; i < 15; i++) {
			diexElements.push(games.data.results[i]);
		}

		diexElements = diexElements.map((el) => {
			return {
				name             : el.name,
				background_image : el.background_image,
				rating           : el.rating,
				platforms        :
					el.platforms.length[2] ? el.platforms.map((e) => el.platforms.name) :
					'--',
				genres           : el.genres.map((el) => el.name),
				released         : el.released
			};
		});

		//await Videogame bulkcreate(diexPersonas);
    // [ 'Action', 'Adventure' ], ==> Action, Adventure
		for (const videogame of diexElements) {
			Videogame.create({
				name             : videogame.name,
				background_image : videogame.background_image,
				rating           : videogame.rating,
				platforms        : videogame.platforms,
				genresString     : videogame.genres[0]?(videogame.genres.join(', ')):null,
				released         : videogame.released
			});
    //  console.log(videogame.genresString)
		}
	} catch (error) {
		console.log(error);
	}

	server.listen(3001, () => {
		console.log('%s listening at 3001'); // eslint-disable-line no-console
	});
});
