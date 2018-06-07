(function() {

    loginController.$inject = ["$location", "authentication", "$interval"];

    function loginController($location, authentication, $interval) {
        var vm = this;
        var promise;

        vm.loginData = {
            email: "",
            geslo: ""
        };

        vm.email = {
            email: ""
        };

        vm.timeout = 0;

        vm.forgotPasswordClick = false;
        vm.loginErrorMsg = null;

        vm.login = function() {
            console.log(vm.loginData);

            if (vm.timeout > 0)
                return;

            authentication
                .login(vm.loginData)
                .then(
                    function success() {
                        var user = authentication.currentUser().tip;
                        console.log(user);
                        var path;
                        switch (user) {
                            case "Student":
                                path = "/student";
                                break;
                            case "Ucitelj":
                                path = "/ucitelj";
                                break;
                            case "Referent":
                                path = "/referent";
                                break;
                            case "Skrbnik":
                                path = "/skrbnik";
                        }
                        $location.path(path);
                    }, function error(error) {
                        console.log(error);
                        if (error.status == 403) {
                            vm.timeout = error.data.preostalCas;
                            promise = $interval(function() {
                                vm.timeout -= 1;
                                if (vm.timeout == 0) {
                                    $interval.cancel(promise);
                                }
                            }, 1000);
                        }
                        vm.loginErrorMsg = "Neuspešna prijava";
                    }
                );
        };

        vm.logout = function() {
            authentication.logout();
            $location.path("/profil");
        };

        vm.forgotPassword = function() {
            vm.forgotPasswordClick = true;
        };

        vm.resetPassword = function() {
            authentication.forgotPassword(email).then(function(response){
                vm.forgotPasswordMsg = "geslo ponastavljeno"
            }).catch(function(err, status) {
                vm.forgotPasswordMsg = "e-maila ni v bazi";
            });
        };
    }

    angular
        .module("studis")
        .controller("loginCtrl", loginController);
})();