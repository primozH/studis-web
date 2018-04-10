angular.module('studis')
.service('studen', ['$http', '$window', function($http, $window) {
    this.service_login = function(uporabnisko_ime, geslo) {
        return $http.post('http://localhost:8080/api/v1/avtorizacija/prijava',
	     {uporabniskoIme: uporabnisko_ime, geslo: geslo}).success(function(response) {
     		return response.data;
	    }).error(function (err, status) {	    	
        });
    }


    this.service_profil = function(uid) {
    	return $http.get("http://localhost:8080/api/v1/student/" + uid).success(function(response) {
            return response;
	    }).error(function (err, status) {
            return null;        
        });
    }

    this.service_zeton = function(uid) {
        return $http.get("http://localhost:8080/api/v1/zeton/" + uid).success(function(response) {
            return response;
        }).error(function (err, status) {
            return null;        
        });
    }

    //dobi podatke o kandidatu, za vpisni list
    this.service_kandidat = function(uid) {
        return $http.get("http://localhost:8080/api/v1/kandidat/" + uid).success(function(response) {
            return response;
        }).error(function (err, status) {
            return null;        
        });
    }

    //dobi podatke iz študentovega zetona, za vpisni list
    this.service_student = function(uid) {
        return $http.get("http://localhost:8080/api/v1/zeton/" + uid).success(function(response) {
            return response;
        }).error(function (err, status) {
            return null;        
        });
    }


    
}]);