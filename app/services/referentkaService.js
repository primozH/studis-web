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
}]);