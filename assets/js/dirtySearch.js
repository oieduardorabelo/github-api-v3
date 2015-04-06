'use strict';

;(function(w, d, undefined) {
  var dirtySearch = function(state) {
    if (state === 'dirty') {
      d.body.classList.add('dirty-search');
    }
  };

  w.dirtySearch = dirtySearch;
})(window, document);
