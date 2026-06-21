/* ============================================================
   ev-catalog-menu.js — оверлей «Каталог» (десктоп) + мобильное
   многоуровневое меню + бургер.
   Интеграция: кнопка .ev-catbtn (десктоп) открывает оверлей
   catalog_menu_button; бургер .ev-mtool--burger (моб.) открывает
   .ev-mmenu. Содержимое в проде рендерят bitrix:menu / smart.filter.
   ============================================================ */
(function(window, document){
  'use strict';

  /* ---- Блокировка прокрутки БЕЗ скачка ширины контента ----
     При открытии оверлея/меню скрываем прокрутку body и
     компенсируем исчезнувший скроллбар паддингом — поэтому
     контентная область и шапка не «прыгают». (фикс бага №4) */
  var lockCount = 0;
  function lockScroll(){
    if(lockCount === 0){
      var sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if(sw > 0) document.body.style.paddingRight = sw + 'px';
    }
    lockCount++;
  }
  function unlockScroll(){
    lockCount = Math.max(0, lockCount - 1);
    if(lockCount === 0){
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }

  document.addEventListener('DOMContentLoaded', function(){

    /* ============================================================
       ДЕСКТОП: оверлей «Каталог»
       ============================================================ */
    var btn = document.getElementById('evCatBtn');
    var ov  = document.getElementById('evCatOverlay');
    if(btn && ov){
      var ovOpen = false;
      var closeOv = function(){
        ov.classList.remove('is-open');
        btn.classList.remove('is-open');
        if(ovOpen){ unlockScroll(); ovOpen = false; }
      };
      var toggleOv = function(){
        var open = ov.classList.toggle('is-open');
        btn.classList.toggle('is-open', open);
        if(open && !ovOpen){ lockScroll(); ovOpen = true; }
        else if(!open && ovOpen){ unlockScroll(); ovOpen = false; }
      };
      btn.addEventListener('click', toggleOv);
      ov.addEventListener('click', function(e){
        if(e.target.hasAttribute('data-close')) closeOv();
      });
      document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeOv(); });

      /* Демо: клик по категории слева подменяет заголовок витрины.
         В проде список и баннер приходят из компонента — блок убрать. */
      var hero = ov.querySelector('.ev-cathero h3');
      ov.querySelectorAll('.ev-catlist a').forEach(function(a){
        a.addEventListener('click', function(e){
          e.preventDefault();
          ov.querySelectorAll('.ev-catlist a').forEach(function(x){ x.classList.remove('is-active'); });
          a.classList.add('is-active');
          if(hero) hero.textContent = a.textContent;
        });
      });
    }

    /* ============================================================
       МОБИЛЬНОЕ МЕНЮ: бургер, уровни, аккордеон, поиск
       ============================================================ */
    var mBtn   = document.getElementById('evMenuBtn');
    var mMenu  = document.getElementById('evMmenu');
    var mSearch= document.getElementById('evMSearchBtn');
    if(mMenu){
      var slider = mMenu.querySelector('.ev-mslider');
      var mOpen = false;

      var openMenu = function(){
        if(mOpen) return;
        mMenu.classList.add('is-open');
        if(mBtn) mBtn.classList.add('is-open');
        lockScroll(); mOpen = true;
      };
      var closeMenu = function(){
        if(!mOpen) return;
        mMenu.classList.remove('is-open');
        if(mBtn) mBtn.classList.remove('is-open');
        unlockScroll(); mOpen = false;
      };
      var toggleMenu = function(){ mOpen ? closeMenu() : openMenu(); };

      if(mBtn) mBtn.addEventListener('click', toggleMenu);
      if(mSearch) mSearch.addEventListener('click', function(){
        openMenu();
        if(slider) slider.setAttribute('data-level','main');
        var inp = mMenu.querySelector('.ev-msearch input');
        if(inp) setTimeout(function(){ inp.focus(); }, 320);
      });
      mMenu.addEventListener('click', function(e){
        if(e.target.hasAttribute('data-mclose')) closeMenu();
      });
      document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenu(); });

      /* Навигация по уровням (data-go) */
      var catTitle = document.getElementById('evMcatTitle');
      mMenu.querySelectorAll('[data-go]').forEach(function(el){
        el.addEventListener('click', function(e){
          e.preventDefault();
          var lvl = el.getAttribute('data-go');
          if(lvl === 'cat' && el.hasAttribute('data-cat') && catTitle){
            catTitle.firstChild.textContent = el.getAttribute('data-cat');
          }
          if(slider) slider.setAttribute('data-level', lvl);
          var vp = mMenu.querySelector('.ev-mviewport'); if(vp) vp.scrollTop = 0;
        });
      });

      /* Аккордеон фильтра (Материал / Форма) */
      mMenu.querySelectorAll('[data-acc]').forEach(function(h){
        h.addEventListener('click', function(){
          h.closest('.ev-macc').classList.toggle('is-open');
        });
      });
    }

  });

})(window, document);
