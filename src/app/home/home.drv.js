(function(module) {
  'use strict';
  module.directive('homeSection', homeSection);

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

  function homeSection() {
    return {
      scope           : {},
      restrict        : 'E',
      controller      : HomeController,
      controllerAs    : 'vm',
      bindToController: true,
      templateUrl     : 'home/home.tpl.html'
    };
  }
})(angular.module('ngbp'));
