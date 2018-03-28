'use strict';

angular.module('myApp.prijava', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/prijava', {
    templateUrl: 'prijava/prijava.html',
    controller: 'PrijavaCtrl'
  });
}])

.controller('PrijavaCtrl', [
	'$scope', '$http', '$window',
	function($scope, $http, $window) {

	$scope.login_funkcija = function() {
    //alert($scope.elektronska_posta + $scope.geslo);
	    if (!$scope.elektronska_posta || !$scope.geslo) {
	      $scope.pokazi_napako_login = true;
	      $scope.login_status = "prosim vnesi ime in geslo za logiranje v sistem";
	      return;
	    }
	    
	    $http.post('http://localhost:3000/prijava/preveriPrijavo',
	     {elektronska_posta: $scope.elektronska_posta, geslo: $scope.geslo}).then(function(response) {      
	      if (response.data.status == "200") {
	        $window.localStorage['studis'] = response.data.token;
	        $scope.vpisanStudent = $window.localStorage['studis'];
	        $scope.trenutni_uporabnik = ($scope.usernameTrenutnoVpisanega()).username;
	        $scope.id_trenutnega_uporabnika = ($scope.usernameTrenutnoVpisanega())._id;
	      }
	      else {
	        //v primeru napake dobimo odgovor a je uporabniško ime al geslo narobe
	        $scope.login_status = response.data.vzrok;
	        $scope.pokazi_napako_login = true;
	      }
	    });
	  };


}]);