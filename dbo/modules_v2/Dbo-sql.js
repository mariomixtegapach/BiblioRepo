var Sequelize = require('sequelize');
var sequelize = new Sequelize('mariadb://root@localhost:3306/biblioteca');

module.exports = sequelize;