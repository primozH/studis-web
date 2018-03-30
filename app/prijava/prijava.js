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

	$scope.login_funkcija = function() {
    //alert($scope.elektronska_posta + $scope.geslo);
	    if (!$scope.elektronska_posta || !$scope.geslo) {
	      $scope.pokazi_napako_login = true;
	      $scope.login_status = "prosim vnesi ime in geslo za logiranje v sistem";
	      return;
	    }
	    auth.service_login( $scope.elektronska_posta, $scope.geslo);
	    
	    
	};

    $scope.logoutFunkcija = function() {
	    $window.localStorage.removeItem('myApp.prijava');
	    $scope.vpisanStudent = false;
	}

	$scope.pozabljeno_geslo = function() {
		auth.service_geslo_reset();
	}


}]);