var Model = require('../models/autores');
var common = require('../dbo/modules_v2/Dbo.common');
var q = require('q');
var ObjectId = require('mongodb').ObjectID;

var AutoresService = function(){
   
    return {
        GetById : function(autorId){
            var defer = q.defer();

            if(typeof +autorId !== 'number') {
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
        Save : function(autor){
            return Model.create(autor);
        },
        Delete : function(autorId){
            return Model.destroy({ where : { idautores : autorId } });
        },
        Update : function(autorId, autor){
            return Mode.update(autor, { where : { idautores : autorId }});
        },
        Query : function(query, pageOptions){
             var defer = q.defer();

                if(typeof query !== 'string') {
                    defer.reject(new Error('query debe ser una cadena'));
                } else {
                    var where = { 
                        name : { 
                            $ilike: '%'+query+'%'
                        } 
                    };

                    Model.findAll({ 
                        where : where,
                         limit : pageOptions.pageSize, 
                         offset: pageOptions.pageSize * (pageOptions.page-1) 
                     })
                    .then(defer.resolve, defer.reject);
                }

                return defer.promise;   
        },
        Get : function(pageOptions){
            var defer = q.defer();

                
                    var where = {};

                    Model.findAll({ 
                         where : where,
                         limit : pageOptions.pageSize, 
                         offset: pageOptions.pageSize * (pageOptions.page-1) 
                     })
                    .then(defer.resolve, defer.reject);
                

            return defer.promise;   
        }
    };
};



module.exports = AutoresService;