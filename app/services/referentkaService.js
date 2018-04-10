angular.module('studis')
.service('refe', ['$http', function($http) {

    //vrne vse žetone
    this.service_zetoni = function() {
        return $http.get('http://localhost:8080/api/v1/zeton').then(function(response) {
            return response.data;
        });
    }
}]);