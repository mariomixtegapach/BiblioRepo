//var Dao = require('../dbo/modules_v2/Dbo');
var Model = require('../models/profesores');
var Collection = require('./../dbo/collections');
var common = require('../dbo/modules_v2/Dbo.common');
var q = require('q');
var ObjectId = require('mongodb').ObjectID;

var ProfesoresService = function(){

    return {
        CreateProfesor : function(profesor){
            var defer = q.defer();

            Model.create(profesor).then(defer.resolve, defer.reject);
            return defer.promise;
        },
        UpdateProfesor : function(profesor){
            Model.update(profesor, {
                where: {
                    idprofesores : profesor.idprofesores
                }
            }).then(defer.resolve, defer.reject);
            return defer.promise;
        },
        ReadProfesorByNumColaborador : function(numColaborador){
            Model.find({
                where : {
                    numColaborador : numColaborador
                }
            }).then(defer.resolve, defer.reject);
            return defer.promise;
        },
        ReadProfesorById : function(id){
            Model.find({
                where : {
                    idprofesores : id
                }
            }).then(defer.resolve, defer.reject);
            return defer.promise;
        },
        ReadProfesorByUserId : function(id){
            Model.find({
                where : {
                    usuarios_idusuarios : id
                }
            }).then(defer.resolve, defer.reject);
            return defer.promise;
        },
        ReadAllProfesores : function(){
            Model.findAll().then(defer.resolve, defer.reject);
            return defer.promise;
        },
        DestroyProfesor: function(id){
            Model.destroy({
                where: {
                    idprofesores: id
                }
            }).then(defer.resolve, defer.reject);
            return defer.promise;
        }
    };
};



module.exports = ProfesoresService;
