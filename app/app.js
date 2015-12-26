'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.version'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/', {
        templateURL: 'homepage/homepage.html',
        controller: 'HomepageCtrl'
      })
      .when('/weatherApp', {
        templateUrl: 'weatherApp/weatherSearch.html',
        controller: 'WeatherSearchCtrl'
      });
}]);
