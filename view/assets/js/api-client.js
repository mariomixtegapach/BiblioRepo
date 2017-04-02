var request = function(url, data, method){
	var defer = $.Deferred();
	var baseUrl = 'http://localhost:3000';

	$.ajax({
	  url: baseUrl + url,
	  method: method,
	  data: data,
	  dataType: "application/json"
	}).always(function(e){
		var resp = JSON.parse(e.responseText);
		defer.resolve(resp);
	}).fail(defer.reject);

	return defer.promise();
}

var buildClient = function(main){
	return {
		getAll : function(page){
			return request(main+'/all/'+page,{},'GET');
		},
		getById : function(id){
			return request(main+'/id/'+id,{},'GET');	
		},
		query : function(q){
			return request(main+'/query/'+q,{},'GET');
		},
		update : function(id){
			return request(main+'/id/'+q,{},'PATCH');
		},
		delete: function(id){
			return request(main+'/id/'+q,{},'DELETE');
		},
		saveNew : function(newObject){
			return request(main+'/',newObject,'PUT');
		}
	};
}

var api = {
	editorials : buildClient('/editorials'),
	books : buildClient('/books'),
	authors : buildClient('/authors'),
	prest : {
		ByUser : function(idUser){
			return request('/prest/users/'+idUser,{},'GET');
		},
		ByBook: function(idBook){
			return request('/prest/book/'+idBook,{},'GET');	
		},
		newPrest : function(idBook, idUser, prest){
			return request('/prest/'+idUser+'/'+idBook,prest,'PUT');	
		},
		changeStatus : function(idPrest, status){
			return request('/prest/'+idPrest, {status:status},'PATCH');
		}
	}
}

angular.module('apiclient',[])
	.controller('listCtr', function($scope){
		$scope.books   = [];
		$scope.authors = [];
		$('li','.tabs-menus').click(function(e){
			var apiNamespace = $(e.target).data().api;

			api[apiNamespace].getAll(1).then(function(res){
				switch(apiNamespace){
					case 'books':
						$scope.books = res;
						$scope.$apply();
						break;
					case 'authors':
						$scope.authors = res;
						$scope.$apply();
						break;
					case 'editorials':
						$scope.editorials = res;
						$scope.$apply();
						break;
					
				}	 				
			});
		});

		$scope.save = function(type){
			console.log(type, $scope.newBook,$scope.newPrest, $scope.newEditorial,$scope.newAutor)
		}

	});



