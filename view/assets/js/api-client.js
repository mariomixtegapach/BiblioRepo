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
		getAll : function(page){
			return request('/prest/all/'+page,{},'GET');
		},
		ByUser : function(idUser){
			return request('/prest/users/'+idUser,{},'GET');
		},
		ByBook: function(idBook){
			return request('/prest/book/'+idBook,{},'GET');	
		},
		saveNew : function(idBook, idUser, prest){
			return request('/prest/'+idUser+'/'+idBook,prest,'PUT');	
		},
		update : function(idPrest, status){
			return request('/prest/'+idPrest, {status:status},'PATCH');
		}
	},
	user : {

		getUser : function(idUser){
			var defer = $.Deferred();
			var user =  localStorage.getItem('user') || null;

			if(user && user.idAlumnos == idUser){   
				user = JSON.parse(user); 
				defer.resolve(user);
			} else {
				request('/alumnos/',{},'GET').then(function(alumnos){
					var alumno = null;

					alumnos.forEach(function(al){
						alumno = al.idAlumnos == idUser ? al : alumno;
					})

					defer.resolve(alumno);

				}, function(err){
					defer.reject(err);
				})
			}

			return defer.promise();
		}
	}
}

angular.module('apiclient',['qrScanner'])
	.controller('listCtr', function($scope, $window){
		$scope.books   = [];
		$scope.authors = [];
		$scope.prest = [];
		$scope.editorials = [];

		$scope.newPrest = {};
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
					case 'prest':
						$scope.prest = res;
						$scope.$apply();
						break;
					
				}	 				
			});
		});

		$scope.setId = function(idBook){
			$scope.newPrest.idprestamos=idBook;
			
		}

		$scope.save = function(type){
			
					switch(type){
						case 'books':
							api[type].saveNew($scope.newBook).then(function(){
								alert('Hecho!');
							}, function(err){
								alert('Ocurrio un error');
								console.log(err)
							});
							break;
						case 'authors':
							api[type].saveNew($scope.newAutor).then(function(){
								alert('Hecho!');
							}, function(err){
								alert('Ocurrio un error');
								console.log(err)
							});
							break;
						case 'editorials':
							api[type].saveNew($scope.newEditorial).then(function(){
								alert('Hecho!');
							}, function(err){
								alert('Ocurrio un error');
								console.log(err)
							});
							break;
						case 'prest':
						api.user.getUser($scope.idUserReaded).then(function(user){
							$scope.user = user;
							if(user){
								api[type].saveNew($scope.newPrest.idprestamos, user.idAlumnos,$scope.newPrest).then(function(){
									alert('Hecho!');
								}, function(err){
									alert('Ocurrio un error');
									console.log(err)
								});
							} else {
								alert('Usuario incorrecto');
							}
						});

							break;
					}	
				}
			
			
			

		$scope.$watch(function(){
			return $('#prestamo').css('display')
		}, function(newVal, oldVal){
			console.log(newVal, oldVal);
			if(newVal != 'none'){
				$scope.getQRCode = true;
				//if($window.localMediaStream)$window.localMediaStream.getVideoTracks()[0].start();
//				$scope.$apply();
			} else {
				//if($window.localMediaStream)$window.localMediaStream.getVideoTracks()[0].stop();
				$scope.getQRCode = false;
				//$scope.$apply();
			}

		}, true);

		$scope.$watch(function(){
			return $('#apartado').css('display')
		}, function(newVal, oldVal){
			console.log(newVal, oldVal);
			if(newVal != 'none'){
				$scope.getQRCode = true;
				//if($window.localMediaStream)$window.localMediaStream.getVideoTracks()[0].start();
//				$scope.$apply();
			} else {
				//if($window.localMediaStream)$window.localMediaStream.getVideoTracks()[0].stop();
				$scope.getQRCode = false;
				//$scope.$apply();
			}

		}, true);

		$scope.setVisualPrest = function(presti){
			$scope.presti = presti;
		}

		$scope.onSuccess = function(data) {
	        console.log(data);
	        $scope.idUserReaded = data;
	        api.user.getUser($scope.idUserReaded).then(function(user){
				$scope.user = user;
				$scope.$apply();
			}, function(err){
				console.log(err);
				alert('Ha ocurrido un error intentalo de nuevo')
			});
	        $scope.getQRCode = false;
	    };
	    $scope.onError = function(error) {
	      
	    };
	    $scope.onVideoError = function(error) {
	      
	    };

	    var tags = ['books','authors','editorials','prest'];
	    
	
	    	api[tags[2]].getAll(1).then(function(res){
				switch(tags[2]){
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
					case 'prest':
						$scope.prest = res;
						$scope.$apply();
						break;
					
				}	 				
			}, function(err){
				console.log(err);
			});

				api[tags[0]].getAll(1).then(function(res){
				switch(tags[0]){
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
					case 'prest':
						$scope.prest = res;
						$scope.$apply();
						break;
					
				}	 				
			}, function(err){
				console.log(err);
			});
	    

	});
