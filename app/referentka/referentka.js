'use strict';

angular.module('myApp.referentka', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/referentka', {
    templateUrl: 'referentka/referentka.html',
    controller: 'ReferentkaCtrl'
  });
}])

.controller('ReferentkaCtrl', [function() {

}]);