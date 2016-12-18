(function() {
    angular.module("osloTilbudApp").service("registerUserService", function($http, $q){

        this.register = function(user) {
            var deferred = $q.defer();
             $http.post('/users', user).then(function(resp){
                 deferred.resolve(resp);
             }, function(err){

             });
            return deferred.promise;
        };
    });
})();

