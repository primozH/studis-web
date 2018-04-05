angular.module('studis')
.service('refe', ['$http', function($http) {
    
    this.service_iskanje_vpisna = function(vpisna) {
        return $http.get('http://localhost:8080/api/v1/student?filter=vpisnaStevilka:EQ:' + vpisna).then(function(response) {
	      return response.data;
	    });
    }

    this.service_iskanje_zacetnice = function(ime, priimek) {
    	return $http.get('http://localhost:8080/api/v1/student?filter=priimek:LIKEIC:'+priimek+'%%20ime:LIKEIC:'+ime+'%').then(function(response) {
			return response.data;
		});
    }

    this.service_uvoz_podatkov = function (file) {
        return $http.post("http://localhost:8080/api/v1/kandidat/nalozi", file, {
            withCredentials: true,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        }).then(function(response) {
            return response.data;
        }).error(function (err, status) {
            return 500;
        });
    }
}]);