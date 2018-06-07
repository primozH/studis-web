(function() {

    ReferentkaCtrl.$inject = ["$window", "$location", "referentService", "authentication"];

    function ReferentkaCtrl($window, $location, referentService, authentication) {
        var vm = this;

        referentService.getReferent(authentication.currentUser().id)
            .then(function(response) {
                vm.referent = response;
            });

    }

    angular
        .module('studis')
        .controller('ReferentkaCtrl', ReferentkaCtrl);
})();