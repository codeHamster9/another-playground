(function (module) {
  'use strict';

  module.value('buildRecipe', {});

  module.directive('dBuilder', dBuilder);

  function dBuilder($templateCache, $injector) {

    function compile(tElem, tAttrs) {

      var buildRecipe = $injector.get(tAttrs.service);

      tAttrs.delay = angular.isDefined(tAttrs.delay) ? tAttrs.delay : 0;

      //todo:configurable root element
      var root = angular.element('<form class="form-builder"></form>');

      //recipe API should have :
      //1.templateKey
      //2.display name
      //3.model name

      buildRecipe.items.forEach(function (item, idx) {
        var template = $templateCache.get(item.templateKey),
            jElem, wrapper;

        if (!template) {
          template = item.templateKey;
        }

        jElem = angular.element(template);

        if (!tAttrs.prop) {
          tAttrs.prop = 'model';
        }

        var modelLocation = tAttrs.collection + '.' + item.fieldName;
        jElem
            .attr(tAttrs.prop, modelLocation)
            .attr('ng-model-options', '{debounce:' + tAttrs.delay + '}')
            .attr('placeholder', item.fieldName)
            .attr('change', tAttrs.change);

        if (item.configObj) {
          jElem.attr('config-obj', item.configObj);
        }


        wrapper = angular.element('<div class="form-group"></div>');

        wrapper.append(jElem);

        root.append(wrapper);
      });
      tElem.append(root);
    }

    return {
      scope: {},
      restrict: 'E',
      compile: compile
    };
  }
})(angular.module('ngbp'));


