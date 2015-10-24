(function() {
  'use strict';

  angular
    .module('etrails')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/splash/splash.html',
        controller: 'SplashController',
        //controllerAs: 'splash'
      })
      .when('/main', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        //controllerAs: 'main'
      })
      .when('/overview', {
        templateUrl: 'app/overview/overview.html',
        controller: 'OverViewController',
        //controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
