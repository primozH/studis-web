(function() {

    var examService = function($http, authentication){

        var postExamApplication = function(data){
            console.log(data);
            return $http.post("/api/v1/rok/prijava", data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var deleteExamApplication = function(data){
            console.log(data);
            return $http.post("/api/v1/rok/odjava", data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var getAvailableExams = function(studijskoLeto){
            return $http.get("/api/v1/rok?studijsko-leto=" + studijskoLeto, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var getExamsForSubjectYear = function(predmet, studijskoLeto){
            console.log("/api/v1/rok?studijsko-leto=" + studijskoLeto + "&predmet=" + predmet);
            return $http.get("/api/v1/rok?studijsko-leto=" + studijskoLeto + "&predmet=" + predmet, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var postExam = function(data){
            return $http.post("/api/v1/rok", data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };


        var putExam = function(data){
            return $http.put("/api/v1/rok", data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };


        var deleteExam = function(rokId){
            return $http.delete("/api/v1/rok/" + rokId, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };


        var getAllSubjects = function(studijskoLeto){
            return $http.get("/api/v1/predmet/izvajanje?studijsko-leto=" + studijskoLeto, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var getAllRegisteredStudents = function(rokId){
            return $http.get("/api/v1/rok/" + rokId + "/prijavljeni", {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var getExamResults = function(rokId){
            return $http.get("/api/v1/izpit/rok/" + rokId + "/rezultati", {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };


        var postExamResults = function(rokId, data){
            return $http.post("/api/v1/izpit/rok/" + rokId + "/rezultati", data, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var data = {};

        var getData = function(){
            return data;
        };

        var setData = function(newData){
            data = newData;
        };

        return{
            postExamApplication: postExamApplication,
            deleteExamApplication: deleteExamApplication,
            getAvailableExams: getAvailableExams,
            postExam: postExam,
            putExam: putExam,
            deleteExam: deleteExam,
            getExamsForSubjectYear: getExamsForSubjectYear,
            getAllSubjects: getAllSubjects,
            getAllRegisteredStudents: getAllRegisteredStudents,
            getData: getData,
            setData: setData,
            getExamResults: getExamResults,
            postExamResults: postExamResults
        };
    };

    examService.$inject = ["$http", "authentication"];

    angular
        .module('studis')
        .service('examService', examService);
})();