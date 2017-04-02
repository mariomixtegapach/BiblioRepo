//var Dao = require('../dbo/modules_v2/Dbo');
var Model = require('../models/editoriales');
var common = require('../dbo/modules_v2/Dbo.common');
var q = require('q');
var ObjectId = require('mongodb').ObjectID;

var EditorialService = function(){
   
    return {
        GetById : function(editorialId){
            var defer = q.defer();

            if(typeof +editorialId !== 'number') {
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
        Save : function(editorial){
            return Model.create(editorial);   
        },
        Update : function(editorialId, newData){
            var defer = q.defer();
            Model.find({ where: { ideditoriales: editorialId } })
              .then(function (data) {
                // Check if record exists in db
                if (data) {
                  data.updateAttributes(newData)
                  .then(defer.resolve, defer.reject)
                } else {
                    defer.reject(new Error());
                }
              }, function(err){
                    defer.reject(new Error());
              })

              return defer.promise;
           // return Model.update(newEditorial, { where : { ideditoriales : newEditorial }});
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
        },
        Delete : function(id){
            return Model.destroy({where : {ideditoriales : id}})
        }
    };
};



module.exports = EditorialService;