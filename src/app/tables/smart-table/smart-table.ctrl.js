(function(module) {
  'use strict';
  module.controller('smartTableWrapperController', smartTableWrapperController);

  function smartTableWrapperController($uibModal, $rootScope, $scope, localStorageService, $timeout) {

    const vm = this;
    let preEdit;
    let prevEditRow = {};
    vm.load = load;
    vm.add = add;
    vm.save = save;
    vm.join = join;
    vm.rowCollection = [];
    vm.file = null;
    vm.selected = null;
    vm.itemsPerPage = 15;
    vm.subTotal = 0;
    vm.outerModel = false;
    vm.items = {
      name: 'idan',
      age: '37',
      sex: 'male'
    };
    vm.textModel = "hello";

    vm.rowSelect = (row) => {
      row.inedit = true;
      // prevEditRow.inedit = false;

      prevEditRow.inedit = prevEditRow === row ? true : false;
      prevEditRow = row;
      preEdit = angular.copy(row.category);
    };

    vm.saveEdit = (e, row) => {
      if (e.keyCode === 13) {
        row.inedit = false;
        vm.categories.push(row.category);
      } else if (e.keyCode === 27) {
        row.category = preEdit;
        row.inedit = false;

      }
    };

    $rootScope.ver = angular.version.full;

    init();

    function init() {

      $timeout(function() {
        vm.outerModel = true;
      }, 5000);

      vm.cards = updateCards(localStorageService.keys());

      $scope.$watch(() => (vm.file), parseFile);

    }

    function parseFile(file) {
      if (!file) return;
      var doc = new DOMParser().parseFromString(file, 'text/html');
      file = angular.element(doc).find('TABLE')[0];
      file = angular.element(file).find('TABLE').find('tbody')[0].rows;
      fillTable(file);
      vm.selected = vm.selectedCard = null;
      console.log('parsed');
    }

    vm.update = function(model) {
      // console.log('incoming', model);
      // console.log('bool', vm.outerModel);
      // console.log('text', vm.textModel);
      if (typeof model !== 'string') vm.outerModel = !model;
      else vm.textModel = model;

    };

    function updateCards(keys) {
      return keys.reduce((prev, current) => {
        let o = current.split('-');
        (prev[o[1]] || (prev[o[1]] = [])).push(o[0]);
        return prev;
      }, {});

    }

    function join() {

    }

    function save(key) {
      localStorageService.set(key, vm.rowCollection);
      vm.cards = updateCards(localStorageService.keys());
      vm.saveKey = null;

    }

    function load(key) {
      vm.selected = key;
      key = key + '-' + vm.selectedCard;
      vm.rowCollection = localStorageService.get(key);
      vm.subTotal = 0;
      vm.totalRows = vm.rowCollection.length;

      for (let i = vm.rowCollection.length - 1; i >= 0; i--) {
        vm.subTotal += vm.rowCollection[i].minisum;
      }

      vm.categories = _(vm.rowCollection)
        .groupBy('category')
        .keys()
        .pull(undefined,'')
        .concat(vm.categories)
        .value();
    }

    function fillTable(rows) {
      vm.rowCollection = [];
      let i = 0;
      while (i < rows.length - 1) {
        vm.rowCollection.push({
          date: rows[i].cells[0].innerHTML,
          name: rows[i].cells[1].innerHTML,
          sum: parseInt(rows[i].cells[2].innerHTML),
          minisum: parseInt(rows[i].cells[4].innerHTML),
          downpayment: rows[i].cells[6].innerText,
          category: ''
        });
        i++;
      }
    }

    function add() {
      $uibModal.open({
        templateUrl: 'tables/smart-table/add-row-modal.tpl.html',
        resolve: { items: vm.items },
        controller: function($uibModalInstance, items, $resolve) {
          let vm = this;
          vm.formdata = { firstname: items.name };
        },
        reslove: { someVar: {} },
        controllerAs: 'vm',
        bindToController: true
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

  module.directive('csSelect', function() {
    return {
      require: '^stTable',
      template: '<input type="checkbox"/>',
      scope: {
        row: '=csSelect'
      },
      link: function(scope, element, attr, ctrl) {

        element.bind('change', function(evt) {
          scope.$apply(function() {
            ctrl.select(scope.row, 'multiple');
          });
        });

        scope.$watch('row.isSelected', function(newValue, oldValue) {
          if (newValue === true) {
            element.parent().addClass('st-selected');
          } else {
            element.parent().removeClass('st-selected');
          }
        });
      }
    };
  });

})(angular.module('ngbp'));
