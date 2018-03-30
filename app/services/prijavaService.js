angular.module('prijavaService', [])
.service('auth', ['$http', '$window', function($http, $window) {
    this.service_login = function(email, geslo) {
        $http.post('http://localhost:8080/api/v1/prijava/preveriPrijavo',
	     {email: email, geslo: geslo}).then(function(response) {
	     //to bo za popravit glede na to kaj bom iz backenda točno dobila    
	      /*if (response.data.status == "200") {
	        $window.localStorage['myApp.prijava'] = response.data.token;
	        $scope.vpisanStudent = $window.localStorage['myApp.prijava'];
	        $scope.trenutni_uporabnik = ($scope.usernameTrenutnoVpisanega()).username;
	        $scope.id_trenutnega_uporabnika = ($scope.usernameTrenutnoVpisanega())._id;
	      }
	      else {
	        //v primeru napake dobimo odgovor a je uporabniško ime al geslo narobe
	        $scope.login_status = response.data.vzrok;
	        $scope.pokazi_napako_login = true;
	      }//*/
	    });
    }

    this.service_pridobi_clientip = function() {
    	return $http.get('//freegeoip.net/json/?callback=').then(function(response) {
			return response.data.ip;
		});
    }

    this.service_geslo_reset = function() {
    	$http.get('http://localhost:8080/api/v1/prijava/posljiGesloNaMail').then(function(response) {      

	    });
    }
}]);