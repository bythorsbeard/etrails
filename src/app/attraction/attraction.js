/*
(function() {
  'use strict';

  angular
    .module('etrails')
    .controller('MainController', MainController);

  /!** @ngInject *!/
  function MainController($scope,$timeout, webDevTec, toastr,$log) {

    var vm = this;

    $scope.$on('mapInitialized', function(event, map) {
        google.maps.event.trigger(map, "resize");
    });

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1445470013693;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
*/
