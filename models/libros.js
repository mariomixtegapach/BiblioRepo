'use strict';
var Sequelize = require('sequelize');
var db = require('../dbo/modules_v2/Dbo-sql');

var libros = db.define('libros', {
	idlibros:{
		type: DataTypes.INTEGER(11), 
		primaryKey: true
	},
	ISBN:{
		type: Sequelize.STRING(45)
	}, 
	titulo:{
		type: Sequelize.STRING
	},
	edicion:{
		type: Sequelize.STRING
	},
	fechaImp:{
		type: Sequelize.DATE
	},
	genero:{
		type: Sequelize.STRING
	},
	cantidadTotal:{
		type: Sequelize.INTEGER(11)
	},
	cantidadDisp:{
		type: Sequelize.INTEGER(11)
	},
	tipo:{
		type: Sequelize.STRING
	},
	editoriales_ideditoriales:{
		type: Sequelize.STRING, 
		primaryKey: true,
		unique: true
	}
}, {
	freezeTableName: true
});

module.exports = libros;