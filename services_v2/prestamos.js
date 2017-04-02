//var Dao = require('../dbo/modules_v2/Dbo');
var Model = require('../models/prestamos');
var common = require('../dbo/modules_v2/Dbo.common');
var q = require('q');
var ObjectId = require('mongodb').ObjectID;

var PrestamosService = function(){

    return {
        GetAllPrestamosByBookId : function(bookId){
            var defer = q.defer();
            Model.findAll({
              where: {
                libros_idlibros: bookId
              }
            }).then(defer.resolve, defer.reject);

            return defer.promise;
        },
        GetPrestamosVencidos : function(){
            var defer = q.defer();
            Model.findAll({
                where : {
                    fechaFin:{
                        $lt: Date.now()
                    }
                }
            }).then(defer.resolve, defer.reject);

            return defer.promise;
        },
        GetPrestamosByUser : function(idUser){
            var defer = q.defer();
            Model.findAll({
                where : {
                    usuarios_idusuarios: idUser
                }
            }).then(defer.resolve, defer.reject);

            return defer.promise;
        },
        CreatePreastamo : function(prestamo){
            var defer = q.defer();
            Model.create(prestamo).then(defer.resolve, defer.reject);
            return defer.promise;
        },
        CreateApartado: function(apartado){
            var defer = q.defer();
            Model.create(apartado).then(defer.resolve, defer.reject);
            return defer.promise;
        },
        UpdateEstado: function(prestamoId, newState){
            var defer = q.defer();
            Model.find({
                where: {
                    idPrestamos : prestamoId
                }
            }).then( function(prestamo){
                if(prestamo){
                    prestamo.updateAttributes({
                        estado: newState
                    }).then(defer.resolve, defer.reject);

                }
            }, defer.reject);

            return defer.promise;
        }
    };
};



module.exports = PrestamosService;
