(function() {

    enterResultsTableCtrl.$inject = ["$routeParams", "$location", "examService"];

    function enterResultsTableCtrl($routeParams, $location, examService){
        var vm = this;

        $('.selectpicker').selectpicker();

    }

    angular
        .module('studis')
        .controller('enterResultsTableCtrl', enterResultsTableCtrl);
})();