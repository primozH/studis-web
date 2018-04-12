
    var app = angular.module('studis', ['ngRoute']);

    var roles = {
        skrbnik: "Skrbnik",
        ucitelj: "Ucitelj",
        student: "Student",
        referent: "Referent"
    }

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
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .when('/referentka', {
                templateUrl: 'referentka/referentka.html',
                controller: 'ReferentkaCtrl',
                resolve: {
                    'auth' : function(AuthService){
                        return AuthService.authenticate(roles.referent);
                    }
                }                
            })
            .when('/student', {
                templateUrl: 'student/student.html',
                controller: 'StudentCtrl',
                resolve: {
                    'auth': function(AuthService) {
                        return AuthService.authenticate(roles.student);
                    }
                } 
            })
            .when('/skrbnik', {
                templateUrl: 'skrbnik/skrbnik.html',
                controller: 'SkrbnikCtrl',
                resolve: {
                    function(){
                        if (!$window.localStorage.getItem("tip") || !($window.localStorage.getItem("tip") === "Skrbnik"))  {
                            console.log("Vpiši se kot skrbnik, drugače nemoreš do /skrbnik");
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
                            console.log("Vpiši se kot ucitelj, drugače nemoreš do /ucitelj");
                            $window.location.href = '/#/prijava';
                            return;
                        }
                    }
                }                
            })
            .when('/vpisnilist/:id', {
                templateUrl: 'vpisniList/vpisniList.html',
                controller: 'VpisniListCtrl',
                resolve: {
                    function(){
                        if (!$window.localStorage.getItem("tip") || !($window.localStorage.getItem("tip") === "Kandidat" || $window.localStorage.getItem("zeton") === "ima1" 
                            || $window.localStorage.getItem("zeton") === "ima2"))  {
                            console.log("Vpiši se kot kandidat ali študent z žetonom, drugače nemoreš do /vpisnilist");
                            $window.location.href = '/#/prijava';
                            return;
                        }
                    }
                }      
                          
            })
            .when('/zeton_uredi/:id', {
                templateUrl: 'zeton/zeton.html',
                controller: 'ZetonCtrl',
                resolve: {
                    function(){
                        if (!$window.localStorage.getItem("tip") || !($window.localStorage.getItem("tip") === "Referent"))  {
                            console.log("Vpiši se kot referentka, drugače nemoreš do /zeton_uredi");
                            $window.location.href = '/#/prijava';
                            return;
                        }
                    }
                }      
                          
            })
            .otherwise({redirectTo: '/prijava'});

    }).run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
            if(rejection === 'Not Authenticated'){
                $location.path('/prijava');
            }
        })
    }).factory('AuthService', function($q, auth) {
        return {
            authenticate: function(role){
                var isAuthenticated = false;
                var userRole = auth.currentUser.tip;
                if (userRole == role)
                    isAuthenticated = true;

                if (isAuthenticated){
                    return true;
                } else {
                    return $q.reject("Not Authenticated");
                }
            }
        }
    });
