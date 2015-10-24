(function() {
  'use strict';

  angular
    .module('etrails')
    .controller('OverViewController', OverViewController);

  function OverViewController($scope,$timeout,$log,$location) {

    $scope.goBack =function(){
      $location.path("/main");
    }

  }
})();
