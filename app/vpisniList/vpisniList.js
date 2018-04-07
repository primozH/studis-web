
/* global angular */
angular
    .module('studis')
    .controller('VpisniListCtrl', VpisniListCtrl);

function VpisniListCtrl($scope, $window, studen){
    $scope.logout = function() {
        $window.localStorage.removeItem('studis');
        $window.localStorage.removeItem("tip");
        $window.location.href = '/#/prijava';
      }        


    var trenutni_logirani_uporabnik = function() {
        if ($window.localStorage['studis']) {
          var zeton = $window.localStorage['studis'];
          return JSON.parse($window.atob(zeton.split('.')[1]));
        }
        else return null;
    }


    studen.service_kandidat(trenutni_logirani_uporabnik().uid).success(function(response){
        console.log(response);
        $scope.vl_vpisna = response.vpisnaStevilka;
        $scope.vl_ime = response.ime;
        $scope.vl_priimek = response.priimek;
        $scope.vl_stalno = response.vl_stalno;

        $scope.vl_letnik = "1."; //kandidat se mnde vedno vpiše v prvi letnik
        $scope.vl_program_naziv = response.studijskiProgram.naziv;
        
    }).error(function(err, status) {
        console.log("errrorrr");
    });


}

