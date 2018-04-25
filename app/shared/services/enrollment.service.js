(function() {

    enrollmentService.$inject = ["$http", "$window", "studentService"];

    function enrollmentService($http, $window, studentService) {

        var apiBase = "/api/v1";

        var student;
        var token;

        studentService.getStudent()
            .then(function(response) {
                student = response;
            }, function(err) {
                console.log(err);
            });

        var getCurriculum = function(type, token) {
            return $http.post(apiBase + "/predmetnik/" + type, token)
                .then(function(response) {
                    return response.data;
                }, function(err) {
                    return err;
                })
        };

        var enroll = function(id, enrollment) {
            return $http.post(apiBase + "/student/" + id + "/vpis", enrollment)
                .then(function(response) {
                    console.log(response);
                    if (response.status == 409)
                        throw error("Napaka pri vpisu");
                    return response.data;
                }, function(err) {
                    return err;
                });
        };

        return {
            getCurriculum: getCurriculum,
            enroll: enroll
        };
    }

    angular
        .module("studis")
        .service("enrollmentService", enrollmentService);
})();