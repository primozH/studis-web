'use strict';

var app = angular.module('myApp.prijava', ['ngRoute', 'prijavaService']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/prijava', {
    templateUrl: 'prijava/prijava.html',
    controller: 'PrijavaCtrl'
  });
}]);


app.controller('PrijavaCtrl', [
	'$scope', '$http', '$window', 'auth',
	function($scope, $http, $window, auth) {

	//dobi ip clienta, ki ga pošljem pri vsakem poskusu prijave
	auth.service_pridobi_clientip().then(function(val){
		$scope.moj_ip = val;
	});

	$scope.jeVpisan = function() {
	    if($window.localStorage['myApp.prijava']) return true;
	    return false;
	}

	$scope.trenutni_logirani_uporabnik = function() {
		if ($scope.jeVpisan()) {
	      var zeton = $window.localStorage['myApp.prijava'];
	      return JSON.parse($window.atob(zeton.split('.')[1]));
	    }
	    else return null;
	}

	$scope.login_funkcija = function() {
	    if (!$scope.email || !$scope.geslo) {
	      $scope.pokazi_napako_login = true;
	      $scope.login_status = "prosim vnesi ime in geslo za logiranje v sistem";
	      return;
	    }
	    auth.service_login($scope.email, $scope.geslo).success(function(response){
    		var zeton = response.access_token;
    		$window.localStorage['myApp.prijava'] = zeton;

      		if ($scope.trenutni_logirani_uporabnik().tip == "Student") {
      			$window.location.href = 'http://localhost:8000/#!/student';
      		}

      		else if ($scope.trenutni_logirani_uporabnik().tip == "Referentka") {
      			$window.location.href = 'http://localhost:8000/#!/referentka';
      		}

	    }).error(function(err, status) {
	    	$scope.pokazi_napako_login = true;
	    	if (status == 401) $scope.login_status = "napačno geslo";
	    	if (status == 500) $scope.login_status = "napačen email";
	    });
	};

    $scope.logoutFunkcija = function() {
	    $window.localStorage.removeItem('myApp.prijava');
	    $scope.vpisanStudent = false;
	}

	$scope.pozabljeno_geslo = function() {
		auth.service_geslo_reset();
	}


}]);