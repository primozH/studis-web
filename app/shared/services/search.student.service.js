(function() {
    var searchStudentService = function($http){

        var searchFilter = null;

        var getSearchFilter = function() {
            return searchFilter;
        };

        var getSearchRes = function (query) {
            searchFilter = query;
            return $http.get("/api/v1/student?filter=" + query)
                .then(function(response) {
                    return response;
                });
        };

        var getStudentById = function(id){
            return $http.get("/api/v1/student/" + id);
        };

        var getStudent = function(vpisnaStevilka){
            return $http.get("/api/v1/student?filter=" + vpisnaStevilka );
        };

        var getVpis = function(id){
            return $http.get("/api/v1/student/" + id + "/vpis");
        };

        return{
            getStudentById: getStudentById,
            getVpis: getVpis,
            getSearchRes: getSearchRes,
            getStudent: getStudent,
            getSearchFilter: getSearchFilter
        };
    };

    angular
        .module('studis')
        .service('searchProfile', searchStudentService);

})();
