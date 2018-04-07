'use strict';

angular
    .module('studis')
    .controller('PrijavaCtrl', PrijavaCtrl);

	function PrijavaCtrl($scope, $http, $window, auth) {
	$scope.klik_pozabljeno = false;

	$scope.jeVpisan = function() {
	    if($window.localStorage['studis']) return true;
	    return false;
	}

	$scope.trenutni_logirani_uporabnik = function() {
		if ($scope.jeVpisan()) {
	      var zeton = $window.localStorage['studis'];
	      return JSON.parse($window.atob(zeton.split('.')[1]));
	    }
	    else return null;
	}

	$scope.login_funkcija = function() {
	    if (!$scope.uporabnisko_ime || !$scope.geslo) {
	      $scope.pokazi_napako_login = true;
	      $scope.login_status = "Prosim vnesite uporabniško ime in geslo za logiranje v sistem";
	      return;
	    }
	    auth.service_login($scope.uporabnisko_ime, $scope.geslo).success(function(response){
    		var zeton = response.access_token;
    		//console.log(zeton);
    		//console.log(JSON.parse($window.atob(zeton.split('.')[1])).tip);
    		$window.localStorage['studis'] = zeton;

      		if ($scope.trenutni_logirani_uporabnik().tip == "Student") {
      			$window.localStorage.setItem("tip", "Student");
      			$window.location.href = '/#/student';
      		}

      		else if ($scope.trenutni_logirani_uporabnik().tip == "Referent") {
      			$window.localStorage.setItem("tip", "Referent");
      			$window.location.href = '/#/referentka';
      		}

	    }).error(function(err, status) {
	    	$scope.pokazi_napako_login = true;
	    	if (status == 401) $scope.login_status = "Napačno geslo";
	    	if (status == 404) $scope.login_status = "Napačno uporabniško ime";
	    });
	};

    $scope.logoutFunkcija = function() {
	    $window.localStorage.removeItem('studis');
	    $scope.vpisanStudent = false;
	}

	$scope.pozabljeno_geslo = function() {
		$scope.klik_pozabljeno = true;
	}

	$scope.poslji_geslo = function() {
		auth.service_geslo_reset($scope.pozabljeno_email).success(function(response){
			$scope.status_pozabljeno_geslo = "geslo ponastavljeno"
	    }).error(function(err, status) {
	    	$scope.status_pozabljeno_geslo = "e-maila ni v bazi";
	    });


	}

};