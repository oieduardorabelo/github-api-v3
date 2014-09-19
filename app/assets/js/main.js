'use strict';

;(function(w, d, undefined) {
  var dirtySearch = function(state) {
    if (state === 'dirty') {
      d.body.classList.add('dirty-search');
    }
  };

  w.dirtySearch = dirtySearch;
})(window, document);

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

'use strict';

;(function(w, d, undefined) {
  google.load("visualization", "1", {packages:["corechart"]});

  var renderPieChart = function(languagesLabel) {
    var languages = {}, languagesChartArray = [['Languages', 'Nº']], data, options;
    var languageChartArea = d.querySelector('#language-chart-area');
    var chart = new google.visualization.PieChart(languageChartArea);

    languagesLabel.forEach(function(lang) {
      if (!!lang) {
        if (lang in languages) {
          languages[lang] += 1;
        } else {
          languages[lang] = 1;
        }
      }
    });

    Object.keys(languages).forEach(function(key){
      languagesChartArray.push([key, languages[key]]);
    });

    data = google.visualization.arrayToDataTable(languagesChartArray);

    options = {
      title: 'Languages used'
    };

    chart.draw(data, options);
  };

  w.renderPieChart = renderPieChart;
})(window, document);

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

'use strict';

;(function(w, d, undefined) {
  var renderUserInfo = function(userInfoData) {
    var userInfo = JSON.parse(userInfoData);
    var templateUserCard = d.querySelector('#template-user-card').innerHTML;
    var $userCardArea = d.querySelector('.user-card-area');
    var infosToExtract = [
      '{{login}}',
      '{{avatar_url}}',
      '{{html_url}}',
      '{{name}}',
      '{{company}}',
      '{{blog}}',
      '{{location}}',
      '{{email}}',
      '{{public_repos}}',
      '{{public_gists}}',
      '{{followers}}',
      '{{following}}',
    ];

    infosToExtract.forEach(function(info) {
      var key = info.replace('{{', '').replace('}}', '');
      templateUserCard = templateUserCard.replace(info, userInfo[key]);
    });

    $userCardArea.innerHTML = templateUserCard;
  };

  w.renderUserInfo = renderUserInfo;
})(window, document);

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

        getUserInfo('info.json');
        getRepoInfo('repos.json');
        dirtySearch('dirty');
      }, 500);
    }

  });
})(window, document);
