'use strict';

//angular.module('myApp.student', ['ngRoute'])


angular
    .module('studis')
    .controller('StudentCtrl', StudentCtrl);

function StudentCtrl($scope, $window) {
	$scope.logout = function() {
		$window.localStorage.removeItem('studis');
		$window.location.href = '/#/prijava';
	}
	var jeVpisan = function() {
	    if($window.localStorage['studis']) return true;
	    return false;
	}

	var trenutni_logirani_uporabnik = function() {
		if (jeVpisan()) {
	      var zeton = $window.localStorage['studis'];
	      return JSON.parse($window.atob(zeton.split('.')[1]));
	    }
	    else return null;
	}

	$scope.vpisan = trenutni_logirani_uporabnik();
	if ($scope.vpisan == null)
		$scope.id_studenta = "/ (ker nisi vpisan)";
	else 
		$scope.id_studenta = $scope.vpisan.uid;
};