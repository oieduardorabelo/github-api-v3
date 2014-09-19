'use strict';

;(function(w, d, undefined) {
  var getUserInfo = function(apiUrl) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        renderUserInfo(xhr.responseText);
      }
    });

    xhr.open('GET', apiUrl, true);
    xhr.send(null);
  };

  w.getUserInfo = getUserInfo;
})(window, document);
