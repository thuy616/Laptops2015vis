app.controller('MainController', ['$scope', 'laptops', function($scope, laptops) { 
  laptops.success(function(data) { 
    $scope.laptops = data; 
  });
  
}]);