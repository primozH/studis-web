
angular
    .module('studis')
    .controller('tokenCtrl', tokenCtrl);

function tokenCtrl(tokenService){
    var vm = this;
    vm.token = tokenService.getToken();
    console.log(vm.token);
}
