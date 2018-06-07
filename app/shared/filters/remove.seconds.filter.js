(function() {
    //Accepts time in hh:mm:ss format and return time in hh:mm format
    var removeSeconds = function(){
        return function(time){
            var pieces = time.split(':');
            return pieces[0] + ":" + pieces[1];
        };
    };

    angular
        .module('studis')
        .filter('removeSeconds', removeSeconds);
})();