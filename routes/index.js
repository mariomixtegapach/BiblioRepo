var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize')
var sequelize = new Sequelize('mariadb://root@localhost:3306/biblioteca');

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});

module.exports = router;
