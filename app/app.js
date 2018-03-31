
    var app = angular.module('studis', ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/search', {
                templateUrl: "/search/search.html",
                controller: "searchCtrl",
                controllerAs: "vm"
            })
            .when('/profile/:vpisnaStevilka', {
                templateUrl: "/profile/profile.html",
                controller: "profileCtrl",
                controllerAs: "vm"
            })
            .otherwise({redirectTo: '/'});

    });
