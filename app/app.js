(function() {

    function settings($routeProvider, $windowProvider) {
        $routeProvider
            .when('/prijava', {
                templateUrl: 'login/login.template.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .when('/student', {
                templateUrl: 'student/dashboard/student.dashboard.template.html',
                controller: 'studentCtrl',
                controllerAs: 'vm'
            })
            .when('/student/:id/vpis', {
                templateUrl: 'student/enrollment/student-data/student.data.template.html',
                controller: 'VpisniListCtrl'
            })
            .when('/iskanje', {
                templateUrl: "/search/search.html",
                controller: "searchCtrl",
                controllerAs: "vm"
            })
            .when('/profile/:vpisnaStevilka', {
                templateUrl: "/profile/profile.html",
                controller: "profileCtrl",
                controllerAs: "vm"
            })
            .when('/referent', {
                templateUrl: 'referent/referentka.html',
                controller: 'ReferentkaCtrl',
                controllerAs: "vm"
            })
            .when('/skrbnik', {
                templateUrl: 'admin/skrbnik.html',
                controller: 'SkrbnikCtrl'
            })
            .when('/ucitelj', {
                templateUrl: 'teacher/ucitelj.html',
                controller: 'UciteljCtrl'
            })
            .when('/vpisnilistpredmetnik/:id', {
                templateUrl: 'student/enrollment/curriculum/curriculum.controller.html',
                controller: 'VpisniListCtrl'
            })
            .when('/zeton/:id/:vrstaVpisa', {
                templateUrl: 'token/token.template.html',
                controller: 'tokenCtrl',
                controllerAs: "vm"
            })
            .when('/zeton', {
                templateUrl: 'token/list-tokens/tokens.html',
                controller: 'tokensCtrl',
                controllerAs: "vm"
            })
            .otherwise({redirectTo: '/prijava'});

    }

    var app = angular.module('studis', ['ngRoute', 'ui.bootstrap']);

    app.config(["$routeProvider", "$locationProvider", settings]);

})();


