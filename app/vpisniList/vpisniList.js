
/* global angular */
angular
    .module('studis')
    .controller('VpisniListCtrl', VpisniListCtrl);

function VpisniListCtrl($scope, $window, $routeParams, studen){
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


    //v primeru da do vpisnega lista dostopa kandidat
    if (trenutni_logirani_uporabnik().tip === "Kandidat") {
        studen.service_kandidat(trenutni_logirani_uporabnik().uid).success(function(response){
            console.log(response);
            $scope.vl_vpisna = response.vpisnaStevilka;
            $scope.vl_ime = response.ime;
            $scope.vl_priimek = response.priimek;

            $scope.vl_letnik = "1."; //kandidat se mnde vedno vpiše v prvi letnik
            $scope.vl_program_naziv = response.studijskiProgram.naziv;
            
        }).error(function(err, status) {
            console.log("napaka pri service_kandidat");
        });
    }

    //v primeru da do vpisnega lista dostopa študent z žetonom
    else if (trenutni_logirani_uporabnik().tip === "Student") {
        studen.service_student(trenutni_logirani_uporabnik().uid).success(function(response){
            var id = $routeParams.id - 1; //id vpisnega lista /vpisnilist/:id (možno je 1 ali 2)
            $scope.vl_vpisna = response[id].student.vpisnaStevilka;
            $scope.vl_ime = response[id].student.ime;
            $scope.vl_priimek = response[id].student.priimek;
            $scope.vl_email = response[id].student.email;
            $scope.vl_telefonska = response[id].student.telefonskaStevilka;

            $scope.vl_letnik = response[id].letnik.letnik;
            $scope.vl_program_naziv = response[id].studijskiProgram.naziv;
            $scope.vl_vrsta_vpisa = response[id].vrstaVpisa.vrstaVpisa;
            $scope.vl_nacin_studija = response[id].nacinStudija.opis;
            
        }).error(function(err, status) {
            console.log("napaka pri service_kandidat");
        });
    }



}

