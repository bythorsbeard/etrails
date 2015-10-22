(function() {
  'use strict';

  angular
    .module('etrails')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
