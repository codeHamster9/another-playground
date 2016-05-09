/**
 * Created by Idan on 17/01/2016.
 */

(function(module) {
  'use strict';
  module.factory('modelFactory', modelFactory);
 
  function modelFactory() {

    return function (name) {

      var privateVar = name;

      function getPrivate() {
        return privateVar;
      }

      function setPrivate(val) {
        privateVar = val;
      }

      return {
        get: getPrivate,
        set: setPrivate
      };
    };
  }
})(angular.module('ngbp'));

