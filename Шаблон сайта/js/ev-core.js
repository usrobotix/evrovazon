/* ============================================================
   ev-core.js — общий модуль редизайна: namespace, корзина, тосты.
   Инкапсулировано в window.EV — не засоряет глобальный скоуп,
   не конфликтует с jQuery 2.2.0 и штатным JS Bitrix.
   ВНИМАНИЕ: счётчик корзины здесь — ДЕМО (localStorage).
   В проде заменяется данными штатного компонента sale.basket.basket.small.
   ============================================================ */
(function(window, document){
  'use strict';

  var EV = window.EV = window.EV || {};

  /* ---- Тост-уведомления ---- */
  EV.toast = function(html){
    var wrap = document.querySelector('.ev-toast');
    if(!wrap){ wrap = document.createElement('div'); wrap.className = 'ev-toast'; document.body.appendChild(wrap); }
    var t = document.createElement('div'); t.className = 'ev-t'; t.innerHTML = html; wrap.appendChild(t);
    requestAnimationFrame(function(){ t.classList.add('is-show'); });
    setTimeout(function(){ t.classList.remove('is-show'); setTimeout(function(){ t.remove(); }, 400); }, 2600);
  };

  /* ---- Корзина (демо) ---- */
  EV.cart = {
    get: function(){ return parseInt(localStorage.getItem('ev_cart') || '0', 10) || 0; },
    set: function(n){
      localStorage.setItem('ev_cart', n);
      var b = document.getElementById('evCartBadge');
      if(b) b.textContent = n;
      var bm = document.getElementById('evCartBadgeM');
      if(bm) bm.textContent = n;
    },
    add: function(name){
      this.set(this.get() + 1);
      EV.toast('<b>Добавлено в заказ</b><br>' + (name || 'Товар'));
      var cart = document.getElementById('evCart');
      if(cart && cart.animate){
        cart.animate([{transform:'scale(1)'},{transform:'scale(1.12)'},{transform:'scale(1)'}], {duration:300});
      }
    }
  };

  document.addEventListener('DOMContentLoaded', function(){
    EV.cart.set(EV.cart.get());
  });

})(window, document);
