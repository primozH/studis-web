(function() {
    /* global angular */
    var app = angular.module('studis', ['ngRoute']);

    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/search', {
                templateUrl: "/search/search.html",
                controller: "searchCtrl",
                controllerAs: "vm"
            })
            .when('/profile/:uniId', {
                templateUrl: "/profile/profile.html",
                controller: "profileCtrl",
                controllerAs: "vm"
            })
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);
    });

})();