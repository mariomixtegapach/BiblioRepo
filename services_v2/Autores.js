var Model = require('../models/autores');
var common = require('../dbo/modules_v2/Dbo.common');
var q = require('q');
var ObjectId = require('mongodb').ObjectID;

var AutoresService = function(){
   
    return {
        GetAutorById : function(autorId){
            var defer = q.defer();

            if(typeof autorId !== 'number') {
                defer.reject(new Error('editorialId debe ser una cadena'));
            } else {

                Model.findAll({
                    where : {
                        idautores : autorId
                    }
                }).then(defer.resolve, defer.reject)
            }

            return defer.promise;   
        },
        SaveAutor : function(autor){
            return Model.create(autor);
        },
        DeleteAutor : function(autorId){
            return Model.destroy({ where : { idautores : autorId } });
        },
        UpdateAutor : function(autorId, autor){
            return Mode.update(autor, { where : { idautores : autorId }});
        }
    };
};



module.exports = AutoresService;