
angular
    .module('studis')
    .controller('tokensCtrl', tokensCtrl);

function tokensCtrl(tokenService, $location){
    var vm = this;

    vm.openToken = function(vpisnaStevilka){
        $location.path("/zeton/" + vpisnaStevilka);
    };
}
