'use strict';

;(function(w, d, undefined) {
  d.addEventListener('click', function(e) {
    var elemClassName = e.target.className;
    var elemParentClassName = e.target.parentNode.className;

    if (elemClassName === 'repo-name') {
      if (elemParentClassName === 'repo-item') {
        e.target.parentNode.className += ' active';
      }

      if (elemParentClassName === 'repo-item active') {
        e.target.parentNode.className = 'repo-item';
      }
    }

  });
})(window, document);
