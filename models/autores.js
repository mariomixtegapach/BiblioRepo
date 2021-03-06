'use strict';
var Sequelize = require('sequelize');
var db = require('../dbo/modules_v2/Dbo-sql');

var autores = db.define('autores', {
	idautores:{
		type: Sequelize.INTEGER(11), 
		primaryKey: true
	},
	nombre:{
		type: Sequelize.STRING
	}
}, {
	freezeTableName: true,
	 timestamps: false
});

module.exports = autores;