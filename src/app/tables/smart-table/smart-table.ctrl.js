(function(module) {
  'use strict';
  module.controller('smartTableWrapperController', smartTableWrapperController);

  function smartTableWrapperController($uibModal, $rootScope, $scope, localStorageService) {

    const vm = this;
    vm.rowCollection = [];
    vm.add = add;
    var i = 0;
    vm.file = null;
    vm.selected = null;
    vm.save = save;
    vm.load = load;
    vm.itemsPerPage = 15;
    vm.subTotal = 0;

    $rootScope.ver = angular.version.full;

    init();

    function init() {

      vm.past = localStorageService.keys();

      // vm.rowCollection = localStorageService.get('march-7242');

      $scope.$watch(() => (vm.file),
        (nV, oV) => {
          if (nV === oV) {
            return;
          }

          var parser = new DOMParser();
          var doc = parser.parseFromString(nV, 'text/html');
          nV = angular.element(doc).find('TABLE')[0];
          nV = angular.element(nV).find('TABLE').find('tbody')[0].rows;
          fillTable(nV);
        });

    }

    function save(key) {
      localStorageService.set(key, vm.rowCollection);
      vm.past = localStorageService.keys();
      vm.saveKey = null;

    }

    function load(key) {
      vm.rowCollection = localStorageService.get(key);
      vm.subTotal = 0;

      for (let i = vm.rowCollection.length - 1; i >= 0; i--) {
        vm.subTotal += vm.rowCollection[i].minisum;
      }
      vm.selected = key;
    }

    function fillTable(rows) {
      while (i < rows.length - 1) {
        vm.rowCollection.push({
          date: rows[i].cells[0].innerHTML,
          name: rows[i].cells[1].innerHTML,
          sum: parseInt(rows[i].cells[2].innerHTML),
          minisum: parseInt(rows[i].cells[4].innerHTML),
          downpayment: rows[i].cells[6].innerText,

        });
        i++;
      }

    }

    function add() {
      $uibModal.open({
        templateUrl: 'tables/smart-table/add-row-modal.tpl.html'
      });
    }
  }

  module.directive('fileread', [function() {
    return {
      scope: {
        fileread: '='
      },
      link: function(scope, element, attributes) {
        element.bind('change', function(changeEvent) {
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.fileread = loadEvent.target.result;
            });
          };
          reader.readAsText(changeEvent.target.files[0]);
        });
      }
    };
}]);

})(angular.module('ngbp'));
