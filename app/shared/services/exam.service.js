(function() {

    var examService = function($http, authentication){

        var postExamApplication = function(data){
            console.log(data);
            return $http.post("/api/v1/izpit/prijava", data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var deleteExamApplication = function(data){
            return $http.post("/api/v1/izpit/odjava", data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var getAvailableExams = function(){
            return $http.get("/api/v1/izpit/rok?studijsko-leto=2018", {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var getExamsForSubject = function(predmet){
            return $http.get("/api/v1/izpit/rok?studijsko-leto=2018&predmet=" + predmet, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var postExam = function(predmet, data){
            console.log(data);
            return $http.post("/api/v1/izpit/vnos-roka?predmet=" + predmet + "&studijsko-leto=2018&vnasalec=" + data.izvajalec.id, data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var getAllSubjects = function(){
            return $http.get("/api/v1/predmet/izvajanje?studijsko-leto=2018", {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };


        return{
            postExamApplication: postExamApplication,
            deleteExamApplication: deleteExamApplication,
            getAvailableExams: getAvailableExams,
            postExam: postExam,
            getExamsForSubject: getExamsForSubject,
            getAllSubjects: getAllSubjects
        };
    };

    examService.$inject = ["$http", "authentication"];

    angular
        .module('studis')
        .service('examService', examService);
})();