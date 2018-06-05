(function() {

    var headerCtrl = function($location, $route, authentication, searchProfile) {

        var headvm = this;
        headvm.isLogged = authentication.isLogged();

        headvm.currentUser = authentication.currentUser();

        headvm.logout = function() {
            authentication.logout();
            $location.path("/prijava");
            $route.reload();
        };

        headvm.showGradesHistory = function(){
            $location.path("/kartotecniList/" + headvm.currentUser.id);
        };

        headvm.showIndex = function(){
            $location.path("/elektronskiIndeks/" + headvm.currentUser.id);
        };

        headvm.showProfile = function() {
            $location.path("/profil/" + headvm.currentUser.id);
        }
    };

    headerCtrl.$inject = ["$location", "$route", "authentication"];

    angular
        .module("studis")
        .controller("headerCtrl", headerCtrl);
})();