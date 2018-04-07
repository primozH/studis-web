
    var app = angular.module('studis', ['ngRoute']);

    app.config(function($routeProvider, $windowProvider) {
        //preverim kater tip uporabnika je vpisan, da mu dovolim dostop samo do njegove strani
        var $window = $windowProvider.$get();

        var zeton = $window.localStorage['studis'];
        var tip_vpisan_uporabnik = false;
        if (zeton)
            tip_vpisan_uporabnik = JSON.parse($window.atob(zeton.split('.')[1]));

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
                controller: 'ReferentkaCtrl',
                /*resolve: {
                    function(){
                        if (!tip_vpisan_uporabnik || !tip_vpisan_uporabnik.tip == "Referent") {
                            $window.location.href = '/#/prijava';
                            return;
                        }

                    }
                } //*/
                
            })
            .when('/student', {
                templateUrl: 'student/student.html',
                controller: 'StudentCtrl'
            })
            .otherwise({redirectTo: '/prijava'});

    });
