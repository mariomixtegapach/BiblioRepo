//var Dao = require('../dbo/modules_v2/Dbo');
var Model = require('../models/editoriales');
var Collection = require('./../dbo/collections');
var common = require('../dbo/modules_v2/Dbo.common');
var q = require('q');
var ObjectId = require('mongodb').ObjectID;

var EditorialService = function(){
   
    return {
        GetEditorialById : function(editorialId){
            var defer = q.defer();

            if(typeof editorialId !== 'number') {
                defer.reject(new Error('editorialId debe ser una cadena'));
            } else {

                Model.findAll({
                    where : {
                        ideditoriales : editorialId
                    }
                }).then(defer.resolve, defer.reject)
            }

            return defer.promise;   
        },
        QueryEditorial : function(query, pageOptions){
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
                     } , pageOptions)
                    .then(defer.resolve, defer.reject);
                }

                return defer.promise;   
        },
        SaveEditorial : function(editorial){
            return Model.create(editorial);   
        },
        UpdateEditorial : function(editorialId, newEditorial){
            return Mode.update(newEditorial, { where : { ideditoriales : newEditorial }});
        }
    };
};



module.exports = EditorialService;