'use strict';
var Sequelize = require('sequelize');
var db = require('../dbo/modules_v2/Dbo-sql');

var usuarios = db.define('usuarios', {
	idusuarios:{
		type: Sequelize.INTEGER(11), 
		primaryKey: true
	},
	usuario:{
		type: Sequelize.STRING(45)
	},
	password:{
		type: Sequelize.STRING(45)
	}
}, {
	freezeTableName: true
});

module.exports = usuarios;