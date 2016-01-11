app.factory('forecast', ['$http', function($http) { 
  return $http.get('../../data.json') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);