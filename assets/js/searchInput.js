'use strict';

;(function(w, d, undefined) {
  var timer;
  var $searchInput = d.querySelector('[data-github-user]');

  $searchInput.addEventListener('keyup', function() {
    var userName = this.value;

    if (userName) {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(function() {
        var apiUrlUser = 'https://api.github.com/users/' + userName;
        var apiUrlRepo = 'https://api.github.com/users/' + userName + '/repos';

        getUserInfo(apiUrlUser);
        getRepoInfo(apiUrlRepo);
        dirtySearch('dirty');
      }, 500);
    }

  });
})(window, document);
