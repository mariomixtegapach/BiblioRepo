'use strict';
var Sequelize = require('sequelize');
var db = require('../dbo/modules_v2/Dbo-sql');

var libros_has_autores = db.define('libros_has_autores', {
	libros_idlibros:{
		type: DataTypes.INTEGER(11), 
		primaryKey: true,
		unique: true
	},
	autores_idautores:{
		type: Sequelize.STRING,
		primaryKey: true,
		unique: true
	}
}, {
	freezeTableName: true
});

module.exports = libros_has_autores;