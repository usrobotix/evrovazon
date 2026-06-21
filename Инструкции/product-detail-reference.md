# Справочник: карточка товара — catalog.element

_Следующий этап после завершения листинга._

---

## Компонент

**Компонент:** `bitrix:catalog`  
URL товара: `/internet-magazin/product/[code]/`  
**Шаблон страницы:** `element.php` из `catalog/template_ajax/`

---

## Что нужно подключить (только на карточке товара)

```php
// В шаблоне element.php или через Asset в section.php при наличии ELEMENT_CODE
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/vendor/swiper/swiper-bundle.min.css");
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/vendor/fancybox5/fancybox.css");
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/css/ev-product.css");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/vendor/swiper/swiper-bundle.min.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/vendor/fancybox5/fancybox.umd.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/ev-product.js");
```

**НЕ подключать Swiper/Fancybox глобально** — только на странице товара.

---

## Версии библиотек

| Библиотека | Версия | Путь |
|---|---|---|
| Swiper | 11 | `/vendor/swiper/swiper-bundle.min.js` |
| Fancybox | 5 (без jQuery) | `/vendor/fancybox5/fancybox.umd.js` |
| Старый Swiper | 6.8.4 | `/css/swiper-bundle.min.css` — НЕ использовать |
| Старый Fancybox | jQuery-based | `/fancybox/dist/` — НЕ использовать |

---

## Структура дизайна карточки товара (из product.html)

```html
<main class="ev-product-page">
  <div class="ev-wrap">
    <nav class="ev-crumbs">...</nav>
    
    <div class="ev-product-layout">
      <!-- Левая колонка: галерея -->
      <div class="ev-gallery">
        <div class="ev-gallery-main swiper">...</div>    <!-- Swiper -->
        <div class="ev-gallery-thumbs swiper">...</div>  <!-- миниатюры -->
        <!-- кнопки Fancybox -->
      </div>
      
      <!-- Правая колонка: инфо о товаре -->
      <div class="ev-product-info">
        <h1 class="ev-product-title">...</h1>
        <div class="ev-price">...</div>
        <div class="ev-characteristics">...</div>
        <div class="ev-actions">
          <!-- кнопка В корзину, счётчик -->
        </div>
        <div class="ev-series-badge">...</div>
      </div>
    </div>
    
    <!-- Табы: описание, характеристики, документы -->
    <div class="ev-product-tabs">...</div>
    
    <!-- Похожие товары -->
    <div class="ev-related">...</div>
  </div>
</main>
```

---

## Bitrix-данные доступные в element.php

```php
$arResult["ITEM"]          // данные элемента
$arResult["ITEM"]["DETAIL_PICTURE"]  // основное фото
$arResult["ITEM"]["MORE_PHOTO"]      // дополнительные фото (свойство)
$arResult["ITEM"]["PRICE"]           // цена
$arResult["ITEM"]["PROPERTIES"]      // свойства (размеры, вес, материал)
$arResult["ITEM"]["DETAIL_TEXT"]     // описание (HTML)
$arResult["ITEM"]["PROPERTIES"]["SERIA"]["VALUE"]  // серия
```

---

## Что из старого шаблона можно переиспользовать

Посмотреть актуальный шаблон: `cat /home/bitrix/www/bitrix/templates/eurovazon_0420/components/bitrix/catalog/template_ajax/element.php`

Из старого сохранить:
- PHP-логику получения SKU/офферов
- Обработку добавления в корзину (`buy_one_more()`)
- `$itemIds` атрибуты (нужны для JS Bitrix)
- Компонент сравнения (если есть)

---

## Инициализация Swiper и Fancybox 5 (ev-product.js)

```js
// Галерея главного фото
const mainSwiper = new Swiper('.ev-gallery-main', {
  thumbs: { swiper: thumbsSwiper }
});

// Миниатюры
const thumbsSwiper = new Swiper('.ev-gallery-thumbs', {
  slidesPerView: 4,
  spaceBetween: 8,
  freeMode: true,
  watchSlidesProgress: true
});

// Fancybox 5 (без jQuery)
Fancybox.bind('[data-fancybox="gallery"]', {});
```
