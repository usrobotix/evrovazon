# Справочник: фильтр каталога — kombox:filter

---

## Что это

Кастомный компонент `kombox:filter` шаблон `ajax`. Умный фильтр: цена, материал, форма, размер.  
Путь шаблона: `/bitrix/templates/eurovazon_0420/components/kombox/filter/ajax/`

---

## Где подключается

В `section_vertical.php` (~строки 108–145):

```php
$APPLICATION->IncludeComponent(
  "kombox:filter",
  "ajax",
  array(
    "IBLOCK_TYPE" => $arParams["IBLOCK_TYPE"],
    "IBLOCK_ID" => $arParams["IBLOCK_ID"],
    "FILTER_NAME" => $arParams["FILTER_NAME"],
    "SECTION_ID" => $arResult["VARIABLES"]["SECTION_ID"],
    "SECTION_CODE" => $arResult["VARIABLES"]["SECTION_CODE"],
    "HIDE_NOT_AVAILABLE" => "N",
    "CACHE_TYPE" => "A",
    "CACHE_TIME" => $arParams["CACHE_TIME"],
    "CACHE_GROUPS" => "N",
    "SAVE_IN_SESSION" => "N",
    "INCLUDE_JQUERY" => "Y",
    "MESSAGE_ALIGN" => "RIGHT",
    "MESSAGE_TIME" => "0",
    "IS_SEF" => "N",
    ...
  )
);
```

Рендерится внутри `.left_col.sidebar`.

---

## HTML-структура фильтра (на выходе)

```html
<div class="kombox-filter">
  <!-- Фильтр по цене -->
  <div class="kombox-filter__section">
    <div class="kombox-filter__heading">Цена</div>
    <div class="kombox-filter__price">
      <input type="number" class="kombox-filter__price-from" name="price_from">
      <input type="number" class="kombox-filter__price-to" name="price_to">
    </div>
  </div>

  <!-- Фильтр по свойству (Материал, Форма, Размер) -->
  <div class="kombox-filter__section">
    <div class="kombox-filter__heading">Материал</div>
    <div class="kombox-filter__list">
      <label class="kombox-filter__item">
        <input type="checkbox" name="filter[...]" value="...">
        <span>Бетон</span>
      </label>
    </div>
  </div>

  <!-- Кнопка применить -->
  <button type="submit" class="kombox-filter__submit">Применить</button>
</div>
```

---

## CSS-классы фильтра (из template_styles.css)

```css
.kombox-filter { ... }
.kombox-filter button[type=submit] {
  font-size: 16px; height: 45px; background: #46a128; /* зелёный */
  border-radius: 8px; color: #fff;
}
.kombox-filter__heading { display: none; } /* скрыт в десктопе */
```

---

## AJAX-механизм

Фильтр отправляет запрос с `filter_ajax=y`. В `section_vertical.php`:
```php
$ajax = $_POST['filter_ajax'] == 'y';
```

При AJAX-запросе обновляется только `#catalog_items_block` (правая колонка с товарами).

**Не трогать `#catalog_items_block`** — это ID нужен для AJAX.

---

## Как стилизовать фильтр под дизайн

Фильтр рендерится внутри `.left_col.sidebar`. Для стилизации под `.ev-side`:

```css
/* Переопределить внешний вид kombox-filter */
.ev-scope .left_col.sidebar { width: 280px; /* ... */ }
.ev-scope .kombox-filter__heading { display: block !important; /* показать */ }
.ev-scope .kombox-filter__submit { /* стиль кнопки */ }
```

---

## Что не делать

- Не убирать `kombox:filter` из section_vertical.php — это рабочий фильтр клиента
- Не менять `FILTER_NAME` — это имя переменной фильтра, нужно для AJAX
- Не удалять `#catalog_items_block` — нужен для AJAX-обновления
