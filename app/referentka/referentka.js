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
	$scope.prikazi_rezultat_iskanja = true;

	$scope.isci_po_vpisni = function() {
		$http.get('http://localhost:8080/api/v1/student/' + $scope.vpisna_isci).then(function(response) { 
	      if (response.data.length > 0) {
	      	//pokaze rezultate iskanja po vpisni stevilki
	      	//nevem zdejle cisto tocno kaj dobim v responsu, mislm ktere podatke o studentu?, bom popravla
	        $prikazi_rezultat_iskanja = true;
	        $iskanje_ime = response.data.ime;
	        $iskanje_priimek = response.data.priimek;
	        $iskanja_vpisna = response.data.vpisna;
	      }
	      else {
	      	$scope.status_iskanje = "ne najdem študenta";        
	      }
	    });
	};


	$scope.showContent = function($fileContent){
        $scope.prikaz_datoteke = $fileContent;
    };
  	
}]);