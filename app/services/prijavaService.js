angular.module('prijavaService', [])
.service('auth', ['$http', '$window', function($http, $window) {
    this.service_login = function(email, geslo) {
        return $http.post('http://localhost:8080/api/v1/avtorizacija/prijava',
	     {email: email, geslo: geslo}).success(function(response) {
     		return response.data;
	    }).error(function (err, status) {	    	
        });
    }


    this.service_geslo_reset = function(email2) {
    	return $http.post('http://localhost:8080/api/v1/avtorizacija/pozabljeno-geslo',
            {email: email2}).success(function(response) {      
                return 200;
	    }).error(function (err, status) {
            return 404;        
        });
    }
}]);