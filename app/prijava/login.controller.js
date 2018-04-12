(function() {

    loginController.$inject = ["$location", "auth"];

    function loginController($location, auth) {
        var vm = this;

        vm.loginData = {
            uporabniskoIme: "",
            geslo: ""
        };

        vm.login = function() {
            console.log(vm.loginData);

            auth
                .login(vm.loginData)
                .then(
                    function success() {
                        var user = auth.currentUser().tip;
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
                    }
                );
        };
    }

    angular
        .module("studis")
        .controller("loginCtrl", loginController);
})();