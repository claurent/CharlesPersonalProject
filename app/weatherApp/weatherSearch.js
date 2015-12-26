'use strict';


myApp.controller('WeatherSearchCtrl', ['$scope', '$location', '$resource', '$log', function($scope, $location, $resource, $log) {
    $scope.cityName = '';
    $scope.errorMessage = false;
    $scope.position = {};

    $scope.weatherAPIKey = '6dd0bc9b5374f7f22ade02797695bd8d';
    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily', {
        callback: "JSON_CALLBACK"}, {get: { method: "JSONP"}});
    $scope.weatherResults = {}


    // Search by City Name
    $scope.searchWeather = function() {
        $log.info('City name: ' + $scope.cityName);
        $scope.errorMessage = false;
        $scope.callWeatherAPI({cityName: $scope.cityName});
    }

    // Search by coordinates
    $scope.getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                $log.log(position);
                $scope.$apply(function() {
                    $scope.position = position;
                    $scope.errorMessage = false;
                });
                $scope.callWeatherAPI(position);
            },
            function(err) {
                $log.error(err);
                $scope.$apply(function() {
                    $scope.errorMessage = err;
                });
            })

        }
        $log.info('location');
    }



    $scope.callWeatherAPI = function(input) {
        var weatherRequestParams = {};
        if(input.coords){
            weatherRequestParams = {
                lat: input.coords.latitude,
                lon: input.coords.longitude,
                APPID: $scope.weatherAPIKey
            }
        }
        else if (input.cityName) {
            weatherRequestParams = {
                q: input.cityName,
                APPID: $scope.weatherAPIKey
            }
        }
        else {
            $log.error('Error');
            return;
        }

        $log.log(weatherRequestParams);

        $scope.weatherResults = $scope.weatherAPI.get(weatherRequestParams);
        $log.log($scope.weatherResults);



    }


}]);