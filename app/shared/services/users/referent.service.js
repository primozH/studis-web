(function() {

    var referentService = function($http) {

    };

    referentService.$inject = ["$http"];

    angular
        .module("studis")
        .service("referentService", referentService);

})();