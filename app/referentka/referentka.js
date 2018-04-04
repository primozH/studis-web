'use strict';

angular.module('myApp.referentka', ['ngRoute', 'referentkaService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/referentka', {
    templateUrl: 'referentka/referentka.html',
    controller: 'ReferentkaCtrl'
  });
}])

 
.directive('onReadFile', function ($parse) {
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
})

.controller('ReferentkaCtrl', ['$scope', '$http', 'refe', function($scope, $http, refe) {
	//uporablja se pr ng-show
	$scope.prikazi_rezultat_iskanja = false;

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


	$scope.showContent = function($fileContent){
    $scope.prikaz_datoteke = $fileContent;
    //alert($fileContent);
  };
  	
}]);