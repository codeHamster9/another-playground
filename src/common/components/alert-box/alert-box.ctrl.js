(function(module) {
  'use strict';

  class alertBoxController {
    constructor() {
    }

    closeAlert(key) {
      this.alertRemove({alert: key});
    }
  }

  module.controller('alertBoxController', alertBoxController);

})(angular.module('ngbp'));
