'use strict';

angular
    .module('studis')
    .controller('SkrbnikCtrl', SkrbnikCtrl);
 
angular.module('studis').directive('onReadFile', function ($parse) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
      var fn = $parse(attrs.onReadFile); 
      element.on('change', function(onChangeEvent) {
        var reader = new FileReader(); 
        reader.onload = function(onLoadEvent) {
          scope.$apply(function() {
            fn(scope, {$fileContent:onLoadEvent.target.result});
          });
        }; 
        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
      });
    }
  };
})

angular.module('studis').directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);


function SkrbnikCtrl($scope, $http, $window) {
  var vsebina_datoteke = null;	

  $scope.logout = function() {
    $window.localStorage.removeItem('studis');
    $window.localStorage.removeItem("tip");
    $window.location.reload();
    $window.location.href = '/#/prijava';
  }

	$scope.showContent = function($fileContent){
    $scope.prikaz_datoteke = $fileContent;
    vsebina_datoteke = $fileContent;
  };
  	
  $scope.uploadFile = function(){
    var file = $scope.myFile;
    if (!file) {
      $scope.error_uvoz = "Izberi datoteko za uvoz";
      return;
    }
    
    


    var fd = new FormData();
    fd.append('file', file);
    $http.post('http://localhost:8080/api/v1/kandidat/nalozi', fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
    })
    .success(function(response){
      $scope.error_uvoz = "uspešno uvoženi podatki"
      $scope.uvozeni_zapisi_naslov = true;
      $scope.vrnjeni_zapisi = response;
    })
    .error(function(err){
      $scope.error_uvoz = "prišlo je do napake pri uvozu"
    });



  };


};