'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.login',
  'myApp.home',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
      .when("/login",{ templateUrl: "login/login.view.html",controller: "LoginCtrl" })
      .when("/home",{ templateUrl: "home/home.view.html",controller: "HomeCtrl" })
      .otherwise({redirectTo: '/login'});
}]);
