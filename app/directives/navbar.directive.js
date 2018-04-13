

var navbar = function(){
    return {
        templateUrl: "directives/navbar.template",
        controller: "navbarCtrl",
        controllerAs: "vm"
    };
};

angular
    .module('studis')
    .directive('navbar', navbar);