(function(module) {
  'use strict';
  module.factory('es6Factory', es6Factory);

  function es6Factory() {

    class ModelThree {
      
      constructor(name) {
        this.name = name;
      }

      get() {
        return this.name;
      }
    }

    return function(name) {
      return new ModelThree(name);
    };
  }
})(angular.module('ngbp'));
