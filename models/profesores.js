'use strict';
var Sequelize = require('sequelize');
var db = require('../dbo/modules_v2/Dbo-sql');

var profesores = db.define('profesores', {
	idprofesores:{
		type: Sequelize.INTEGER(11), 
		primaryKey: true
	},
	numColaborador:{
		type: Sequelize.STRING(11)
	},
	nombre:{
		type: Sequelize.STRING
	},
	apellido:{
		type: Sequelize.STRING
	},
	usuarios_idusuarios:{
		type: Sequelize.INTEGER(11), 
		unique: true,
		field: 'usuarios_idusuarios' 
	}
}, {
	freezeTableName: true,
	 timestamps: false
});

module.exports = profesores;