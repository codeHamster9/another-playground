(function(module) {
  'use strict';
  module.controller('tablesController', tablesController);

  function tablesController(modelFactory, protoFactory, es6Factory,pureFact) {

    var vm = this;

    init();

    function init() {

      var idan = modelFactory('idan');
      console.log(idan.get());

      var moshe = protoFactory('moshe');
      console.log(moshe.getName());

      var es6class = es6Factory('es6');
      console.log(es6class.get());

      var modelFour = modelFactory('avivit');
      console.log(modelFour.get());
      
      console.log(idan.get());

      var pure = pureFact('popo');
      pure.say();
    }
  }


})(angular.module('ngbp'));
