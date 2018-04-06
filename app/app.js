
    var app = angular.module('studis', ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/iskanje', {
                templateUrl: "/search/search.html",
                controller: "searchCtrl",
                controllerAs: "vm"
            })
            .when('/profil/:vpisnaStevilka', {
                templateUrl: "/profile/profile.html",
                controller: "profileCtrl",
                controllerAs: "vm"
            })
            .when('/prijava', {
            templateUrl: 'prijava/prijava.html',
            controller: 'PrijavaCtrl'
            })
            .when('/referentka', {
                templateUrl: 'referentka/referentka.html',
                controller: 'ReferentkaCtrl'
            })
            .when('/student', {
                templateUrl: 'student/student.html',
                controller: 'StudentCtrl'
            })
            .otherwise({redirectTo: '/prijava'});

    });
