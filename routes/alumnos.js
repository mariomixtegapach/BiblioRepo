var express = require('express');
var router = express.Router();
var alumnoService = require('../services_v2/Alumnos');
var common = require('../dbo/modules_v2/Dbo.common');
var request = require('request')

router.get('/', function(req, res, next) {
      request('http://local.api.com/api/students', function (error, response, body) {
        res.json(JSON.parse(body));
      });
  
  
});

module.exports = router;
