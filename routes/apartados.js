var express = require('express');
var router = express.Router();
var prestamosService = require('../services_v2/prestamos.js')

router.get('/', function(req, res, next) {
});

router.get('/apartados/user/:idUser', function(req, res, next){
  prestamosService.GetPrestamosByUser(req.params.idUser).then(function(prestamos){
    res.json(prestamos);
  }), function(err){
    res.status.error({ error: true, message : err.message});
  });
});

routes.get('/apartados/book/:idBook', function(req, res, next){
  prestamosService.GetAllPrestamosByBookId(req.params.idBook).then(function(prestamos){
    res.json(prestamos);
  }), function(err){
    res.status.error({ error: true, message : err.message});
  });
});

//pendiente
routes.put('/apartados/:idUser/:idBook                                                                                                                                                                 ', function(req, res, next){
  LibroService.SaveBook(req.body.book);
});

routes.patch('/apartados/:idApartado', function(req, res, next){
  prestamosService.UpdateEstado(req.params.idApartado, req.body.data.state);
});


module.exports = router;
