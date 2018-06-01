(function() {

    var referentService = function($http) {

        var apiVersion = "/api/v1"

        var getReferent = function (id) {
            return $http.get(apiVersion + "/referent/" + id)
                .then(function success(response) {
                    return response.data;
                }).catch(function error(err) {
                    return err;
                });
        };

        return {
            getReferent: getReferent
        };

    };

    referentService.$inject = ["$http"];

    angular
        .module("studis")
        .service("referentService", referentService);

})();