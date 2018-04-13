(function() {

    loginController.$inject = ["$location", "authentication"];

    function loginController($location, authentication) {
        var vm = this;

        vm.loginData = {
            uporabniskoIme: "",
            geslo: ""
        };

        vm.email = {
            email: ""
        };

        vm.forgotPasswordClick = false;
        vm.loginErrorMsg = null;

        vm.login = function() {
            console.log(vm.loginData);

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
                                path = "/skbnik";
                        }
                        $location.path(path);
                    }, function error(error) {
                        console.log(error);
                        vm.loginErrorMsg = error.message;
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
        }

        function countdown(timerId, timeToCount){
            var now = new Date().getTime();
            var i = document.getElementById('counter');
            var s = document.getElementById('seconds');
            i.innerHTML = Math.floor((timeToCount - now)/1000);
            if (parseInt(i.innerHTML)<= 0) {
                clearInterval(timerId);
                i.style.display = 'none';
                s.style.display = 'none';
                $('#inputField').prop('disabled', false);
                $scope.$apply(function () {
                    $scope.pokazi_napako_login = false;
                });
            }
        }

        function start(preostaliCas){
            var i = document.getElementById('counter');
            i.style.display = 'inline-block';
            i.innerHTML = preostaliCas;
            var s = document.getElementById('seconds');
            s.style.display = 'inline-block';
            var timeToCount = new Date().getTime() + 1000 * preostaliCas;
            var timerId = setInterval(function(){
                countdown(timerId, timeToCount);
            },1000);
        }
    }

    angular
        .module("studis")
        .controller("loginCtrl", loginController);
})();