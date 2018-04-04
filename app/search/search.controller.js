
    angular
        .module('studis')
        .controller('searchCtrl', searchCtrl);

    function searchCtrl($location, searchProfile, $scope){
        var vm = this;

        vm.executeSearch = function(query){
            searchProfile.getSearchRes(query)
                .then(
                    function success(response){
                        console.log("response in searchController:");
                        console.log(response);
                        if(response !== undefined) {
                            vm.searchRes = response.data;
                            $scope.emptyRes = response.data.length === 0;
                        }
                    },
                    function error(error){
                        console.log(error);
                    }
                );
            $scope.query = null;
        };

        vm.openProfile = function(vpisnaStevilka){
            $location.path("/profile/" + vpisnaStevilka);
        };
    }
