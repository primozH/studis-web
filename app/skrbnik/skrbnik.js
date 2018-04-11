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
}]).config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
}]);


function SkrbnikCtrl($scope, $http, $window) {
  var vsebina_datoteke = null;
  //prikaže neuspešno uvožene
  $scope.napaka_uvozeni_zapisi = false;

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
    .then(function(response){
      console.log(response);
      $scope.error_uvoz = "uspešno uvoženi podatki"
      $scope.uvozeni_zapisi_naslov = true;
      $scope.vrnjeni_zapisi = response.data;
    })
    .catch(function(err){
      $scope.error_uvoz = "prišlo je do napake pri uvozu"
    });
  };

  $scope.prenesi_nespesne = function(){
    console.log("prenasam neuspesne");
    $http.get('http://localhost:8080/api/v1/kandidat/neuspesni')
    .then(function(response){
      console.log(response);
      console.log("preneseni podatki");

      var data = response.data,
      blob = new Blob([data], { type: 'text/plain' }),
      url = $window.URL || $window.webkitURL;
      $scope.fileUrl = url.createObjectURL(blob);
    })
    .catch(function(err){
      $scope.error_uvoz = "prišlo je do napake pri prenesi_nespesne"
    });

  };


  /*var data = 'some data here...',
    blob = new Blob([data], { type: 'text/plain' }),
    url = $window.URL || $window.webkitURL;
    $scope.fileUrl = url.createObjectURL(blob);//*/




};