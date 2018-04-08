'use strict';


angular
    .module('studis')
    .controller('StudentCtrl', StudentCtrl);

function StudentCtrl($scope, $window, $http, studen) {
	

	$scope.logout = function() {
		$window.localStorage.removeItem('studis');
	    $window.localStorage.removeItem("tip");
	    $window.localStorage.removeItem("zeton");
	    $window.location.href = '/#/prijava';
	}

	var trenutni_logirani_uporabnik = function() {
        //vpisan uporabnik ima localStorage[studis] == true
		if ($window.localStorage['studis']) {
	      var zeton = $window.localStorage['studis'];
	      return JSON.parse($window.atob(zeton.split('.')[1]));
	    }
	    else return null;
	}

	var vpisan = trenutni_logirani_uporabnik();
	//v primeru da je kandidat (ne študent z žetonom)
    if (vpisan.tip === 'Kandidat') {
		$scope.kandidat = true;
	}

	//ime priimek in vpisna številka na /student, študentu določi podatke
    if (vpisan.tip === 'Student') {
        studen.service_profil(vpisan.uid).success(function(response){
        	$scope.vpisna_studenta = response.vpisnaStevilka;
        	$scope.ime_studenta = response.ime;
        	$scope.priimek_studenta = response.priimek;
        }).error(function(err, status) {
        	console.log("napaka pri service_profil");
        });
    }

    //prikaže podrobnejši profil na /profil/{vpisnaStevilka}
    $scope.prikazi_moj_profil = function() {
    	$window.location.href = '/#/profil/'+$scope.vpisna_studenta;
    }

    //preverjamo če ima žeton
    studen.service_zeton(vpisan.uid).success(function(response){
    	if (response.length > 0) {
    		$scope.student_zeton_1 = response[0];
            $scope.student_zeton_2 = response[1];
    		$scope.ima_zeton = true;

    		//ta vrstica nastavi da studentu dovolimo dostop do /vpisnilist
    		$window.localStorage.setItem("zeton", "ima");
    	}
    	else
    		$scope.student_zeton = "trenutno nimaš na voljo nobenega žetona za vpis";
    }).error(function(err, status) {
    	console.log("napaka pri service_zeton");
    });
	
};