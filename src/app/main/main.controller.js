(function () {
  'use strict';

  angular
    .module('etrails')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $timeout, webDevTec, toastr, $log) {

    var vm = this;
    var gmap,trailLayer, hazzardLayer, entertainmentLayer;

    var layers = {
      trail: {
        url: 'https://raw.githubusercontent.com/bythorsbeard/etrails/master/src/assets/kml/ElizabethRiverTrail.kml',
        suppressInfoWindows: true,
        preserveViewport: true
      },
      hazards: {
        url: 'https://raw.githubusercontent.com/bythorsbeard/etrails/master/src/assets/kml/Hazards.kml',
        suppressInfoWindows: true,
        preserveViewport: true
      },
      entertainment: {
        url: 'https://raw.githubusercontent.com/bythorsbeard/etrails/master/src/assets/kml/Entertainment.kml',
        suppressInfoWindows: true,
        preserveViewport: true
      }


    }

    $scope.$on('mapInitialized', function (event, map) {
      //google.maps.event.trigger(map, "resize");
      gmap = map;
      trailLayer = new google.maps.KmlLayer(layers.trail);
      trailLayer.setMap(map);

      hazzardLayer = new google.maps.KmlLayer(layers.hazards);
      hazzardLayer.setMap(map);

      entertainmentLayer = new google.maps.KmlLayer(layers.entertainment);
      entertainmentLayer.setMap(map);

      var infoWindow = new google.maps.InfoWindow({map: map});

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          log.info(pos);
          map.setCenter(pos);
        }, function(test) {
          $log.error(test);
          $log.error("wtf");
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        $log.error("huh");
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }


      $log.info(map);
    });

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    }

    $scope.hideLayer = function () {
      if(hazzardLayer.getMap()) {
        hazzardLayer.setMap(null);
      }else{
        hazzardLayer = new google.maps.KmlLayer(layers.hazards);
        hazzardLayer.setMap(gmap);
      }

    };


    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1445470013693;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function () {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function (awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
