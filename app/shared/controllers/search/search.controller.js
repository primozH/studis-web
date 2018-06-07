(function() {
    angular
        .module('studis')
        .controller('searchCtrl', searchCtrl);

    function searchCtrl($location, searchProfile, izvozService){
        var vm = this;

        vm.query = searchProfile.getSearchFilter();
        vm.naStran = 15;
        vm.skupaj = 0;

        vm.menjavaStrani = function() {
            console.log(vm.trenutnaStran);
            vm.searchRes = vm.allSearchResults.slice((vm.trenutnaStran- 1) * vm.naStran, vm.trenutnaStran * vm.naStran);
        };

        vm.executeSearch = function(){
            if (vm.query == null) {
                return;
            }
            searchProfile.getSearchRes(vm.query).then(
                function success(response){
                    if(response !== undefined) {
                        vm.skupaj = response.data.length;
                        vm.allSearchResults = response.data;
                        vm.trenutnaStran = 1;
                        vm.menjavaStrani();
                        if (response.data.length > 0) {
                            vm.izvoz = true;
                        } else {
                            vm.izvoz = false;
                        }
                    }
                },
                function error(error){
                    console.log(error);
                }
            );
        };

        vm.executeSearch();

        vm.openProfile = function(id){
            $location.path("/profil/" + id);
        };

        vm.izvozi = function(tip) {
            tableHeader = {"row":["Zaporedna številka","Vpisna številka","Ime","Priimek","E-pošta","Telefon"]};
            tableRows = [];

            for (var i = 1; i <= vm.allSearchResults.length; i++) {
                var temp = vm.allSearchResults[i-1];
                var trow = {"row":[i,temp.vpisnaStevilka,temp.ime,temp.priimek,temp.email,temp.telefonskaStevilka]};
                tableRows.push(trow);
            }
            izvozService.izvoziCSVPDF("Seznam iskanja", null, tableHeader, tableRows, tip);
        };

    }
})();
