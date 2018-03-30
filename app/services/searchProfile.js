(function(){
/* global angular */

    var searchProfile = function($http){
        var getSearchRes = function (query) {
            return {"resLength":15, "results":[{"uniId": "63150111", "firstName":"Janez", "lastName":"Novak"}, {"uniId": "63150999", "firstName":"Miha", "lastName":"Vidmar"}]};
        };

        var student = null;
        var setStudent = function(st){
            student = st;
        };

        var getStudent = function(){
            return student;
        };

        return{
            getSearchRes: getSearchRes,
            setStudent: setStudent,
            getStudent: getStudent
        };
    };

    angular
        .module('studis')
        .service('searchProfile', searchProfile);

})();