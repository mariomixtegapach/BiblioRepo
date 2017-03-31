'use strict';
var Sequelize = require('sequelize');
var db = require('../dbo/modules_v2/Dbo-sql');

var librosHasAutores = db.define('libros_has_autores', {
	librosIdLibros:{
		type: Sequelize.INTEGER(11), 
		primaryKey: true,
		unique: true,
		field: 'libros_idlibros' 
	},
	autoresIdautores:{
		type: Sequelize.STRING,
		primaryKey: true,
		unique: true,
		field: 'autores_idautores' 

	}
}, {
	freezeTableName: true
});

module.exports = librosHasAutores;