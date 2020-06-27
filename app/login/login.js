'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.view.html',
    controller: 'LoginCtrl'
  });
}])
.controller('LoginCtrl',['$scope','$http','$location',function($scope,$http,$location) {

  $scope.username = "";
  $scope.password = "";
  $scope.error = "";
  $scope.dataLoading = false;

    (function initController() {
        // reset login status
        localStorage.clear();
    })();

    $scope.login = function () {

       $http.get('https://swapi.dev/api/people/?search=' + $scope.username).then(successCallback, errorCallback);
       $scope.dataLoading = true;
      function successCallback(response) {
          //success code
          $scope.dataLoading = false;
          if (response.data.results.length == 1)
          {
              console.log(response.data.results[0]);
              if($scope.password.toUpperCase() === response.data.results[0].birth_year)
              {
                  localStorage.setItem('userName',response.data.results[0].name);
                  $location.path("/home");
              }
              else {
                  $scope.error = "Invalid birth year!!";
              }
          }
          else
          {
              $scope.error = "Invalid credentials!!";
          }
      }

      function errorCallback(error) {
          //error code
          $scope.dataLoading = false;
          $scope.error = error;
      }
    }
}]);