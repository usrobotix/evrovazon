# Справочник: section_vertical.php — страница листинга товаров

_Путь: `/home/bitrix/www/bitrix/templates/eurovazon_0420/components/bitrix/catalog/template_ajax/section_vertical.php`_  
_720 строк. Проверено по реальному файлу._

---

## Что рендерит на выходе — реальная HTML-структура

```html
<!-- Внутри <div> (правая колонка ev-cat-layout из section.php) -->

<!-- Левая колонка: фильтр -->
<div class="left_col sidebar">
  <!-- bitrix:menu → catalog_menu_left (подкатегории) -->
  <!-- kombox:filter → ajax (умный фильтр: цена, материал, форма, размер) -->
</div>

<!-- Правая колонка: товары -->
<div class="right_col catalog" id="catalog_items_block">

  <!-- Сортировка -->
  <div class="title_small sorting">
    <div class="summary-mobile">...</div>
    <!-- сортировка по цене/названию -->
  </div>

  <!-- Сетка карточек (через bitrix:catalog.section → tile_ajax) -->
  <div class="product-container product-container--catalog items">
    <form class="catalog_list_item ...">
      <!-- карточка товара (от catalog.item/tile/card/template.php) -->
    </form>
    ...
  </div>

  <!-- Пагинация -->

  <!-- Отзывы (bitrix:news.list → main_reviews) -->

  <!-- SEO-текст (bitrix:main.include → seo_text) -->
</div>
```

---

## Проблема с ev-cat-layout (текущее состояние)

`section.php` при отсутствии подразделов включает `section_vertical.php` внутри `<div>` (второй столбец grid):

```
.ev-cat-layout (grid: 300px 1fr  ← если есть .ev-side из сайдбара)
  ├── aside.ev-side          ← сайдбар с подкатегориями (рендерит section.php)
  └── <div>                  ← второй столбец
        ├── .left_col.sidebar ← фильтр kombox + меню (рендерит section_vertical.php)
        └── .right_col.catalog ← товары (рендерит section_vertical.php)
```

**Текущее решение в ev-catalog.css:**
```css
/* Убираем float layout */
.ev-scope .ev-cat-layout .left_col.sidebar,
.ev-scope .ev-cat-layout .right_col.catalog { float: none !important; width: auto !important; }

/* Когда есть left_col — переопределяем grid на нужный */
.ev-scope .ev-cat-layout:has(.left_col.sidebar) { grid-template-columns: 300px 1fr !important; }
.ev-scope .ev-cat-layout .left_col.sidebar { position: sticky !important; top: 170px !important; }
```

**Проблема:** `left_col` и `right_col` находятся внутри `<div>` (второй столбец), а не напрямую в `.ev-cat-layout`. Поэтому `:has(.left_col.sidebar)` срабатывает, но `grid-template-columns` делит пространство не так как нужно.

**Что нужно сделать (задача #1):** либо переписать `section.php` чтобы `left_col` выходил на уровень `ev-cat-layout`, либо переопределить `<div>`-обёртку через CSS как `display:contents`.

---

## Ключевые компоненты внутри section_vertical.php

| Компонент | Шаблон | Назначение |
|---|---|---|
| `bitrix:menu` | `catalog_menu_left` | Подкатегории в сайдбаре `.left_col` |
| `kombox:filter` | `ajax` | Умный фильтр (цена, материал, форма, размер) |
| `bitrix:catalog.section` | `tile_ajax` | Сетка карточек товаров |
| `bitrix:news.list` | `main_reviews` | Отзывы внизу страницы |
| `bitrix:main.include` | файл `seo_text` | SEO-текст внизу |

---

## AJAX-механизм (не трогать)

```php
$ajax = $_POST['filter_ajax'] == 'y'; // флаг AJAX-запроса
```

При фильтрации или пагинации Bitrix обновляет только `#catalog_items_block`.  
**ID `catalog_items_block` нельзя убирать или переименовывать.**

---

## Параметры компонента (влияют на поведение)

- `USE_FILTER = 'Y'` — показывать фильтр (kombox)
- `FILTER_VIEW_MODE = 'VERTICAL'` — фильтр вертикальный (в сайдбаре)
- `PAGE_ELEMENT_COUNT` — товаров на страницу
- `SIDEBAR_SECTION_SHOW` — показывать боковое меню категорий

---

## Что нельзя трогать

- `$APPLICATION->IncludeComponent("kombox:filter", ...)` — рабочий фильтр клиента
- `id="catalog_items_block"` — нужен для AJAX-обновления
- `$ajax = $_POST['filter_ajax'] == 'y'` — флаг AJAX
- `SetViewTarget("filter_area")` / `ShowViewContent` — механизм вставки фильтра
