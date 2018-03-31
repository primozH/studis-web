angular.module('prijavaService', [])
.service('auth', ['$http', '$window', function($http, $window) {
    this.service_login = function(email, geslo) {
        return $http.post('http://localhost:8080/api/v1/avtorizacija/prijava',
	     {email: email, geslo: geslo}).success(function(response) {
     		return response.data;
	    }).error(function (err, status) {	    	
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