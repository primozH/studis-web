'use strict';

//angular.module('myApp.referentka', ['ngRoute', 'referentkaService'])

angular
    .module('studis')
    .controller('ReferentkaCtrl', ReferentkaCtrl);
 
angular.module('studis').directive('onReadFile', function ($parse) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
      var fn = $parse(attrs.onReadFile); 
      element.on('change', function(onChangeEvent) {
        var reader = new FileReader(); 
        reader.onload = function(onLoadEvent) {
          scope.$apply(function() {
            fn(scope, {$fileContent:onLoadEvent.target.result});
          });
        }; 
        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
      });
    }
  };
})//*/

function ReferentkaCtrl($scope, $http, $window, refe) {
	//uporablja se pr ng-show
	$scope.prikazi_rezultat_iskanja = false;
  var vsebina_datoteke = null;

	$scope.isci_po_vpisni = function() {
    if ($scope.vpisna_isci.match(/^[0-9]+$/) === null) {
      $scope.prikazi_rezultat_iskanja = false;
      $scope.status_iskanje = "vpisna številka naj bo naravno število";
      return;
    }
    if ($scope.vpisna_isci.length != 8) {
      $scope.prikazi_rezultat_iskanja = false;
      $scope.status_iskanje = "vpisna številka mora biti dolga 8 znakov";
      return;
    }

    refe.service_iskanje_vpisna($scope.vpisna_isci).then(function(vrnjenSeznam){
      if (vrnjenSeznam.length > 0) {
        $scope.status_iskanje = "";
        $scope.prikazi_rezultat_iskanja = true;
        $scope.studenti = vrnjenSeznam;
      }
      else {
        $scope.prikazi_rezultat_iskanja = false;
        $scope.status_iskanje = "ne najdem tega študenta";
      }
    });
	};

  $scope.isci_po_zacetnicah = function() {
    //tale regex morm razširt da bo še č/š/ž-je sprejel pr iskanju
    if (!$scope.zac1_isci.match(/[a-z]/i) || !$scope.zac2_isci.match(/[a-z]/i)) {
      $scope.prikazi_rezultat_iskanja = false;
      $scope.status_iskanje = "za začetnici imena in priimka prosim vnesi črki [a-zA-Z]";
      return;
    }

    refe.service_iskanje_zacetnice($scope.zac1_isci, $scope.zac2_isci).then(function(vrnjenSeznam){
      if (vrnjenSeznam.length > 0) {
        $scope.status_iskanje = "";
        $scope.prikazi_rezultat_iskanja = true;
        $scope.studenti = vrnjenSeznam;
      }
      else {
        $scope.prikazi_rezultat_iskanja = false;
        $scope.status_iskanje = "ne najdem tega študenta";
      }   
    });
  }

  $scope.logout = function() {
    $window.localStorage.removeItem('studis');
    $window.localStorage.removeItem("tip");
    $window.location.reload();
    $window.location.href = '/#/prijava';
  }


	$scope.showContent = function($fileContent){
    $scope.prikaz_datoteke = $fileContent;
    //vsebino datoteke rabim v drugi funkciji za upload na server
    vsebina_datoteke = $fileContent;
  };
  	
  $scope.uvoz_podatkov = function(file){
    //POST: kandidat/nalozi


    var formData = new FormData();
    formData.append('file', file);
    $http.post('http://localhost:8080/api/v1/kandidat/nalozi', formData, {
       transformRequest: angular.identity,
       headers: {'Content-Type': undefined}
    }).then(function (response) {
       console.log("uspešno");
    }); //*/
  };

  $scope.uploadFile = function(files) {
    var fd = new FormData();
    //Take the first selected file
    fd.append("file", files[0]);

    $http.post('http://localhost:8080/api/v1/kandidat/nalozi', fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).success(function(response) {
          console.log(response);
      }).error(function (err, status) {
            console.log("neuspešnooo");       
        });

};


};