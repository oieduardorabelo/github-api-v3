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
