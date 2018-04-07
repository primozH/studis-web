
angular
    .module('studis')
    .controller('tokensCtrl', tokensCtrl);

function tokensCtrl(tokenService, $location){
    var vm = this;

    tokenService.getTokens()
        .then(
            function success(response){
                vm.tokens = response.data;
                console.log("response in tokens controller:");
                console.log(vm.tokens);
            },
            function error(error){
                console.log(error);
            }
        );

    vm.openToken = function(id, vrstaVpisa){
        $location.path("/zeton/" + id + "/" + vrstaVpisa);
    };
}
