var express = require('express');
var router = express.Router();
var LibroService = require('../services_v2/Libros.js')

var service = new LibroService();


function onError(res, err){
  console.log(err);
  res.status(500).json({message: err.message, err: true});
}

router.get('/all/:page', function(req, res, next){

  var wrapError = function(err){
    onError(res,err);
  }

  service.Get({ page : req.params.page , pageSize: 10})
    .then(function(data){
        res.json(data);
    }, wrapError);
    
});

router.get('/id/:id', function(req, res, next){

  var wrapError = function(err){
    onError(res,err);
  }

  service.GetById(req.params.id)
    .then(function(data){
        res.json(data);
    }, wrapError);
    
});

router.get('/query/:q', function(req, res, next){

  var wrapError = function(err){
    onError(res,err);
  }

  service.Query(req.params.q)
    .then(function(data){
        res.json(data);
    }, wrapError);
    
});


router.patch('/id/:id', function(req, res, next){
  var newData = req.body;

    var wrapError = function(err){
    onError(res,err);
  }
  try{
  service.Update(req.params.id, newData)
    .then(function(data){
        res.json(data);
    }, wrapError);
    } catch(ex){ console.log(ex)}

})

router.delete('/id/:id', function(req, res, next){

    var wrapError = function(err){
    onError(res,err);
  }

  service.Delete(req.params.id)
    .then(function(data){
        res.json(data);
    }, wrapError);
    

})

router.put('/', function(req, res, next){
  var newData = req.body;
  newData.editoriales_ideditoriales = +newData.editoriales_ideditoriales;
  newData.editorialesIdeditoriales  = +newData.editoriales_ideditoriales;
  newData.cantidadDisp = newData.cantidadTotal;
  var wrapError = function(err){
    onError(res,err);
  }

  console.log(req.body)

  service.Save(newData)
    .then(function(done){
       res.json(done);
    }, wrapError)

})


module.exports = router;
