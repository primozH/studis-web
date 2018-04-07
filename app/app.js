
    var app = angular.module('studis', ['ngRoute']);

    app.config(function($routeProvider, $windowProvider) {
        var $window = $windowProvider.$get();


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
                resolve: {
                    function(){
                        if (!$window.localStorage.getItem("tip") || !($window.localStorage.getItem("tip") === "Referent"))  {
                            console.log("Vpiši se kot referentka, drgač nemoreš do /referentka");
                            $window.location.href = '/#/prijava';
                            return;
                        }
                    }
                }                
            })
            .when('/student', {
                templateUrl: 'student/student.html',
                controller: 'StudentCtrl',
                resolve: {
                    function(){
                        console.log($window.localStorage.getItem("tip"));
                        if (!$window.localStorage.getItem("tip") || !($window.localStorage.getItem("tip") === "Student" || $window.localStorage.getItem("tip") === "Kandidat"))  {
                            console.log("Vpiši se kot student, drgač nemoreš do /student");
                            $window.location.href = '/#/prijava';
                            return;
                        }
                    }
                } 
            })
            .when('/skrbnik', {
                templateUrl: 'skrbnik/skrbnik.html',
                controller: 'SkrbnikCtrl',
                resolve: {
                    function(){
                        if (!$window.localStorage.getItem("tip") || !($window.localStorage.getItem("tip") === "Skrbnik"))  {
                            console.log("Vpiši se kot skrbnik, drgač nemoreš do /skrbnik");
                            $window.location.href = '/#/prijava';
                            return;
                        }
                    }
                }                
            })
            .when('/ucitelj', {
                templateUrl: 'ucitelj/ucitelj.html',
                controller: 'UciteljCtrl',
                resolve: {
                    function(){
                        if (!$window.localStorage.getItem("tip") || !($window.localStorage.getItem("tip") === "Ucitelj"))  {
                            console.log("Vpiši se kot ucitelj, drgač nemoreš do /ucitelj");
                            $window.location.href = '/#/prijava';
                            return;
                        }
                    }
                }                
            })
            .when('/vpisnilist', {
                templateUrl: 'vpisniList/vpisniList.html',
                controller: 'VpisniListCtrl',
                resolve: {
                    function(){
                        if (!$window.localStorage.getItem("tip") || !($window.localStorage.getItem("tip") === "Kandidat"))  {
                            console.log("Vpiši se kot kandidat, drgač nemoreš do /vpisnilist");
                            $window.location.href = '/#/prijava';
                            return;
                        }
                    }
                }      
                          
            })
            .otherwise({redirectTo: '/prijava'});

    });
