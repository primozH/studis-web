(function() {
    auth.$inject = ["$window", "$http"];

    var apiString = "/api/v1";

    function auth($window, $http) {
        var b64Utf8 = function (niz) {
            return decodeURIComponent(Array.prototype.map.call($window.atob(niz), function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            }).join(''));
        };

        var saveToken = function(token) {
            $window.sessionStorage["studis-token"] = token;
        };

        var getToken = function() {
            return $window.sessionStorage["studis-token"];
        };

        var login = function(user) {
            return $http.post(apiString + '/avtorizacija/prijava', user)
                .then(
                    function success(response) {
                        console.log(response);
                        saveToken(response.data["access_token"]);
                    }).catch(function (err) {
                    throw err;
                });
        };

        var logout = function() {
            console.log("Removing token");
            $window.sessionStorage.removeItem("studis-token");
        };

        var forgotPassword = function(email) {
            return $http.post(apiString + '/avtorizacija/pozabljeno-geslo', email)
                .catch(function (err) {
                    return err;
                });
        };

        var isLogged = function() {
            var token = getToken();
            if (token) {
                var tokenData = JSON.parse(b64Utf8(token.split(".")[1]));
                return true;
            }
        };

        var currentUser = function() {
            if (isLogged()) {
                var token = getToken();
                var tokenData = JSON.parse(b64Utf8(token.split(".")[1]));
                return {
                    id:     tokenData.uid,
                    tip:    tokenData.tip
                }
            }
        };

        return {
            login: login,
            logout: logout,
            forgotPassword: forgotPassword,
            isLogged: isLogged,
            currentUser: currentUser
        };
    }

    angular
        .module("studis")
        .service("authentication", auth);
})();