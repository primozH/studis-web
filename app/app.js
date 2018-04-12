(function() {

    function settings($routeProvider, $windowProvider) {
        $routeProvider
            .when('/prijava', {
                templateUrl: 'login/login.template.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
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
                resolve: {
                    function(){
                        if (!$window.localStorage.getItem("tip") || !($window.localStorage.getItem("tip") === "Referent"))  {
                            console.log("Vpiši se kot referent, drugače nemoreš do /referent");
                            $window.location.href = '/#/login';
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
                            console.log("Vpiši se kot student, drugače nemoreš do /student");
                            $window.location.href = '/#/login';
                        }
                    }
                }
            })
            .when('/admin', {
                templateUrl: 'admin/skrbnik.html',
                controller: 'SkrbnikCtrl',
                resolve: {
                    function(){
                        if (!$window.localStorage.getItem("tip") || !($window.localStorage.getItem("tip") === "Skrbnik"))  {
                            console.log("Vpiši se kot admin, drugače nemoreš do /admin");
                            $window.location.href = '/#/login';
                        }
                    }
                }
            })
            .when('/teacher', {
                templateUrl: 'teacher/ucitelj.html',
                controller: 'UciteljCtrl',
                resolve: {
                    function(){
                        if (!$window.localStorage.getItem("tip") || !($window.localStorage.getItem("tip") === "Ucitelj"))  {
                            console.log("Vpiši se kot teacher, drugače nemoreš do /teacher");
                            $window.location.href = '/#/login';
                        }
                    }
                }
            })
            .when('/vpisnilist/:id', {
                templateUrl: 'student/enrollment/student-data/student.data.template.html',
                controller: 'VpisniListCtrl',
                resolve: {
                    function(){
                        if (!$window.localStorage.getItem("tip") || !($window.localStorage.getItem("tip") === "Kandidat" || $window.localStorage.getItem("zeton") === "ima1"
                            || $window.localStorage.getItem("zeton") === "ima2"))  {
                            console.log("Vpiši se kot kandidat ali študent z žetonom, drugače nemoreš do /vpisnilist");
                            $window.location.href = '/#/login';
                        }
                    }
                }
            })
            .when('/vpisnilistpredmetnik/:id', {
                templateUrl: 'student/enrollment/curriculum/curriculum.controller.html',
                controller: 'VpisniListCtrl',
                resolve: {
                    function(){
                        if (!$window.localStorage.getItem("tip") || !($window.localStorage.getItem("tip") === "Kandidat" || $window.localStorage.getItem("zeton") === "ima1"
                            || $window.localStorage.getItem("zeton") === "ima2"))  {
                            console.log("Vpiši se kot kandidat ali študent z žetonom, drugače nemoreš do /vpisnilistpredmetnik");
                            $window.location.href = '/#/login';
                        }
                    }
                }
            })
            .when('/zeton/:id/:vrstaVpisa', {
                templateUrl: 'token/token.html',
                controller: 'tokenCtrl',
                controllerAs: "vm"
            })
            .when('/zetoni', {
                templateUrl: 'tokens/tokens.html',
                controller: 'tokensCtrl',
                controllerAs: "vm"
            })
            .when('/zeton_uredi/:id', {
                templateUrl: 'zeton/zeton.html',
                controller: 'ZetonCtrl',
                resolve: {
                    function(){
                        if (!$window.localStorage.getItem("tip") || !($window.localStorage.getItem("tip") === "Referent"))  {
                            console.log("Vpiši se kot referent, drugače nemoreš do /zeton_uredi");
                            $window.location.href = '/#/login';
                            return;
                        }
                    }
                }

            })
            .otherwise({redirectTo: '/login'});


        var $window = $windowProvider.$get();

    }

    var app = angular.module('studis', ['ngRoute', 'ui.bootstrap']);

    app.config(["$routeProvider", "$locationProvider", settings])

})();


