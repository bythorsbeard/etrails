(function () {
  'use strict';

  angular
    .module('etrails')
    .controller('SplashController', SplashController);

  /** @ngInject */
  function SplashController($scope, $timeout, webDevTec, toastr, $log, $location) {

    var vm = this;
    console.log("In Splash controller" );
    
    $timeout(callAtTimeout, 3000);
 
    function callAtTimeout() {
    console.log("Timeout occurred");
     $location.path("/main");
   }
    
  }
})();
