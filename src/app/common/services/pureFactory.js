(function(module) {
  'use strict';
  module.factory('pureFact', pureFact);

  function pureFact() {

    return function(name, local) {

      var localVar = local || 'stuff';

      function privateMethod() {

      }

      var model = {
        name: name,
        say: function() {
          console.log(this.name + localVar);
        }
      };

      return Object.create(model);
    };
  }

})(angular.module('ngbp'));
