  (() => {
    'use strict';

    angular
      .module('ngbp')
      .component('navBar', {
        controller: navBarCtrl,
        controllerAs: 'vm',
        templateUrl: 'components/nav-bar/nav-bar.tpl.html'

      });

    function navBarCtrl(gettextCatalog, $scope) {
      const vm = this;

      vm.change = lang => {
        gettextCatalog.setCurrentLanguage(lang.key);
        vm.selectedLang = gettextCatalog.getString(lang.idx);
      };

      this.$onInit = () => {

        vm.lookup = {
          0: 'lang1',
          1: 'lang2',
          2: 'lang3',
          3: 'lang4'
        };

        vm.languages = [
          { label: '', key: 'en', idx: 0 },
          { label: '', key: 'he_IL', idx: 1 },
          { label: '', key: 'de', idx: 2 },
          { label: '', key: 'fr', idx: 3 }
        ];

        $scope.$watch(() => (vm.selectedLang), setupLangMenu);

        function setupLangMenu(nV, oV) {
          // if (nV === oV) return;
          _.forEach(vm.languages, (lang, idx) => {
            lang.label = gettextCatalog.getString(vm.lookup[lang.idx]);
            vm.selectedLang = vm.languages[0].label;
          });
        }

      };

      this.$onChanges = function(changesObj) {};

      this.$onDestroy = function() {};
    }
  })();
