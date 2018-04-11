(function() {

    var navigation = function() {
        return {
            restrict: "EA",
            templateUrl: "/deljeno/directives/header.template.html",
            controller: "headerCtrl",
            controllerAs: "headvm"
        };
    };

    angular
        .module("studis")
        .directive("navigacija", navigation);
})();