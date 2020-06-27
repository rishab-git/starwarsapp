'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.view.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope','$http','$location',function($scope,$http,$location) {

    $scope.greeting = "";
    $scope.searchParam = "";
    $scope.planets = [];
    $scope.maxPopulation = 0;
    $scope.Math = window.Math;
    $scope.prevQuery = "";
    $scope.nxtQuery = "";
    $scope.error = "";
    $scope.dataLoading = false;
    $scope.lukeQueryCounter = 0;
    $scope.lukeQueryLimit = 15;

    (function initController() {
        if(localStorage.getItem("userName"))
        {
          $scope.username = localStorage.getItem("userName");
          $scope.greeting = "Hello, " + $scope.username;
        }
        else
            $location.path("/login");
    })();

    $scope.callSearch = function(query){
        $scope.dataLoading = true;
        if($scope.lukeQueryCounter < $scope.lukeQueryLimit)
        {
            // the !query check is for next/previous buttons where next and previous queries are taken from api response
            if(!query)
                $http.get('//swapi.dev/api/planets?page=1&search=' + $scope.searchParam).then(successCallback, errorCallback);
            else
                $http.get(query).then(successCallback, errorCallback);
        }
        else{
            $scope.dataLoading = false;
            $scope.planets = [];
            $scope.error = "Luke Skywalker can only search " + $scope.lukeQueryLimit + " times";
        }

    function successCallback(response){
        $scope.dataLoading = false;

        if($scope.username == "Luke Skywalker")
        {
            $scope.lukeQueryCounter++ ;
        }
        if(response.data.count > 0) {
            $scope.error = "";
            $scope.planets = response.data.results;
            $scope.nxtQuery = response.data.next;
            $scope.prevQuery = response.data.previous;

            angular.forEach($scope.planets, function (value, key) {
                if (value.population === "unknown")
                    value.populationActual = 0;
                else
                    value.populationActual = parseInt(value.population);

                //Hack: Coruscant is hugely populated compared to other planets. It sets the with for ther planet population indicators
                // to a fraction of 1%
                if (value.name == "Coruscant") {
                    value.populationActual = 1000;
                    value.population = 1000;
                }
            });

            $scope.maxPopulation = Math.max.apply(Math, $scope.planets.map(function (item) {
                return item.populationActual;
            }));
            console.log(response.data.count);
        }
        else if(response.data.count == 0) {
            $scope.planets = [];
            $scope.error = "No planets with the name being searched";
        }

      }

    function errorCallback(error){
            $scope.dataLoading = false;
            $scope.error = error;
        }
    }
}]);