(function() {
    'use strict';

    angular
        .module('studis')
        .controller('SkrbnikCtrl', SkrbnikCtrl);

    function SkrbnikCtrl($scope, $http, $window, Upload) {

        var vm = this;
        var vsebina_datoteke = null;
        //prikaže neuspešno uvožene
        vm.napaka_uvozeni_zapisi = false;
        vm.file = {
            name: "Izberi datoteko"
        };

        vm.uploadFile = function(){

            console.log(vm.file);
            console.log("HELO");
            if (vm.file) {
                Upload.upload({
                    url: 'api/v1/kandidat/nalozi',
                    data: {file: vm.file}
                }).then(function(response) {
                    console.log(response.data);
                    vm.error_uvoz = "uspešno uvoženi podatki";
                    vm.uvozeni_zapisi_naslov = true;
                    vm.vrnjeni_zapisi = response.data;

                    vm.steviloUvozenih = response.data.length;
                    vm.trenutnaStran = 1;
                    vm.zapisovNaStran = 5;
                    $scope.$watch("vm.trenutnaStran", function() {
                        nastaviStranZapise(vm.trenutnaStran);
                    });

                    function nastaviStranZapise(page) {
                        var pagedData = response.data.slice(
                            (page - 1) * vm.zapisovNaStran,
                            page * vm.zapisovNaStran
                        );
                        vm.aZapisi = pagedData;
                    }

                    $http.get('/api/v1/kandidat/neuspesni')
                        .then(function(response){
                            vm.neuspesni_fajl = response.data;

                        })
                        .catch(function(err){
                            console.log(err);
                            vm.error_uvoz = "prišlo je do napake pri prenosu neuspešnih";
                        });
                }, function(err) {
                    console.log(err);
                    vm.error_uvoz = "prišlo je do napake pri uvozu";
                })
            }
        };
    }

})();

