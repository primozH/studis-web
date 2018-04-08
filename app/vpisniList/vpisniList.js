
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
            console.log(response);
            $scope.vl_vpisna = response[0].student.vpisnaStevilka;
            $scope.vl_ime = response[0].student.ime;
            $scope.vl_priimek = response[0].student.priimek;
            $scope.vl_email = response[0].student.email;
            $scope.vl_telefonska = response[0].student.telefonskaStevilka;

            $scope.vl_letnik = response[0].letnik.letnik;
            $scope.vl_program_naziv = response[0].studijskiProgram.naziv;
            $scope.vl_vrsta_vpisa = response[0].vrstaVpisa.vrstaVpisa;
            $scope.vl_nacin_studija = response[0].nacinStudija.opis;
            
        }).error(function(err, status) {
            console.log("napaka pri service_kandidat");
        });
    }



}

