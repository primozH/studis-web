(function() {

    var navigation = function() {
        return {
            restrict: "EA",
            templateUrl: "/shared/directives/header/header.template.html",
            controller: "headerCtrl",
            controllerAs: "headvm"
        };
    };

    angular
        .module("studis")
        .directive("navigation", navigation);
})();