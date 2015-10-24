(function () {
  'use strict';

  angular
    .module('etrails')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $log,$location) {

    var vm = this;
    var gmap, trailLayer, hazzardLayer, entertainmentLayer, historicLayer, foodLayer, scenicLayer, restLayer,meMarker;

    var layers = {
      trail: {
        url: 'https://raw.githubusercontent.com/bythorsbeard/etrails/master/src/assets/kml/ElizabethRiverTrail.kml',
        preserveViewport: true
      },
      hazards: {
        url: 'https://raw.githubusercontent.com/bythorsbeard/etrails/master/src/assets/kml/Hazards.kml',
        //suppressInfoWindows: true,
        preserveViewport: true
      },
      entertainment: {
        url: 'https://raw.githubusercontent.com/bythorsbeard/etrails/master/src/assets/kml/Entertainment.kml',
        //suppressInfoWindows: true,
        preserveViewport: true
      },
      food: {
        url: 'https://raw.githubusercontent.com/bythorsbeard/etrails/master/src/assets/kml/FoodDrink.kml',
        //suppressInfoWindows: true,
        preserveViewport: true
      },
      scenic: {
        url: 'https://raw.githubusercontent.com/bythorsbeard/etrails/master/src/assets/kml/Scenic.kml',
        //suppressInfoWindows: true,
        preserveViewport: true
      },
      historic: {
        url: 'https://raw.githubusercontent.com/bythorsbeard/etrails/master/src/assets/kml/Historic.kml',
        //suppressInfoWindows: true,
        preserveViewport: true
      },
      rest: {
        url: 'https://raw.githubusercontent.com/bythorsbeard/etrails/master/src/assets/kml/Rest.kml',
        //suppressInfoWindows: true,
        preserveViewport: true
      }

    };

    $scope.toggleFilters = function () {

      $scope.navCollapsed = true;

      if (document.getElementById("chkEnter").checked) {
        //entertainmentLayer = new google.maps.KmlLayer(layers.entertainment);
        entertainmentLayer.setMap(gmap);
        $log.info("nope");
      }
      else {
        $log.info("yep");
        entertainmentLayer.setMap(null);
      }
      if (document.getElementById("chkHist").checked) {
        //historicLayer = new google.maps.KmlLayer(layers.historic);
        historicLayer.setMap(gmap);
      }
      else {
        historicLayer.setMap(null);
      }
      if (document.getElementById("chkFood").checked) {
        //foodLayer = new google.maps.KmlLayer(layers.food);
        foodLayer.setMap(gmap);
      }
      else {
        foodLayer.setMap(null);
      }
      if (document.getElementById("chkScenic").checked) {
        //scenicLayer = new google.maps.KmlLayer(layers.scenic);
        scenicLayer.setMap(gmap);
      }
      else {
        scenicLayer.setMap(null);
      }
      if (document.getElementById("chkRest").checked) {
        //restLayer = new google.maps.KmlLayer(layers.rest);
        restLayer.setMap(gmap);
      }
      else {
        restLayer.setMap(null);
      }

    };

    $scope.$on('mapInitialized', function (event, map) {
      //google.maps.event.trigger(map, "resize");
      gmap = map;

      trailLayer = new google.maps.KmlLayer(layers.trail);
      trailLayer.setMap(gmap);

      hazzardLayer = new google.maps.KmlLayer(layers.hazards);
      hazzardLayer.setMap(gmap);
      hazzardLayer.addListener('click', function (kmlEvent) {
        var text = kmlEvent.featureData.description;
        $log.info(text);
      });

      entertainmentLayer = new google.maps.KmlLayer(layers.entertainment);
      entertainmentLayer.setMap(gmap);
      entertainmentLayer.addListener('click', function (kmlEvent) {
        var text = kmlEvent.featureData.description;
        $log.info(text);
      });

      historicLayer = new google.maps.KmlLayer(layers.historic);
      historicLayer.setMap(gmap);
      historicLayer.addListener('click', function (kmlEvent) {
        var text = kmlEvent.featureData.description;
        $log.info(text);
      });

      foodLayer = new google.maps.KmlLayer(layers.food);
      foodLayer.setMap(gmap);
      foodLayer.addListener('click', function (kmlEvent) {
        var text = kmlEvent.featureData.description;
        $log.info(text);
      });

      scenicLayer = new google.maps.KmlLayer(layers.scenic);
      scenicLayer.setMap(gmap);
      scenicLayer.addListener('click', function (kmlEvent) {
        var text = kmlEvent.featureData.description;
        $log.info(text);
      });

      restLayer = new google.maps.KmlLayer(layers.rest);
      restLayer.setMap(gmap);
      restLayer.addListener('click', function (kmlEvent) {
        var text = kmlEvent.featureData.description;
        $log.info(text);
      });

      $log.info(map);
    });


    $scope.findZoomMe = function(){
      $scope.navCollapsed = true;
      //var infoWindow = new google.maps.InfoWindow({map: gmap});
      var image = 'assets/kml/icons/mapPinMe.png';
      if(!meMarker) {
        meMarker = new google.maps.Marker({
          map: gmap,
          icon: image
        });
      }
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          meMarker.setPosition(pos);
          //meMarker.setContent('Location found.');
          $log.info(pos);
          gmap.setCenter(pos);
          gmap.setZoom(17);

        }, function (test) {
          $log.error(test);
          $log.error("wtf");
          handleLocationError(true, meMarker, gmap.getCenter());
        });
      } else {
        $log.error("huh");
        // Browser doesn't support Geolocation
        handleLocationError(false, meMarker, gmap.getCenter());
      }

    };

    $scope.overView = function(){
      $location.path("/overview");
    };

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    }

    $scope.hideLayer = function () {
      if (hazzardLayer.getMap()) {
        hazzardLayer.setMap(null);
      } else {
        hazzardLayer = new google.maps.KmlLayer(layers.hazards);
        hazzardLayer.setMap(gmap);
      }

    };

  }
})();
