(function() {

    var examService = function($http){

        var postExamApplication = function(){
            return 1;
        };

        var deleteExamApplication = function(){
            return 1;
        };

        return{
            postExamApplication: postExamApplication,
            deleteExamApplication: deleteExamApplication
        };
    };

    examService.$inject = ["$http"];

    angular
        .module('studis')
        .service('examService', examService);
})();