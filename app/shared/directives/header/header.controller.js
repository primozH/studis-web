(function() {

    var headerCtrl = function($location, $route, authentication) {

        var headvm = this;
        headvm.isLogged = authentication.isLogged();

        headvm.currentUser = authentication.currentUser();

        headvm.logout = function() {
            authentication.logout();
            $location.path("/login");
            $route.reload();
        };
    };

    headerCtrl.$inject = ["$location", "$route", "authentication"];

    angular
        .module("studis")
        .controller("headerCtrl", headerCtrl);
})();