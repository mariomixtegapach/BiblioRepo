var express = require('express');
var router = express.Router();
var PrestamosService = require('../services_v2/prestamos.js')
var service = new PrestamosService();

router.get('/users/:idUser', function(req, res, next){
  service.GetPrestamosByUser(req.params.idUser).then(function(prestamos){
    res.json(prestamos);
  }, function(err){
    res.status.error({ error: true, message : err.message});
  });
});

router.get('/book/:idBook', function(req, res, next){
  service.GetAllPrestamosByBookId(req.params.idBook).then(function(prestamos){
    res.json(prestamos);
  }, function(err){
    res.status.error({ error: true, message : err.message});
  });
});

//pendiente
router.put('/:idUser/:idBook', function(req, res){
  var prestamo = {
    fechaIni : new Date().toISOString().split('T')[0],
    fechaFin : req.body.fechaFin,
    estado   : 'PRESTAMO',
    librosIdlibros : req.params.idBook,
    usuariosIdusuarios :req.params.idUser
  };

  service.CreatePreastamo(prestamo).then(function(prestamos){
    res.json(prestamos);
  }, function(err){
    res.status.error({ error: true, message : err.message});
  });
});

router.patch('/:idApartado', function(req, res, next){
  service.UpdateEstado(req.params.idApartado, req.body.status).then(function(prestamos){
    res.json(prestamos);
  }, function(err){
    res.status.error({ error: true, message : err.message});
  });
});


module.exports = router;
