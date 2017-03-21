var express = require('express');
var router = express.Router();
var alumnoService = require('../services_v2/Alumnos');
var common = require('../modules_v2/Dbo.common');

router.get('/:idAlumno', function(req, res, next) {
  if(req.params.idAlumno){
  	alumnoService.GetAlumnoById(req.params.idAlumno)
  		.then(function(user){
  			res.json(user);
  		}, function(err){
			res.status.error({ error: true, message : err.message});
  		})	
  } else {
  	res.status(500).json({ error : true, message:'Invalid idAlumno'});
  }
  
});

router.put('/', function(req, res, next) {

	var alumno = req.body;

   if(common.required(alumno,
     ['idAlumno','matricula','nombre','apellido','usuariosIdusuarios'])){
      alumnoService.SaveAlumno(alumno).then(function(newAlumno){
        res.json(newAlumno);
      }, function(err){
        res.status(500).json({
          error   : true,
          message : err.message
        });
      });
   } else {
      res.status(500).json({
        error   : true,
        message : 'Invalid alumn object'
      });
   }
});

module.exports = router;
