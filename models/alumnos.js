'use strict';
var Sequelize = require('sequelize');
var db = require('../dbo/modules_v2/Dbo-sql');

var alumnos = db.define('alumnos', {
	id_alumno:{
		type: DataTypes.INTEGER(11), 
		primaryKey: true
	},
	matricula:{
		type: Sequelize.STRING(45)
	},
	nombre:{
		type: Sequelize.STRING
	},
	apellido:{
		type: Sequelize.STRING
	},
	usuarios_idusuarios:{
		type: Sequelize.INTEGER(11), 
		unique: true
	}
}, {
	freezeTableName: true
});

module.exports = alumnos;