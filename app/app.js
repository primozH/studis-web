(function() {

    function settings($routeProvider, $locationProvider) {
        $routeProvider
            .when('/prijava', {
                templateUrl: 'login/login.template.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .when('/student', {
                templateUrl: 'student/dashboard/student.dashboard.template.html',
                controller: 'studentCtrl',
                controllerAs: 'vm'
            })
            .when('/student/:id/vpis', {
                templateUrl: 'student/enrollment/student-data/student.data.template.html',
                controller: 'vpisniList1Ctrl',
                controllerAs: 'vm'
            })
            .when('/student/:id/vpis/predmetnik', {
                templateUrl: 'student/enrollment/curriculum/curriculum.template.html',
                controller: 'vpisniList2Ctrl',
                controllerAs: 'vm'
            })
            .when('/iskanje', {
                templateUrl: "shared/controllers/search/search.html",
                controller: "searchCtrl",
                controllerAs: "vm"
            })
            .when('/profil/:id', {
                templateUrl: "student/profile/profile.html",
                controller: "profileCtrl",
                controllerAs: "vm"
            })
            .when('/referent', {
                templateUrl: 'referent/referentka.html',
                controller: 'ReferentkaCtrl',
                controllerAs: "vm"
            })
            .when('/skrbnik', {
                templateUrl: 'admin/skrbnik.template.html',
                controller: 'SkrbnikCtrl',
                controllerAs: "vm"
            })
            .when('/ucitelj', {
                templateUrl: 'teacher/ucitelj.html',
                controller: 'UciteljCtrl',
                controllerAs: "vm"
            })
            .when('/zeton/:id/:vrstaVpisa', {
                templateUrl: 'token/token.html',
                controller: 'tokenCtrl',
                controllerAs: "vm"
            })
            .when('/zeton', {
                templateUrl: 'token/list-tokens/tokens.template.html',
                controller: 'tokensCtrl',
                controllerAs: "vm"
            })
            .when('/prijava-na-izpit', {
                templateUrl: 'exam/exam_application/exam.application.template.html',
                controller: 'examAppCtrl',
                controllerAs: "vm"
            })
            .when('/novIzpitniRok', {
                templateUrl: 'exam/exam_creation/exam.creation.template.html',
                controller: 'examCreationCtrl',
                controllerAs: "vm"
            })
            .when('/vnosRezultatov/:rokId', {
                templateUrl: 'exam/enter_results/enter.results.table.template.html',
                controller: 'enterResultsTableCtrl',
                controllerAs: "vm"
            })
            .when('/seznamVpisanih', {
                templateUrl: 'shared/controllers/list-students-enrolled/select-subject/select.subject.template.html',
                controller: 'listEnrolledCtrl',
                controllerAs: "vm"
            })
            .when('/seznamVpisanih/:leto/:sifraPredmeta/:nazivPredmeta', {
                templateUrl: 'shared/controllers/list-students-enrolled/list-students/list.students.template.html',
                controller: 'listStudentsCtrl',
                controllerAs: "vm"
            })
            .when('/steviloVpisanih', {
                templateUrl: 'referent/stevilo-vpisanih/stevilo.vpisanih.template.html',
                controller: 'numberEnrolledCtrl',
                controllerAs: "vm"
            })
            .when('/seznamOcen', {
                templateUrl: 'shared/controllers/list-grades/select-date/select.date.template.html',
                controller: 'gradesDateCtrl',
                controllerAs: "vm"
            })
            .when('/seznamOcen/:idRoka', {
                templateUrl: 'shared/controllers/list-grades/list-student-grades/list.student.grades.template.html',
                controller: 'gradesStudentsCtrl',
                controllerAs: "vm"
            })
            .when('/potrdiVpis', {
                templateUrl: 'referent/potrdi-vpis/potrdi.vpis.template.html',
                controller: 'potrdiVpisCtrl',
                controllerAs: "vm"
            })
            .otherwise({redirectTo: '/prijava'});

        $locationProvider.hashPrefix('');
    }

    var app = angular.module('studis', ['ngRoute', 'ui.bootstrap', 'ngFileUpload', 'ngFileSaver']);

    app.config(["$routeProvider", "$locationProvider", settings]);
})();


