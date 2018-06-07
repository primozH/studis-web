(function() {

    pdf.$inject = ["$http"];

    function pdf($http) {

        var apikey = "24f4ccb631040bda67a486b84bb98eb7";

        var createPdf = function(document) {
            var fd = new FormData();
            fd.append('document_html', document);
            fd.append('encoding', null);
            var uploadUrl = "http://api.pdflayer.com/api/convert?access_key=" + apikey
                + "&css_url=https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";

            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                responseType: 'arraybuffer'
            })
                .then(function(response){
                    console.log(response.data);
                    return response.data;
                });
        };

        return {
            createPdf: createPdf
        };
    }

    angular
        .module("studis")
        .service("pdfService", pdf);
})();