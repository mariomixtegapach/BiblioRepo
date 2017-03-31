//var Dao = require('../dbo/modules_v2/Dbo');
var Model = require('../models/libros');
var common = require('../dbo/modules_v2/Dbo.common');
var q = require('q');
var ObjectId = require('mongodb').ObjectID;

var LibroService = function(){
   
    return {
        GetLibroById : function(bookId){
            var defer = q.defer();

            if(typeof bookId !== 'number') {
                defer.reject(new Error('editorialId debe ser una cadena'));
            } else {

                Model.findAll({
                    where : {
                        idlibros : bookId
                    }
                }).then(defer.resolve, defer.reject)
            }

            return defer.promise;   
        },
        QueryBook : function(query, pageOptions){
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
        SaveBook : function(book){
            return Model.create(book);   
        },
        UpdateBook : function(bookId, newBook){
            return Mode.update(newBook, { where : { idlibros : bookId }});
        },
        GetBookOcuppiedDates : function(bookId){
            
            var defer = q.defer();

            var book = {};

            this.GetLibroById(bookId).then(function(books){
                if(books && books.length){
                    book.info = books

                    Model.findAll({
                        where : 
                    })

                }
            }, defer.reject);

            return defer.promise;

        }
    };
};



module.exports = LibroService;