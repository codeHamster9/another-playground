(function() {

  'use strict';
  angular
    .module('ngbp')
    .factory('categorySrv', categorySrv)

  function categorySrv(localStorageService) {

    const dict = localStorageService.get('cat');

    function match(items) {

      items.forEach(item => {
        // for (var cat in dict) {
        _.find(dict , (collection,key) => {
          return collection.some(i => {
            return item.category = i == item.name ? key : null
          })
        })
      });
    }
    return {
      match: match
    }

  }

})();
