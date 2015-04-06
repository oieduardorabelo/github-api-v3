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
