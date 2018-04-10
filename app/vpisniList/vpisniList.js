
/* global angular */
angular
    .module('studis')
    .controller('VpisniListCtrl', VpisniListCtrl)
    .directive('samoCrke', function() {
      return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
          function fromUser(text) {
            var transformedInput = text.replace(/[^a-zA-ZčČšŠžŽđĐćĆ]/g, '');
            if(transformedInput !== text) {
                ngModelCtrl.$setViewValue(transformedInput);
                ngModelCtrl.$render();
            }
            return transformedInput; 
          }
          ngModelCtrl.$parsers.push(fromUser);
        }
      }; 
});


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
        studen.service_kandidat(trenutni_logirani_uporabnik().uid).then(function(response){
            $scope.vl_vpisna = response.data.vpisnaStevilka;
            $scope.vl_ime = response.data.ime;
            $scope.vl_priimek = response.data.priimek;
            $scope.vl_email = response.data.email;

            $scope.vl_letnik = "1."; //kandidat se mnde vedno vpiše v prvi letnik
            $scope.vl_vrsta_vpisa = "Prvi vpis v letnik"; //mnde konstantno?
            $scope.vl_program_naziv = response.data.studijskiProgram.naziv;
            
        }).catch(function(err, status) {
            console.log("napaka pri service_kandidat");
        });
    }

    //v primeru da do vpisnega lista dostopa študent z žetonom
    else if (trenutni_logirani_uporabnik().tip === "Student") {
        studen.service_student(trenutni_logirani_uporabnik().uid).then(function(response){
            var id = $routeParams.id-1; //1 ali 2, odvisno do kterega vpisnega lista dostopamo
            $scope.vl_vpisna = response.data[id].student.vpisnaStevilka;
            $scope.vl_ime = response.data[id].student.ime;
            $scope.vl_priimek = response.data[id].student.priimek;
            $scope.vl_email = response.data[id].student.email;
            $scope.vl_telefonska = response.data[id].student.telefonskaStevilka;

            $scope.vl_letnik = response.data[id].letnik.letnik;
            $scope.vl_program_naziv = response.data[id].studijskiProgram.naziv;
            $scope.vl_vrsta_vpisa = response.data[id].vrstaVpisa.vrstaVpisa;
            $scope.vl_nacin_studija = response.data[id].nacinStudija.opis;//*/
            
        }).catch(function(err, status) {
            console.log("napaka pri service_kandidat");
        });
    }



}

