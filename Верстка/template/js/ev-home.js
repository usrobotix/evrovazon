/* ============================================================
   ev-home.js — интерактив главной: раскрытие отзывов, клик по видео.
   Интеграция: page_templates/index.php
   ============================================================ */
(function(window, document){
  'use strict';

  document.addEventListener('click', function(e){
    var m = e.target.closest('.ev-review-more');
    if(m){
      var r = m.closest('.ev-review');
      var open = r.classList.toggle('is-open');
      m.textContent = open ? 'Свернуть' : 'Показать полностью';
    }
    var v = e.target.closest('.ev-video');
    if(v && window.EV){
      EV.toast('<b>Видео</b><br>Презентация продукции Евровазон');
    }
  });

})(window, document);
