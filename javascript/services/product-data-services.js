(function() {
    angular.module("osloTilbudApp").service("productDataService", function($http, $q){

        this.getProductDataFromServer = function() {
            var deferred = $q.defer();
            $http.get('/products').then(function(resp){
                deferred.resolve(resp.data);
            }, function(err){

            });
            return deferred.promise;
        };
    });
})();