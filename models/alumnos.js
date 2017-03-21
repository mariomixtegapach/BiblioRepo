'use strict';
var Sequelize = require('sequelize');
var db = require('../dbo/modules_v2/Dbo-sql');

var alumnos = db.define('alumnos', {
	idAlumno:{
		type: DataTypes.INTEGER(11), 
		primaryKey: true,
		field: 'id_alumno' 
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
	usuariosIdusuarios:{
		type: Sequelize.INTEGER(11), 
		unique: true,
		field: 'usuarios_idusuarios' 
	}
}, {
	freezeTableName: true
});


module.exports = alumnos;