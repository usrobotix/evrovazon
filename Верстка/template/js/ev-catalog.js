/* ============================================================
   ev-catalog.js — подраздел: фильтр (материал/форма/размер),
   сортировка по цене, ценовой слайдер, рендер карточек товаров.
   ─────────────────────────────────────────────────────────────
   ВНИМАНИЕ — ЭТО ДЕМО-РЕАЛИЗАЦИЯ для статичной вёрстки.
   В Bitrix фильтрация и сортировка делаются НА СЕРВЕРЕ:
     • фильтр  → bitrix:catalog.smart.filter (шаблон "new")
     • товары  → bitrix:catalog.section (шаблон "new"/"tile")
   Эту разметку карточки (renderCard) переносим в шаблон
   catalog.item, JS-фильтр заменяем на smart.filter + AJAX.
   ============================================================ */
(function(window, document){
  'use strict';

  /* демо-данные (в проде — из инфоблока, Iblock ID = 1) */
  var DATA = [
    {n:'Накладная деревянная лавочка',          img:'p-viva',     mat:'Дерево/металл', form:'Без спинки', size:'Большой', price:35500, dim:{l:325,w:70,h:45,kg:100}},
    {n:'Парковая лавочка «Арена»',              img:'p-arena',    mat:'Дерево/металл', form:'Со спинкой', size:'Средний', price:42000, dim:{l:200,w:62,h:78,kg:90}},
    {n:'Бетонная лавочка «Арена Лайн»',         img:'p-evrogeo',  mat:'Бетон',         form:'Со спинкой', size:'Большой', price:51000, dim:{l:325,w:70,h:45,kg:240}},
    {n:'Скамейка «Нова»',                       img:'p-nova',     mat:'Металл',        form:'Без спинки', size:'Средний', price:38500, dim:{l:240,w:55,h:42,kg:80}},
    {n:'Деревянная скамейка «Бенч»',            img:'p-bench',    mat:'Дерево',        form:'Без спинки', size:'Большой', price:29900, dim:{l:300,w:60,h:44,kg:70}},
    {n:'Скамейка металлическая «Гринвич»',      img:'p-grinvich', mat:'Дерево/металл', form:'Со спинкой', size:'Средний', price:35500, dim:{l:325,w:70,h:45,kg:100}},
    {n:'Полукруглая скамейка «Нова»',           img:'p-nova2',    mat:'Металл',        form:'Со спинкой', size:'Большой', price:47000, dim:{l:360,w:60,h:80,kg:120}},
    {n:'Круглая скамейка «Вива»',               img:'p-viva2',    mat:'Дерево/металл', form:'Без спинки', size:'Большой', price:56000, dim:{l:180,w:180,h:45,kg:160}},
    {n:'Скамейка «Нова» (комплект)',            img:'p-nova3',    mat:'Бетон',         form:'Без спинки', size:'Малый',   price:33000, dim:{l:90,w:90,h:42,kg:110}},
    {n:'Парковая лавочка «Арена»',              img:'p-arena',    mat:'Дерево/металл', form:'Со спинкой', size:'Средний', price:42000, dim:{l:200,w:62,h:78,kg:90}},
    {n:'Накладная деревянная лавочка',          img:'p-viva',     mat:'Дерево',        form:'Без спинки', size:'Малый',   price:27500, dim:{l:150,w:55,h:42,kg:55}},
    {n:'Скамейка металлическая «Гринвич»',      img:'p-grinvich', mat:'Дерево/металл', form:'Со спинкой', size:'Средний', price:35500, dim:{l:325,w:70,h:45,kg:100}}
  ];

  var PMAX = 60000, IMG = 'template/images/';
  var state = { mat:'Все', form:'Все', size:'Все', sort:'asc', min:0, max:Infinity };

  function rub(n){ return n.toLocaleString('ru-RU') + ' руб.'; }

  function renderCard(p){
    return '' +
    '<div class="ev-prod-card">' +
      '<a class="ev-ph" href="product.html"><img src="' + IMG + p.img + '.png" alt="' + p.n + '"></a>' +
      '<div class="ev-pname"><a href="product.html">' + p.n + '</a></div>' +
      '<div class="ev-pspecs">' +
        '<div class="ev-ps-mat">Материал: ' + p.mat.toLowerCase() + '</div>' +
        '<div class="ev-ps-dims">' +
          '<div><span class="ev-psv">' + p.dim.l + ' см</span><span class="ev-psk">Длина</span></div>' +
          '<div><span class="ev-psv">' + p.dim.w + ' см</span><span class="ev-psk">Ширина</span></div>' +
          '<div><span class="ev-psv">' + p.dim.h + ' см</span><span class="ev-psk">Высота</span></div>' +
          '<div><span class="ev-psv">' + p.dim.kg + ' кг</span><span class="ev-psk">Вес</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="ev-prow"><span class="ev-price">' + rub(p.price) + '</span>' +
        '<button class="ev-btn" data-add="' + p.n.replace(/"/g,'') + '">В корзину</button></div>' +
    '</div>';
  }

  function render(){
    var list = DATA.filter(function(p){
      if(state.mat !== 'Все' && p.mat !== state.mat) return false;
      if(state.form !== 'Все' && p.form !== state.form) return false;
      if(state.size !== 'Все' && p.size !== state.size) return false;
      if(p.price < state.min || p.price > state.max) return false;
      return true;
    });
    list.sort(function(a,b){ return state.sort === 'asc' ? a.price - b.price : b.price - a.price; });

    var grid = document.getElementById('evProdGrid');
    grid.innerHTML = list.length ? list.map(renderCard).join('') :
      '<div class="ev-empty">По выбранным параметрам ничего не найдено. ' +
      '<span data-reset>Сбросить фильтры</span></div>';
    document.getElementById('evFbCount').textContent = list.length;
  }

  function initDropdown(id, key){
    var dd = document.getElementById(id);
    if(!dd) return;
    var valEl = dd.querySelector('.ev-val');
    dd.querySelector('.ev-fb-item').addEventListener('click', function(e){
      e.stopPropagation();
      document.querySelectorAll('.ev-fb-dd.is-open').forEach(function(x){ if(x !== dd) x.classList.remove('is-open'); });
      dd.classList.toggle('is-open');
    });
    dd.querySelectorAll('.ev-fb-menu button').forEach(function(b){
      b.addEventListener('click', function(){
        state[key] = b.dataset.v;
        valEl.textContent = b.textContent;
        dd.querySelectorAll('button').forEach(function(x){ x.classList.remove('is-sel'); });
        b.classList.add('is-sel');
        dd.classList.remove('is-open');
        render();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    if(!document.getElementById('evProdGrid')) return;

    /* мобильный переключатель «Фильтры» (раскрывает Цену + Материал/Форма/Размер) */
    var mf = document.getElementById('evMfilter');
    if(mf){
      var page = mf.closest('.ev-cat-page');
      mf.addEventListener('click', function(){
        mf.classList.toggle('is-open');
        if(page) page.classList.toggle('ev-filters-open');
      });
    }

    initDropdown('evDdSort', 'sort');
    initDropdown('evDdMat', 'mat');
    initDropdown('evDdForm', 'form');
    initDropdown('evDdSize', 'size');
    document.addEventListener('click', function(){
      document.querySelectorAll('.ev-fb-dd.is-open').forEach(function(x){ x.classList.remove('is-open'); });
    });

    /* ценовой слайдер */
    var rmin = document.getElementById('evRMin'), rmax = document.getElementById('evRMax');
    var imin = document.getElementById('evIMin'), imax = document.getElementById('evIMax');
    var fill = document.getElementById('evRFill');
    function syncFill(){
      fill.style.left = (+rmin.value / PMAX * 100) + '%';
      fill.style.right = (100 - (+rmax.value) / PMAX * 100) + '%';
    }
    function applyRange(){
      var a = Math.min(+rmin.value, +rmax.value), b = Math.max(+rmin.value, +rmax.value);
      state.min = a; state.max = (b === PMAX) ? Infinity : b;
      imin.value = a; imax.value = b; syncFill(); render();
    }
    rmin.addEventListener('input', applyRange);
    rmax.addEventListener('input', applyRange);
    imin.addEventListener('change', function(){ rmin.value = Math.min(+imin.value || 0, PMAX); applyRange(); });
    imax.addEventListener('change', function(){ rmax.value = Math.min(+imax.value || PMAX, PMAX); applyRange(); });
    syncFill();

    /* сброс */
    function resetAll(){
      state = { mat:'Все', form:'Все', size:'Все', sort:'asc', min:0, max:Infinity };
      rmin.value = 0; rmax.value = PMAX; imin.value = 0; imax.value = PMAX; syncFill();
      document.querySelectorAll('.ev-fb-dd').forEach(function(dd){
        var first = dd.querySelector('.ev-fb-menu button'), val = dd.querySelector('.ev-val');
        dd.querySelectorAll('button').forEach(function(x){ x.classList.remove('is-sel'); });
        if(first){ first.classList.add('is-sel'); val.textContent = first.textContent; }
      });
      render();
    }
    document.getElementById('evFbReset').addEventListener('click', resetAll);

    /* делегирование: добавить в корзину + сброс из пустого состояния */
    document.getElementById('evProdGrid').addEventListener('click', function(e){
      var add = e.target.closest('[data-add]');
      if(add && window.EV){ EV.cart.add(add.dataset.add); }
      if(e.target.hasAttribute('data-reset')) resetAll();
    });

    render();
  });

})(window, document);
