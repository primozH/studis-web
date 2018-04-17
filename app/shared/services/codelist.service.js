(function() {

    codeListService.$inject = ["$http"];
    function codeListService($http) {
        var apiBase = "/api/v1/sifranti";
        var sex = null;
        var countries = null;
        var posts = null;
        var municipalities = null;

        var getGender = function(refresh) {
            if (sex != null && !refresh)
                 return Promise.resolve(sex);
            return $http.get(apiBase + "/spol")
                .then(function (response) {
                    sex = response.data;
                    return sex;
                }, function (err) {
                     console.log(err);
                }
            )
        };

        var getCountry = function(refresh) {
            if (countries != null && !refresh) {
                return Promise.resolve(countries);
            }
            return $http.get(apiBase + "/drzava")
                .then(function(response) {
                    country = response.data;
                    return country;
                }, function(err) {
                    console.log(err);
                });
            };

        var getPosts = function(refresh) {
            if (posts != null && !refresh) {
                return Promise.resolve(posts);
            }
            return $http.get(apiBase + "/posta")
                .then(function(response) {
                    posts = response.data;
                    return posts;
                }, function(err) {
                    console.log(err);
                });
        };

        var getMunicipalities = function(refresh) {
            if (municipalities != null && !refresh) {
                return Promise.resolve(posts);
            }
            return $http.get(apiBase + "/obcina")
                .then(function(response) {
                    municipalities = response.data;
                }, function(err) {
                    console.log(err);
                });
        };

        return {
            getCountries: getCountry,
            getGender: getGender,
            getPosts: getPosts,
            getMunicipalities: getMunicipalities
        };
    }

    angular
        .module("studis")
        .service("codeListService", codeListService);
})();