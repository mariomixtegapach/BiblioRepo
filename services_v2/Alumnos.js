//var Dao = require('../dbo/modules_v2/Dbo');
var Model = require('../models/alumnos');
var common = require('../dbo/modules_v2/Dbo.common');
var q = require('q');
var ObjectId = require('mongodb').ObjectID;

var AlumnoService = function(){

    return {
        GetAlumnoById : function(idAlumno){
            var defer = q.defer();

            if(typeof idAlumno !== 'number') {
                defer.reject(new Error('editorialId debe ser una cadena'));
            } else {
                Model.findAll({
                    where : {
                        idalumnos : idAlumno
                    }
                }).then(defer.resolve, defer.reject)
            }

            return defer.promise;
        },
        GetAlumnoByUserId : function(userId){
            var defer = q.defer();

            if(typeof idAlumno !== 'number') {
                defer.reject(new Error('editorialId debe ser una cadena'));
            } else {
                Model.findAll({
                    where : {
                        usuarios_idusuarios : userId
                    }
                }).then(defer.resolve, defer.reject)
            }

            return defer.promise;
        },
        SaveAlumno : function(alumno){
             return Model.create(alumno);
        },
        UpdateAlumno : function(alumno, idAlumno){
            return Model.update(alumno, { where : { idalumnos : idAlumno } } );
        },
        DeleteAlumno : function(idAlumno){
            return Model.destroy({ where : { idalumnos : idAlumno }});
        }
    };
};



module.exports = AlumnoService;
