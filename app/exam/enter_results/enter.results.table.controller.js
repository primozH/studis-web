(function() {

    enterResultsTableCtrl.$inject = ["$routeParams", "$location", "examService"];

    function enterResultsTableCtrl($routeParams, $location, examService){
        var vm = this;

        $('.selectpicker').selectpicker();

        console.log($routeParams.rokId);
        examService.getExamResults($routeParams.rokId)
            .then(
                function success(response){
                    console.log(response);
                },
                function error(error){
                    console.log(error);
                }
            );

        vm.postExamResults = function(){
            var data = {};
            //[ { "student": { "id": 57 }, "predmet": { "sifra": 63280 }, "ocenaPisno": 45, "koncnaOcena": 5 } ]
            examService.postExamResults($routeParams.rokId, data)
                .then(
                    function success(response){
                        console.log(response);
                    },
                    function error(error){
                        console.log(error);
                    }
                );
        };

    }

    angular
        .module('studis')
        .controller('enterResultsTableCtrl', enterResultsTableCtrl);
})();