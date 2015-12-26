'use strict';

myApp.controller('WeatherSearchCtrl', ['$scope', '$log', function($scope, $log) {
    $scope.cityName = '';


    $scope.searchWeather = function() {
        $log.info($scope.cityName);
    }
}]);