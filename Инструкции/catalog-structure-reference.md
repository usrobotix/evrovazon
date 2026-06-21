# Справочник: структура каталога Bitrix

_Проверено по реальным файлам._

---

## Компонент каталога

**Компонент:** `bitrix:catalog`  
**Шаблон:** `template_ajax`  
**SEF-путь:** `/internet-magazin/`  
**Iblock ID:** `1`, тип `1c_catalog`  
**Пагинация:** `bxmaker.ajaxpagenav`

---

## URL-структура

| Тип страницы | URL | Файл шаблона |
|---|---|---|
| Раздел (список серий) | `/internet-magazin/folder/[code]/` | `section.php` → сетка `.ev-series-grid` |
| Подраздел (листинг) | `/internet-magazin/folder/[parent-code]/[child-code]/` | `section.php` → `section_vertical.php` |
| Товар | `/internet-magazin/product/[code]/` | `element.php` |
| Поиск | `/internet-magazin/search/?q=...` | `search.php` |

---

## Дерево разделов (b_iblock_section, IBLOCK_ID=1)

```
DEPTH_LEVEL=1 — Разделы-категории (Урны, Вазоны, Скамейки, Ограждения...)
  ├── UF_INVIZ=1 → скрыт (не показывать в меню, не рендерить)
  ├── ID=2 → особый раздел (всегда пропускается в шаблонах: if ID==2 continue)
  └── DEPTH_LEVEL=2 — Подразделы/серии (Бетонные скамейки, Металлические...)
        ├── UF_SER_FOLDER='N' → папка (показывать в меню каталога)
        ├── UF_SER_FOLDER='Y' → серия товаров (не показывать в меню)
        └── элементы (товары)
```

**Фильтры в запросах:**
- `'UF_SER_FOLDER' => 'N'` — только папки (для меню и сетки серий)
- `'UF_INVIZ' => 1` → пропустить
- `'ID' == 2` → пропустить (hardcoded в шаблонах)

---

## Файлы шаблона catalog/template_ajax/

| Файл | Назначение | Строк |
|---|---|---|
| `section.php` | Роутер: определяет есть ли дочерние разделы. Если есть — рендерит `.ev-series-grid`. Если нет — включает `section_vertical.php` | ~130 |
| `section_vertical.php` | Листинг товаров с вертикальным фильтром `.left_col.sidebar` + `.right_col.catalog` | 720 |
| `section_horizontal.php` | Листинг без сайдбара — используется если `FILTER_VIEW_MODE != 'VERTICAL'` | — |
| `element.php` | Карточка товара (detail page) — **не переписана, нужна интеграция** | — |
| `search.php` | Страница поиска — подключает `bitrix:catalog.search` стандартный шаблон | — |
| `sections.php` | Список разделов — не используется в текущей конфигурации | — |

---

## section.php — логика роутинга (реальный код)

```php
// 1. Получаем текущий раздел по SECTION_CODE
$arCurSection = CIBlockSection::GetList(..., ['=CODE' => $arResult["VARIABLES"]["SECTION_CODE"]])

// 2. Получаем родительский раздел (для сайдбара)
if ($arCurSection['IBLOCK_SECTION_ID']) {
    $arParent = CIBlockSection::GetByID($arCurSection['IBLOCK_SECTION_ID'])
}

// 3. Ищем дочерние подразделы текущего раздела
$arChildren = CIBlockSection::GetList(..., ['SECTION_ID' => $arCurSection['ID']])

// 4. Формируем сайдбар из соседних разделов (дети родителя)
$arSiblings = CIBlockSection::GetList(..., [
    'SECTION_ID' => $arParent['ID'],
    'UF_SER_FOLDER' => 'N'  // только папки
])

// 5. Если есть дочерние → рендерим .ev-series-grid
// 6. Если нет → include section_vertical.php
```

**Превью для карточки серии:**
```php
// Если у раздела нет PICTURE → берём PREVIEW_PICTURE первого товара
if (empty($arChild['PICTURE'])) {
    $rsEl = CIBlockElement::GetList(..., ['SECTION_ID' => $arChild['ID']], ['nTopCount' => 1], ['PREVIEW_PICTURE'])
    $arChild['PICTURE'] = $arEl['PREVIEW_PICTURE'] ?: $arEl['DETAIL_PICTURE']
}
```

---

## Шаблоны меню каталога

| Шаблон | Тип меню | Уровней | Где рендерится |
|---|---|---|---|
| `catalog_menu_button` | catalog | 3 (дерево) | Desktop оверлей `.ev-catoverlay` |
| `catalog_header_mobile` | catalog | 1 (только DEPTH_LEVEL=1) | Mobile меню `.ev-mmenu`, уровень «каталог» |
| `catalog_menu_left` | catalog | 3 | Сайдбар `.left_col.sidebar` внутри section_vertical |
| `top_menu` | top | 2 | Топбар `.ev-topbar` |
| `top_menu_mobile` | top | 1 | Mobile меню, главный уровень |

---

## catalog_menu_button/template.php — реальная логика

```php
// Строит дерево через CIBlockSection::GetList с массивом $sectionLinc
// Фильтр: ACTIVE=Y, IBLOCK_ID=1, GLOBAL_ACTIVE=Y, UF_SER_FOLDER=N
// Пропускает: ID==2, UF_INVIZ==1, разделы без CHILD

// Рендерит:
// nav.ev-catlist — список категорий (a[data-cat-id])
// div.ev-catright — панели категорий (.ev-catpane[data-cat-pane])
//   каждая панель: .ev-cathero (название + фото) + .ev-catsubs (подкатегории)

// Первая категория с CHILD получает class="is-active" по умолчанию
```

---

## catalog_header_mobile/template.php — реальная логика

```php
// Простой список: только DEPTH_LEVEL=1, UF_SER_FOLDER=N
// Пропускает: ID==2
// Рендерит: <a class="ev-mrow" href="...">Название</a>
// Клик сразу переходит на страницу раздела (без 3-го уровня)
```

---

## Компоненты внутри section_vertical.php

| Компонент | Шаблон | Путь шаблона |
|---|---|---|
| `bitrix:menu` | `catalog_menu_left` | `/components/bitrix/menu/catalog_menu_left/` |
| `kombox:filter` | `ajax` | `/components/kombox/filter/ajax/` |
| `bitrix:catalog.section` | `tile_ajax` | `/components/bitrix/catalog.section/tile_ajax/` |
| `bitrix:catalog.item` (внутри tile_ajax) | `tile` → `card/` | `/components/bitrix/catalog.item/tile/card/template.php` |
| `bitrix:news.list` | `main_reviews` | `/components/bitrix/news.list/main_reviews/template.php` |

---

## news.list/main_reviews — реальный шаблон

```php
// Путь: /components/bitrix/news.list/main_reviews/template.php
// Iblock ID: 3 (отзывы), подключается из index.php (главная) и section_vertical.php (листинг)

// Рендерит foreach по $arResult["ITEMS"]:
// .ev-review
//   .ev-review-head (аватар или avatar.png, .ev-who, .ev-date)
//   .ev-review-text ($arItem['PREVIEW_TEXT'])
//   a.ev-review-more → $arItem['DETAIL_PAGE_URL'] ("Читать полностью")

// result_modifier.php ресайзит:
// PHOTOS['MIN'] = 140x70 из PREVIEW_PICTURE
// PHOTOS['MAX'] = 1200x1200 из DETAIL_PICTURE
// (Но в новом template.php используется $arItem['PREVIEW_PICTURE']['SRC'] напрямую)
```

---

## Страница поиска (search.php)

`search.php` в `catalog/template_ajax/` подключает `bitrix:catalog.search` стандартный шаблон — редизайн этой страницы не входит в текущий скоуп.
