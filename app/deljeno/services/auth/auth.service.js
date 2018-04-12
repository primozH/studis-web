(function() {
    auth.$inject = ["$window", "$http"];

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
            return $http.post('api/v1/avtorizacija/prijava', user)
                .then(
                    function success(response) {
                        saveToken(response.data["access_token"]);
                    }).catch(function (err) {
                    return err;
                });
        };

        var logout = function() {
            $window.sessionStorage.removeItem("studis-token");
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
            saveToken: saveToken,
            getToken: getToken,
            login: login,
            logout: logout,
            isLogged: isLogged,
            currentUser: currentUser,
        };
    }

    angular
        .module("studis")
        .service("auth", auth);
})();