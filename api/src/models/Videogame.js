const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'videogame',
		{
			id               : {
				type         : DataTypes.FLOAT,
				defaultValue : DataTypes.UUIDV4,
				primaryKey   : true
			},
			name             : {
				type      : DataTypes.STRING,
				allowNull : false
			},
			description      : {
				type : DataTypes.TEXT
				// allowNull : false
			},
			released         : {
				type : DataTypes.STRING
			},
			rating           : {
				type : DataTypes.FLOAT
			},
			platforms        : {
				type      : DataTypes.STRING,
			},

			db               : {
				type         : DataTypes.BOOLEAN,
				defaultValue : false
			},
			background_image : {
				type : DataTypes.TEXT
			}
			// ,
			// genresString            : {
			// 	type : DataTypes.STRING
			// }
		},
		{ timestamps: false }
	);
};
