var express = require('express');
var router = express.Router();
var PrestamosService = require('../services_v2/prestamos.js')
var service = new PrestamosService();
var request = require('request')

var q = require('q');

var BookService = require('../services_v2/Libros.js')
var bookService = new BookService();



function onError(res, err){
  console.log(err);
  res.status(500).json({message: err.message, err: true});
}

router.get('/users/:idUser', function(req, res, next){
  service.GetPrestamosByUser(req.params.idUser).then(function(prestamos){
    res.json(prestamos);
  }, function(err){
    res.status.error({ error: true, message : err.message});
  });
});

router.get('/all/:page', function(req, res, next){

  var wrapError = function(err){
    onError(res,err);
  }

  service.Get({ page : req.params.page , pageSize: 10})
    .then(function(data){

        var proms = [];
        var ddd = [];
        request('http://local.api.com/api/students', function (error, response, body) {
            var students = JSON.parse(body);
            //data = data[0].dataValues;
           
            data.forEach(function(apar){
              apar = apar.dataValues;
              var idUser = apar.usuarios_idusuarios;
              console.log(idUser)
              students.forEach(function(uu){
               
                if(idUser == uu.usuarios_idusuarios){
                  apar.userMat = uu.matricula;
                }
              });

              proms.push(bookService.GetById(apar.libros_idlibros).then(function(book){
                book = book[0].dataValues;
                console.log(book);
                apar.bookName = book.length ? book[0].nombre : book.nombre;
                ddd.push(apar)
              }, wrapError));



            });

            q.all(proms).then(function(){
              console.log(ddd)
                res.json(ddd);
              });
        });

        
        
    }, wrapError);
    
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
    librosIdlibros : +req.params.idBook,
    usuariosIdusuarios : +req.params.idUser,
    libros_idlibros:   +req.params.idBook,
    usuarios_idusuarios : +req.params.idUser
  };

  service.CreatePreastamo(prestamo).then(function(prestamos){
    res.json(prestamos);
  }, function(err){
    console.log(err);
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
