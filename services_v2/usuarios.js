//var Dao = require('../dbo/modules_v2/Dbo');
var Model = require('../models/profesores');
var common = require('../dbo/modules_v2/Dbo.common');
var q = require('q');
var ObjectId = require('mongodb').ObjectID;

var UsuariosService = function(){
   
    return {
        CreateUsuario : function(usuario){
            var defer = q.defer();

            Model.create(usuario).then(defer.resolve, defer.reject);
            return defer.promise;  
        },
        UpdateUsuario : function(usuario){
            Model.update(usuario, {
                where: {
                    idusuarios : usuario.idusuarios
                }
            }).then(defer.resolve, defer.reject);
            return defer.promise;  
        }, 
        ReadUsuarioByUserName : function(userName){
            Model.find({
                where : {
                    usuario : userName
                }
            }).then(defer.resolve, defer.reject);
            return defer.promise;  
        },
        ReadUsuarioById : function(id){
            Model.find({
                where : {
                    idusuarios : id
                }
            }).then(defer.resolve, defer.reject);
            return defer.promise;  
        }, 
        DestroyUsuario: function(id){
            Model.destroy({
                where: {
                    idusuarios: id
                }
            }).then(defer.resolve, defer.reject);
            return defer.promise;
        }
    };
};



module.exports = UsuariosService;