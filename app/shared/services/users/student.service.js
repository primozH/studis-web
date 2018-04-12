(function() {

    studentService.$inject = ["$http"];
    var apiVersion = "/api/v1";

    function studentService() {

        var getStudent = function (id) {
            return $http.get(apiVersion + "/student/" + id)
                .then(function success(response) {
                    return response;
                }).catch(function error(err) {
                    return err;
                });
        };

        var updateStudent = function(student) {
            return $http.put(apiVersion + "/student/" + id, student)
                .then(function (response) {
                    return response;
                }).catch(function (err) {
                    return err;
                });
        };

        var getCandidate = function (uid) {
            return $http.get(apiVersion + "/kandidat/" + uid).then(function (response) {
                return response;
            }).catch(function (err, status) {
                return null;
            });
        };

        var getCurriculum = function (zeton) {
            return $http.post(apiVersion + "/predmetnik/", zeton).then(function (response) {
                console.log('ok');
                return response;
            }).catch(function (err, status) {
                console.log("null");
                return null;
            });

        };

        return {
            getStudent: getStudent,
            getCandidate: getCandidate,
            getCurriculum: getCurriculum
        };
    }

    angular.module("studis")
        .service("studentService", studentService);
})();