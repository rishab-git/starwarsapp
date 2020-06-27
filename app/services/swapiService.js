angular.module('myApp', [])
    .service('swapiService', ['$http',function ($http) {

        this.login = function (usrName) {
            return $http({
                method: 'GET',
                url: 'https://swapi.co/api/people/?',
                params: { search: usrName },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        }

    }]);
