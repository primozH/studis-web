(function() {

    tokenCtrl.$inject = ["$routeParams", "$location", "examService"];

    function examCreationCtrl($routeParams, $location, examService){
        var vm = this;

        vm.createExam = function(){

        };
    }

    angular
        .module('studis')
        .controller('examCreationCtrl', examCreationCtrl);
})();