//var Dao = require('../dbo/modules_v2/Dbo');
var Model = require('../models/libros');
var common = require('../dbo/modules_v2/Dbo.common');
var q = require('q');
var ObjectId = require('mongodb').ObjectID;

var LibroService = function(){
   
    return {
        GetById : function(bookId){
            var defer = q.defer();

            if(typeof +bookId !== 'number') {
                defer.reject(new Error('bookId debe ser una cadena'));
            } else {

                Model.findAll({
                    where : {
                        idlibros : bookId
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
                        $or : [{ 
                                    titulo : { 
                                        $ilike: '%'+query+'%'
                                    }
                                },
                                {
                                    ISBN : {
                                         $ilike: '%'+query+'%'
                                    }
                                }]
                        
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
        Save : function(book){
            return Model.create(book);   
        },
        Update : function(bookId, newBook){
            var defer = q.defer();
            Model.find({ where: { idlibros: bookId } })
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

            //return Mode.update(newBook, { where : { idlibros : bookId }});
        },
        Delete : function(id){
            return Model.destroy({where : {idlibros : id}})
        }
    };
};



module.exports = LibroService;