(function() {

    tokenCtrl.$inject = ["$routeParams", "$location", "examService"];

    function tokenCtrl($routeParams, $location, examService){
        var vm = this;

        vm.applyForExam = function(){

        };
    }

    angular
        .module('studis')
        .controller('examAppCtrl', examAppCtrl);
})();