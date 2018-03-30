'use strict';

angular.module('myApp.student', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/student', {
    templateUrl: 'student/student.html',
    controller: 'StudentCtrl'
  });
}])

.controller('StudentCtrl', [function() {

}]);