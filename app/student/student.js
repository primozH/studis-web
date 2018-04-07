'use strict';

//angular.module('myApp.student', ['ngRoute'])


angular
    .module('studis')
    .controller('StudentCtrl', StudentCtrl);

function StudentCtrl($scope, $window, $http, studen) {
	

	$scope.logout = function() {
		$window.localStorage.removeItem('studis');
	    $window.localStorage.removeItem("tip");
	    $window.location.reload();
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

	var vpisan = trenutni_logirani_uporabnik();
	if (vpisan.tip === 'Kandidat') {
		console.log("jaz sem kandidat");
		$scope.kandidat = true;
	}

    studen.service_profil(vpisan.uid).success(function(response){
    	$scope.vpisna_studenta = response.vpisnaStevilka;
    	$scope.ime_studenta = response.ime;
    	$scope.priimek_studenta = response.priimek;
    }).error(function(err, status) {
    	console.log("errrorrr");
    });

    $scope.prikazi_moj_profil = function() {
    	$window.location.href = '/#/profil/'+$scope.vpisna_studenta;//+$scope.vpisna_studenta;
    }
	
};