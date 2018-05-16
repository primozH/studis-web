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

        var getAvailableExams = function(){
            return $http.get("/api/v1/rok?studijsko-leto=2018", {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var getExamsForSubject = function(predmet){
            return $http.get("/api/v1/rok?studijsko-leto=2018&predmet=" + predmet, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var postExam = function(data){
            console.log(data);
            return $http.post("/api/v1/rok", data, {
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
            return $http.get("/api/v1/rok/" + rokId + "prijavljeni", {
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
            getExamsForSubject: getExamsForSubject,
            getAllSubjects: getAllSubjects,
            getAllRegisteredStudents: getAllRegisteredStudents,
            getData: getData,
            setData: setData
        };
    };

    examService.$inject = ["$http", "authentication"];

    angular
        .module('studis')
        .service('examService', examService);
})();