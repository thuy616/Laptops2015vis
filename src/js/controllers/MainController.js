app.controller('MainController', ['$scope', 'laptops', function($scope, laptops) { 
  laptops.success(function(data) { 
    $scope.laptops = data; 
  });

  $scope.colors = [
		[101, 194, 165],
		[252, 141, 98],
		[142, 159, 203],
		[229, 138, 197],
		[168, 215, 83],
		[254, 216, 47],
		[228, 196, 149],
		[178, 179, 183],
		[93, 188, 210],
		[205, 213, 213]
	];
  
}]);