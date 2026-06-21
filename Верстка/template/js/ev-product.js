/* ============================================================
   ev-product.js — карточка товара: галерея, цвета, размеры,
   количество, вкладки, добавление в корзину.
   Интеграция: шаблон catalog.element "new".
   В проде кнопка «В корзину» вызывает add2basket компонента,
   здесь — демо через EV.cart.add().
   ============================================================ */
(function(window, document){
  'use strict';

  document.addEventListener('DOMContentLoaded', function(){
    var root = document.querySelector('.ev-pd-page');
    if(!root) return;

    /* ---- Галерея: Swiper (главное фото + лента превью) + Fancybox (зум) ----
       В проде библиотеки положить локально (template/vendor/). */
    if(window.Swiper){
      var thumbsSw = new Swiper('#evPdThumbSw', {
        direction: 'vertical',
        slidesPerView: 3,
        spaceBetween: 12,
        watchSlidesProgress: true,
        navigation: { prevEl: '#evPdPrev', nextEl: '#evPdNext' },
        breakpoints: {
          0:    { direction: 'horizontal', slidesPerView: 4, spaceBetween: 10 },
          1024: { direction: 'vertical',   slidesPerView: 3, spaceBetween: 12 }
        }
      });
      var mainSw = new Swiper('#evPdMainSw', {
        speed: 300,
        spaceBetween: 10,
        thumbs: { swiper: thumbsSw }
      });
    }
    if(window.Fancybox){
      Fancybox.bind('[data-fancybox="pd"]', {
        Toolbar: { display: { left: ['infobar'], middle: ['zoomIn','zoomOut'], right: ['close'] } }
      });
    }

    /* ---- Свотчи цвета ---- */
    root.querySelectorAll('.ev-swatches').forEach(function(g){
      g.querySelectorAll('.ev-swatch').forEach(function(s){
        s.addEventListener('click', function(){
          g.querySelectorAll('.ev-swatch').forEach(function(x){ x.classList.remove('is-sel'); });
          s.classList.add('is-sel');
        });
      });
    });

    /* ---- Таблица размеров ---- */
    root.querySelectorAll('.ev-size-row').forEach(function(r){
      r.addEventListener('click', function(){
        root.querySelectorAll('.ev-size-row').forEach(function(x){ x.classList.remove('is-sel'); });
        r.classList.add('is-sel');
      });
    });

    /* ---- Количество ---- */
    var q = document.getElementById('evQtyVal');
    var minus = document.getElementById('evQtyMinus');
    var plus = document.getElementById('evQtyPlus');
    if(minus) minus.addEventListener('click', function(){ q.value = Math.max(1, (+q.value) - 1); });
    if(plus)  plus.addEventListener('click', function(){ q.value = (+q.value) + 1; });

    /* ---- В корзину ---- */
    var add = document.getElementById('evPdAdd');
    if(add) add.addEventListener('click', function(){
      var n = q ? +q.value : 1;
      var name = add.dataset.name || 'Товар';
      for(var i = 0; i < n; i++){ if(window.EV) EV.cart.add(name); }
    });

    /* ---- Задать вопрос ---- */
    var ask = document.getElementById('evPdAsk');
    if(ask) ask.addEventListener('click', function(){
      if(window.EV) EV.toast('<b>Вопрос отправлен</b><br>Менеджер свяжется с вами');
    });

    /* ---- Вкладки ---- */
    root.querySelectorAll('.ev-pd-tab').forEach(function(t){
      t.addEventListener('click', function(){
        root.querySelectorAll('.ev-pd-tab').forEach(function(x){ x.classList.remove('is-active'); });
        root.querySelectorAll('.ev-pd-pane').forEach(function(x){ x.classList.remove('is-active'); });
        t.classList.add('is-active');
        var pane = root.querySelector('.ev-pd-pane[data-pane="' + t.dataset.tab + '"]');
        if(pane) pane.classList.add('is-active');
      });
    });
  });

})(window, document);
