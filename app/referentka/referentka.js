'use strict';

angular.module('myApp.referentka', ['ngRoute'])

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

.controller('ReferentkaCtrl', ['$scope', '$http', function($scope, $http) {
	//to bo v resnici false na začetku, zdej sm dala na true sam zato da se vidi forma prikaza rezultatov
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

    $http.get('http://localhost:8080/api/v1/student?filter=vpisnaStevilka:EQ:' + $scope.vpisna_isci).then(function(response) {
      if (response.data.length > 0) {
        $scope.status_iskanje = "";
        $scope.prikazi_rezultat_iskanja = true;
        $scope.studenti = response.data;
      }
      else {
        $scope.prikazi_rezultat_iskanja = false;
        $scope.status_iskanje = "ne najdem tega študenta";
      }      

    });
	};

  $scope.isci_po_zacetnicah = function() {
    if (!$scope.zac1_isci.match(/[a-z]/i) || !$scope.zac2_isci.match(/[a-z]/i)) {
      $scope.prikazi_rezultat_iskanja = false;
      $scope.status_iskanje = "za začetnici imena in priimka prosim vnesi črki [a-zA-Z]";
      return;
    }

    $http.get('http://localhost:8080/api/v1/student?filter=priimek:LIKEIC:'+$scope.zac2_isci+'%%20ime:LIKEIC:'+$scope.zac1_isci+'%'
).then(function(response) {
      if (response.data.length > 0) {
        $scope.status_iskanje = "";
        $scope.prikazi_rezultat_iskanja = true;
        $scope.studenti = response.data;
      }
      else {
        $scope.prikazi_rezultat_iskanja = false;
        $scope.status_iskanje = "ne najdem tega študenta";
      }      

    });
  }


	$scope.showContent = function($fileContent){
    $scope.prikaz_datoteke = $fileContent;
  };
  	
}]);