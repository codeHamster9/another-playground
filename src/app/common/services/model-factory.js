/**
 * Created by Idan on 17/01/2016.
 */

(function(module) {
  'use strict';
  module.factory('modelFactory', modelFactory);

  function modelFactory() {

    var privateVar = 'secret';

    function privateFunc() {
      return true;
    }

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
  }
})(angular.module('home'));
