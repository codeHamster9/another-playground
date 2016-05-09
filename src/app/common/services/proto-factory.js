/**
 * Created by Idan on 17/01/2016.
 */

(function(module) {
  'use strict';
  module.factory('protoFactory', protoFactory);

  function protoFactory() {


    return function(name) {

      var localVar = 5;

      function ModelProto(name) {

        this.publicProp = name;
      }

      ModelProto.prototype.getName = function() {
        return this.publicProp + localVar;
      };

      ModelProto.prototype.setName = function(val) {
        this.publicProp = val;
      };

      return new ModelProto(name);
    };
  }
})(angular.module('ngbp'));
