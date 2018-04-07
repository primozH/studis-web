
angular
    .module('studis')
    .controller('tokenCtrl', tokenCtrl);

function tokenCtrl(tokenService, $routeParams){
    var vm = this;

    tokenService.getToken($routeParams.id, $routeParams.vrstaVpisa)
        .then(
            function success(response){
                vm.token = response.data;
                console.log(vm.token);
            },
            function error(error){
                console.log(error);
            }
        );


    console.log(vm.token);
}
