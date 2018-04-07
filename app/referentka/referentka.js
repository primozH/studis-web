'use strict';

angular
    .module('studis')
    .controller('ReferentkaCtrl', ReferentkaCtrl);
 

function ReferentkaCtrl($scope, $http, $window, refe) {
  var vsebina_datoteke = null;	

  $scope.logout = function() {
    $window.localStorage.removeItem('studis');
    $window.localStorage.removeItem("tip");
    $window.location.reload();
    $window.location.href = '/#/prijava';
  }

};