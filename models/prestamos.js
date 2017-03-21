'use strict';
var Sequelize = require('sequelize');
var db = require('../dbo/modules_v2/Dbo-sql');

var prestamos = db.define('prestamos', {
	idprestamos:{
		type: DataTypes.INTEGER(11), 
		primaryKey: true
	},
	fechaIni:{
		type: Sequelize.DATE
	},
	fechaFin:{
		type: Sequelize.DATE
	},
	estado:{
		type: Sequelize.STRING
	},
	librosIdlibros:{
		type: Sequelize.INTEGER(11), 
		unique: true,
		field: 'libros_idlibros' 
	},
	usuariosIdusuarios:{
		type: Sequelize.INTEGER(11), 
		unique: true,
		field: 'usuarios_idusuarios' 
	}
}, {
	freezeTableName: true
});

module.exports = prestamos;