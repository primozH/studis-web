(function() {

    examAppCtrl.$inject = ["$routeParams", "$location", "examService"];

    function examAppCtrl($routeParams, $location, examService){
        var vm = this;

        vm.applyForExam = function(){

        };
    }

    angular
        .module('studis')
        .controller('examAppCtrl', examAppCtrl);
})();