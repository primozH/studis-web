(function () {

    applyStudentCtrl.$inject = ["$location", "$routeParams", "gradesService", "listEnrolledService", "prijaviStudentaService"];

    function applyStudentCtrl($location, $routeParams, gradesService, listEnrolledService, prijaviStudentaService) {
        var vm = this;

        vm.spremembaLeta = function() {
	        listEnrolledService.seznamPredmetov(vm.leto)
	        .then(function (response) {
	            vm.predmeti = response;	            
	            (vm.predmeti).sort(function(a,b){
	                return a.predmet.naziv.localeCompare(b.predmet.naziv ,"cs-CS");
	            });
	            vm.prikaziPredmete = true;
	        });
	    }

	    vm.spremembaPredmeta = function() {
	    	if (!vm.leto) return;
	    	prijaviStudentaService.seznamRokov(vm.predmet.predmet.sifra, vm.leto)
	        .then(function (response) {
	            vm.roki = response;
	            console.log(response);            
	            console.log(response);
	        });
	    }

	    vm.prijavi = function($index) {
	    	vm.error = "";
	    	prijaviStudentaService.prijaviStudenta("prijavi", vm.roki[$index].id, vm.vpisna[$index])
	        .then(function (response) {	        	
	        	if (response.status) {
	        		vm.error = response.data.message;
	        	}
	        	else if (response.id) {
	        		vm.error = "Prijava uspešna"
	        	}
	        	else {
	        		vm.error = "Napaka v vpisni številki"
	        	}
	        });
	    }
	    vm.odjavi = function($index) {
	    	vm.error = "";
	    	prijaviStudentaService.prijaviStudenta("odjavi", vm.roki[$index].id, vm.vpisna[$index])
	        .then(function (response) {	  			
	  			if (response.status) {
	  				if (response.data.message == "Ni razpisanega roka")
	        		vm.error = "Ni prijave na rok";
	        	}
	        	else if (response.id) {
	        		vm.error = "Odjava uspešna"
	        	}
	        	else {
	        		vm.error = "Napaka pri odjavi"
	        	}
	        });
	    }


    }    


    angular
        .module("studis")
        .controller("applyStudentCtrl", applyStudentCtrl);
})();
