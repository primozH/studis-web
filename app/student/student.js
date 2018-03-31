'use strict';

angular.module('myApp.student', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/student', {
    templateUrl: 'student/student.html',
    controller: 'StudentCtrl'
  });
}])

.controller('StudentCtrl', ['$scope', '$window', function($scope, $window) {
	$scope.logout = function() {
		$window.localStorage.removeItem('myApp.prijava');
		$window.location.reload();
	}
	var jeVpisan = function() {
	    if($window.localStorage['myApp.prijava']) return true;
	    return false;
	}

	var trenutni_logirani_uporabnik = function() {
		if (jeVpisan()) {
	      var zeton = $window.localStorage['myApp.prijava'];
	      return JSON.parse($window.atob(zeton.split('.')[1]));
	    }
	    else return null;
	}

	$scope.vpisan = trenutni_logirani_uporabnik();
	if ($scope.vpisan == null)
		$scope.id_studenta = "/ (ker nisi vpisan)";
	else 
		$scope.id_studenta = $scope.vpisan.uid;
}]);