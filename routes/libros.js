var express = require('express');
var router = express.Router();
var LibroService = require('../services_v2/Libros.js')
router.get('/', function(req, res, next) {

});

router.get('/libros/page/:pageNmber/:pageSize', function(req, res, next){

});

routes.get('/libros/:bookId', function(req, res, next){
  if(req.params.bookId){
    LibroService.GetLibroById(req.params.bookId).then(function(book){
      res.json(user);
    }), function(err){
      res.status.error({ error: true, message : err.message});
    });
  } else {
  	res.status(500).json({ error : true, message:'Invalid book id'});
  }
});

routes.get('/libros/q/:query', function(req, res, next){
  LibroService.QueryBook(req.params.query).then(function(search){
    res.json(search);
  }), function(err){
    res.status.error({ error: true, message : err.message});
  });
});

routes.get('/libros/dates/:bookId', function(req, res, next){
  LibroService.QueryBook(req.params.bookId).then(function(dates){
    res.json(dates);
  }), function(err){
    res.status.error({ error: true, message : err.message});
  });
});

routes.put('/libros', function(req, res, next){
  LibroService.SaveBook(req.body.book);
});

routes.patch('/libos/:bookId', function(req, res, next){
  LibroService.UpdateBook(req.params.bookId, req.params.book);
});


module.exports = router;
