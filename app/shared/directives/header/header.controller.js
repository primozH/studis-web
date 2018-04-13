(function() {

    var headerCtrl = function($location, $route, authentication) {

        var headvm = this;
        headvm.isLogged = authentication.isLogged();

        headvm.currentUser = authentication.currentUser();

        headvm.logout = function() {
            authentication.logout();
            $location.path("/prijava");
            $route.reload();
        };

        headvm.showProfile = function() {
            $location.path("/profile");
        }
    };

    headerCtrl.$inject = ["$location", "$route", "authentication"];

    angular
        .module("studis")
        .controller("headerCtrl", headerCtrl);
})();