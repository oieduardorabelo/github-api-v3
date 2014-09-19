'use strict';

;(function(w, d, undefined) {
  var getRepoInfo = function(apiUrl) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        renderRepoInfo(xhr.responseText);
      }
    });

    xhr.open('GET', apiUrl, true);
    xhr.send(null);
  };

  w.getRepoInfo = getRepoInfo;
})(window, document);
