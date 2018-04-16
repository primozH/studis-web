(function() {

    var headerCtrl = function($location, $route, authentication, searchProfile) {

        var headvm = this;
        headvm.isLogged = authentication.isLogged();

        headvm.currentUser = authentication.currentUser();
        console.log("current user");
        console.log(headvm.currentUser);
        headvm.logout = function() {
            authentication.logout();
            $location.path("/prijava");
            $route.reload();
        };

        headvm.showEnrolmentForm = function(){
            $location.path("/student/" + headvm.currentUser.id + "/vpis");
        };

        headvm.showProfile = function() {
            //searchProfile.getStudentById(headvm.currentUser.id);
            $location.path("/profile");
        }
    };

    headerCtrl.$inject = ["$location", "$route", "authentication"];

    angular
        .module("studis")
        .controller("headerCtrl", headerCtrl);
})();