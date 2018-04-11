(function() {

    headerCtrl.$inject = ["$location", "$route", "auth"];

    var headerCtrl = function($location, $route, auth) {
        var headvm = this;

        headvm.isLogged = auth.isLogged();

        headvm.currentUser = auth.currentUser();

        headvm.logout = function() {
            auth.logout();
            $location.path("/prijava");
            $route.reload();
        }
    };

    angular
        .module("studis")
        .controller("headerCtrl", headerCtrl);
})();