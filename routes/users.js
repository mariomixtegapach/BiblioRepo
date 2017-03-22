var express = require('express');
var router = express.Router();
var profesoresService = require('../services_v2/profesores');
var alumnosService = require('../services_v2/Alumnos.js');
var usuariosService = require('../services_v2/usuarios.js');


router.get('/', function(req, res, next) {

});

router.get('/', function(req, res, next) {

});

router.get('/users/:type/:userName', function(req, res, next) {

  usuariosService.ReadUsuarioByUserName(req.params.userName).then(function(user){
    if(req.params.type === 'alumno'){
      alumnosService.GetAlumnoByUserId(user.idusuarios).then(function(alumno){
        res.json(alumno);
      }), function(err){
        res.status.error({ error: true, message : err.message});
      });
    } else if(req.params.type === 'profesor'){
      profesoresService.ReadProfesorByUserId(user.idusuarios).then(function(profesor){
        res.json(profesor);
      }), function(err){
        res.status.error({ error: true, message : err.message});
      });
    }
  });
});

router.put('/users/:type/', function(req, res, next){
  usuariosService.CreateUsuario(req.body.user);
  if(req.params.type === 'alumno'){
    alumnoService.SaveAlumno(req.body.data);
  }else if(req.params.type === 'profesor'){
    profesoresService.CreateProfesor(req.body.data);
  }
});

router.patch('/users/:type', function(req, res, next) {
  if(req.params.type === 'alumno'){
    alumnoService.UpdateAlumno(req.body.data, req.body.data.idalumnos);
  }else if(req.params.type === 'profesor'){
    profesoresService.UpdateProfesor(req.body.data);
  }
});



module.exports = router;
