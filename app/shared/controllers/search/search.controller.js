(function() {
    angular
        .module('studis')
        .controller('searchCtrl', searchCtrl);

    function searchCtrl($location, searchProfile, izvozService){
        var vm = this;

        vm.query = searchProfile.getSearchFilter();

        vm.executeSearch = function(){
            if (vm.query == null) {
                return;
            }
            searchProfile.getSearchRes(vm.query).then(
                function success(response){
                    if(response !== undefined) {
                        vm.searchRes = response.data;
                        vm.emptyRes = response.data.length === 0;
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

            for (var i = 1; i <= vm.searchRes.length; i++) {
                var temp = vm.searchRes[i-1];
                var trow = {"row":[i,temp.vpisnaStevilka,temp.ime,temp.priimek,temp.email,temp.telefonskaStevilka]};
                tableRows.push(trow);
            }
            izvozService.izvoziCSVPDF("Seznam iskanja", null, tableHeader, tableRows, tip);
        };

    }
})();
