
(function(module) {
  'use strict';

  class baseController {
    constructor() {
      this.state = {};
    }
  }
  
  class HomeController extends baseController {

    constructor($timeout) {
      super();
      this.$timeout = $timeout;
    }

    changeRdy(key, data) {

      if (angular.isArray(data) && !data.length) {
        delete this.state[key];
      }

      this.$timeout(function(state) {
        console.log('SEND to service:', state);
      }, 0, true, this.state);
    }

    removeAlert(alert) {
      delete this.state[alert];
      console.log('send to service:', this.state);

    }
  }

  module.controller('HomeController', HomeController);

}(angular.module('ngbp')));
