/* ============================================================
   ev-product.js — карточка товара
   Swiper 11 (галерея) + Fancybox 5 (зум).
   ВАЖНО: старый jquery.fancybox подключён глобально в footer.php.
   Мы используем атрибут data-ev-fancybox (не data-fancybox),
   чтобы старый Fancybox не перехватил наши ссылки.
   Fancybox 5 биндится вручную только к [data-ev-fancybox].
   ============================================================ */
(function(window, document){
  'use strict';

  document.addEventListener('DOMContentLoaded', function(){
    var root = document.querySelector('.ev-pd-page');
    if (!root) return;

    /* ---- Swiper: лента превью + главное фото ---- */
    if (window.Swiper) {
      var thumbsSw = new Swiper('#evPdThumbSw', {
        direction: 'vertical',
        slidesPerView: 'auto',
        spaceBetween: 10,
        watchSlidesProgress: true,
        navigation: { prevEl: '#evPdPrev', nextEl: '#evPdNext' },
        breakpoints: {
          0:    { direction: 'horizontal', slidesPerView: 4, spaceBetween: 8 },
          1025: { direction: 'vertical',   slidesPerView: 'auto', spaceBetween: 10 }
        }
      });
      var mainSw = new Swiper('#evPdMainSw', {
        speed: 300,
        spaceBetween: 0,
        thumbs: { swiper: thumbsSw }
      });
    }

    /* ---- Fancybox 5: биндим к data-ev-fancybox (не data-fancybox!) ---- */
    if (window.Fancybox) {
      Fancybox.bind('[data-ev-fancybox="pd"]', {
        Toolbar: {
          display: {
            left: ['infobar'],
            middle: ['zoomIn', 'zoomOut'],
            right: ['close']
          }
        }
      });
    }

    /* ---- Свотчи: выделение при клике ---- */
    root.querySelectorAll('.ev-swatches').forEach(function(g){
      g.querySelectorAll('.ev-swatch').forEach(function(s){
        s.addEventListener('click', function(){
          g.querySelectorAll('.ev-swatch').forEach(function(x){ x.classList.remove('is-sel'); });
          s.classList.add('is-sel');
        });
      });
    });

    /* ---- Таблица размеров: выделение строки ---- */
    root.querySelectorAll('.ev-size-row').forEach(function(r){
      r.addEventListener('click', function(){
        var table = r.closest('.ev-size-table');
        if (table) table.querySelectorAll('.ev-size-row').forEach(function(x){ x.classList.remove('is-sel'); });
        r.classList.add('is-sel');
      });
    });

    /* ---- Вкладки ---- */
    root.querySelectorAll('.ev-pd-tab').forEach(function(t){
      t.addEventListener('click', function(){
        /* Ищем ближайший контейнер вкладок (основной или related) */
        var container = t.closest('.ev-pd-tabpanes') ? t.parentElement.nextElementSibling : null;
        /* Сбрасываем активные табы в том же блоке */
        var tabGroup = t.parentElement;
        tabGroup.querySelectorAll('.ev-pd-tab').forEach(function(x){ x.classList.remove('is-active'); });
        /* Сбрасываем паны в следующем .ev-pd-tabpanes */
        var panes = tabGroup.nextElementSibling;
        if (panes && panes.classList.contains('ev-pd-tabpanes')) {
          panes.querySelectorAll('.ev-pd-pane').forEach(function(x){ x.classList.remove('is-active'); });
          var pane = panes.querySelector('.ev-pd-pane[data-pane="' + t.dataset.tab + '"]');
          if (pane) pane.classList.add('is-active');
        }
        t.classList.add('is-active');
      });
    });

  });

})(window, document);
