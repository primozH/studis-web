
    angular
        .module('studis')
        .controller('searchCtrl', searchCtrl);

    function searchCtrl($location, searchProfile, izvozService, $scope, $window){
        var vm = this;

        vm.executeSearch = function(query){
            searchProfile.getSearchRes(query).then(
                function success(response){
                    //console.log("response in searchController:");
                    //console.log(response);
                    if(response !== undefined) {
                        vm.searchRes = response.data;
                        $scope.emptyRes = response.data.length === 0;
                        if (response.data.length > 0) {
                            $scope.izvoz = true;
                            //console.log("test izvoz");
                        }
                    }
                },
                function error(error){
                    console.log(error);
                }
            );
            $scope.query = null;
        };

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
            izvozService.izvoziCSVPDF(tableHeader, tableRows, tip);
        };

    }
