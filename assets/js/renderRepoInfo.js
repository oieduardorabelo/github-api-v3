'use strict';

;(function(w, d, undefined) {
  var renderRepoInfo = function(repoInfoData) {
    var repoInfo = JSON.parse(repoInfoData);
    var templateRepoItem = d.querySelector('#template-repo-item').innerHTML;
    var $repoListArea = d.querySelector('.repo-list-area');
    var infosToExtract = [
      '{{name}}',
      '{{html_url}}',
      '{{description}}',
      '{{created_at}}',
      '{{language}}'
    ];
    var allRepos = '';
    var allLanguages = [];

    function formatDate(date) {
      var repoDate = new Date(date);
      var repoDay = repoDate.getDate();
      var repoMonth = repoDate.getMonth() + 1;
      var repoYear = repoDate.getFullYear();
      var createdAt = repoDay + '/' + repoMonth + '/' + repoYear;

      return createdAt;
    }

    repoInfo.forEach(function(repo) {
      var repoItem = templateRepoItem;

      infosToExtract.forEach(function(info) {
        var key = info.replace('{{', '').replace('}}', '');

        if (key === 'created_at') {
          repoItem = repoItem.replace(info, formatDate(repo[key]));
        } else {
          repoItem = repoItem.replace(info, repo[key]);
        }
      });

      allRepos += repoItem;
      allLanguages.push(repo.language);
    });

    renderPieChart(allLanguages);
    $repoListArea.innerHTML = allRepos;
  };

  w.renderRepoInfo = renderRepoInfo;
})(window, document);
