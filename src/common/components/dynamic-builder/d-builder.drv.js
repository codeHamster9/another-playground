(function (module) {
  'use strict';

  module.value('buildRecipe', {});

  module.directive('dBuilder', dBuilder);

  function dBuilder($templateCache, $injector) {

    function compile(tElem, tAttrs) {

      var buildRecipe = $injector.get(tAttrs.service);

      //todo:configuarbale root element
      var root = angular.element('<form class="form-builder"></form>');

      //recipe API should have :
      //1.templateKey
      //2.display name
      //3.model name

      buildRecipe.items.forEach(function (item, idx) {
        var template = $templateCache.get(item.templateKey);

        if (!template) {
          template = item.templateKey;
        }

        var jTemplate = angular.element(template);

        jTemplate
            .find('LABEL')
            .text(item.title);

        if (!tAttrs.prop) {
          tAttrs.prop = 'ng-model';
        }

        jTemplate
            .find('INPUT')
            .attr(tAttrs.prop, tAttrs.collection + '.' + item.fieldName);

        if (tAttrs.delay) {
          jTemplate
              .find('INPUT')
              .attr('ng-model-options', '{debounce:' + tAttrs.delay + '}');
        }
        root.append(jTemplate);
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


