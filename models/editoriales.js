'use strict';
var Sequelize = require('sequelize');
var db = require('../dbo/modules_v2/Dbo-sql');

var editoriales = db.define('editoriales', {
	ideditoriales:{
		type: DataTypes.INTEGER(11), 
		primaryKey: true
	},
	nombre:{
		type: Sequelize.STRING
	}
}, {
	freezeTableName: true
});

module.exports = editoriales;