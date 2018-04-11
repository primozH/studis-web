
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
            } return transformedInput; 
          } ngModelCtrl.$parsers.push(fromUser);
        }
      }; 
});


function VpisniListCtrl($scope, $window, $routeParams, studen){
    $scope.vl_rojstvo = new Date(1996, 1, 1); //year month(0=januar) day

    //zamenja char v stringu
    function setCharAt(str,index,chr) {
        if(index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index+1);
    }
    
    $scope.primerjaj_rojstvo_emso = function() {
        var rojstvo = document.getElementById("date").value;
        var emso = $scope.vl_emso;
        if (emso == null) emso = "00000000"; //če je biu emšo prej prazen
        
        emso = setCharAt(emso, 0, rojstvo.charAt(8));//dan rojstva
        emso = setCharAt(emso, 1, rojstvo.charAt(9));
        emso = setCharAt(emso, 2, rojstvo.charAt(5));//mesec rojstva
        emso = setCharAt(emso, 3, rojstvo.charAt(6));
        emso = setCharAt(emso, 4, rojstvo.charAt(0));//leto rojstva
        emso = setCharAt(emso, 5, rojstvo.charAt(1));
        emso = setCharAt(emso, 6, rojstvo.charAt(2));
        emso = setCharAt(emso, 7, rojstvo.charAt(3));
        $scope.vl_emso = emso;
    }
    $scope.primerjaj_emso_rojstvo = function() {
        var emso = $scope.vl_emso;
        var leto = emso.substring(4,8);
        var mesec = (parseInt(emso.substring(2,4))-1);
        var dan = emso.substring(0,2);
        $scope.vl_rojstvo = new Date(leto, mesec, dan);        
    }


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
            $scope.vl_nacin_studija = response.data[id].nacinStudija.opis.replace(/\b\w/g, l => l.toUpperCase());//*/
            studen.service_predmetnik(response.data[id]).then(function(response) {
                console.log("successss");
                var jsonTxt = '{ "predmet" : [' +
                           '{"ucitelj":"John",' +
                           '"ime_predmeta":"Matematika" ,' +
                           '"krediti":"6"} ,' +
                           '{"ucitelj":"Mtevz",' +
                           '"ime_predmeta":"Fizika" ,' +
                           '"krediti":"5" }]}';
                var json = JSON.parse(jsonTxt);
                var skupnoStKt = 0;
                for (var i = 0; i < json.length; i++) {
                    var html =      "<tr>"
                                +       "<td>" + json.predmet[i].ucitelj + "</td>"
                                +       "<td>" + json.predmet[i].ime_predmeta + "</td>"
                                +       "<td>" + json.predmet[i].krediti + "</td>"
                                +   "</td>"
                                ;
                    console.log("tml = " + html);
                    $(html).appendTo($("#predmetnik_table"));
                }
                $scope.vl_skupno_st_kt = skupnoStKt;

            }).catch(function(err, status) {
                console.log("napaka pri service_predmet");
            });
        }).catch(function(err, status) {
            console.log("napaka pri service_kandidat");
        });
    }

    var preveri_osebne_podatke_in_zamenjaj_formo = function() {
        console.log("inside");
        console.log($("#id_osebni_podatki").val);
        $("#id_osebni_podatki").attr('id').hide();
        $("#id_predmetnik").attr('id').show();
        $("#nazaj").attr('id').show();
    }

}

