'use strict';
var Sequelize = require('sequelize');
var db = require('../dbo/modules_v2/Dbo-sql');

var prestamos = db.define('prestamos', {
	idprestamos:{
		type: Sequelize.INTEGER(11), 
		autoIncrement: true,
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
	libros_idlibros:{
		type: Sequelize.INTEGER(11)
	},
	usuarios_idusuarios:{
		type: Sequelize.INTEGER(11) 
		
	}
}, {
	freezeTableName: true,
	 timestamps: false
});

module.exports = prestamos;