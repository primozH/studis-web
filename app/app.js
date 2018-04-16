(function() {

    function settings($routeProvider, $locationProvider) {
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
                templateUrl: "shared/controllers/search/search.html",
                controller: "searchCtrl",
                controllerAs: "vm"
            })
            .when('/profil/:vpisnaStevilka', {
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
                controller: 'SkrbnikCtrl',
                controllerAs: "vm"
            })
            .when('/ucitelj', {
                templateUrl: 'teacher/ucitelj.html',
                controller: 'UciteljCtrl',
                controllerAs: "vm"
            })
            .when('/vpisnilistpredmetnik/:id', {
                templateUrl: 'student/enrollment/curriculum/curriculum.controller.html',
                controller: 'VpisniListCtrl'
            })
            .when('/zeton/:id/:vrstaVpisa', {
                templateUrl: 'token/token.html',
                controller: 'tokenCtrl',
                controllerAs: "vm"
            })
            .when('/zeton', {
                templateUrl: 'token/list-tokens/tokens.html',
                controller: 'tokensCtrl',
                controllerAs: "vm"
            })
            .otherwise({redirectTo: '/prijava'});

        $locationProvider.hashPrefix('');
    }

    var app = angular.module('studis', ['ngRoute', 'ui.bootstrap', 'ngFileUpload']);

    app.config(["$routeProvider", "$locationProvider", settings]);
})();


