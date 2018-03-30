(function() {

    /* global angular */
    angular
        .module('studis')
        .controller('searchCtrl', searchCtrl);

    function searchCtrl($location, searchProfile){
        var vm = this;

        vm.executeSearch = function(query){
            searchProfile.getSearchRes(query)
                .then(
                    function success(response){
                        vm.searchRes = response.data;
                    },
                    function error(error){
                        console.log(error);
                    }
                )

        };

        vm.openProfile = function(uniId){

            vm.student = {};
            for(var i = 0; i < vm.searchRes.results; i++){
                if(vm.searchRes.results[i].uniId === uniId){
                    vm.student = vm.searchRes.results[i];
                    break;
                }
            }//for
            //store student and redirect to /profile
            searchProfile.setStudent(student)
                .then(
                    function success(response){
                        $location.path("/profile/uniId");
                    },
                    function error(error){
                        console.log(error);
                    }
                )
        };
    }
})();