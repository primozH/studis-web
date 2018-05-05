(function() {

    enterResultsSelectCtrl.$inject = ["$routeParams", "$location", "examService"];

    function enterResultsSelectCtrl($routeParams, $location, examService){
        var vm = this;

        $('.selectpicker').selectpicker({
            size: 5
        });

        vm.enterResults = function(){

        };
    }

    angular
        .module('studis')
        .controller('enterResultsSelectCtrl', enterResultsSelectCtrl);
})();