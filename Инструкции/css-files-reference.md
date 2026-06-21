# Справочник: CSS-файлы проекта

_Проверено по реальным файлам с сервера._

---

## Файлы редизайна (ev-*) — актуальное содержимое

Все подключаются в `footer.php` через `Asset::getInstance()->addCss(...)`. Порядок: ev-base первым.

### ev-base.css
**Назначение:** CSS-переменные, типографика, базовые утилиты  
**CSS-переменные (подтверждены):**
```css
--ev-green: #2d7a3a (или близкий) — основной зелёный
--ev-green-d: #2d7a1a              — тёмный зелёный (hover)
--ev-radius: 12px
--ev-shadow-s: 0 2px 8px rgba(0,0,0,.08)
--ev-shadow: 0 4px 24px rgba(0,0,0,.12)
--ev-ink: #1a1a1a
--ev-gray: #888
--ev-gray3: #ddd
--ev-bg: #f4f5f0
--ev-line: (border color)
```

### ev-header.css
**Назначение:** хедер, топбар, оверлей каталога, мобильное меню  
**Ключевые блоки:**
- `.ev-topbar` — верхняя навигационная полоса
- `.ev-header` — основной хедер (логотип, поиск, контакты, корзина)
- `.ev-catoverlay` / `.ev-catlist` / `.ev-catpane` / `.ev-catright` — оверлей каталога
- `.ev-mmenu` / `.ev-mslider` / `.ev-mlevel` — мобильное меню
- `.ev-search` / `.ev-find` — поиск в хедере
- `.ev-mtools` — мобильные кнопки (телефон, поиск, корзина, бургер)

**Содержит накопленные правки для поиска** (скрытие `#bx-title-search`, позиционирование). Перед правкой обязательно читать полный файл с сервера.

### ev-footer.css
**Назначение:** футер (`.ev-footer`)  
Блоки: `.ev-foot-soc`, `.ev-foot-main`, `.ev-foot-row1`, `.ev-foot-nav`, `.ev-foot-copy`, `.ev-foot-phone`, `.ev-foot-mail`, `.ev-foot-iso`

### ev-home.css
**Назначение:** главная страница  
Блоки: `.ev-home`, `.ev-home-hero`, `.ev-stamp`, `.ev-cat-grid`, `.ev-cat-card`, `.ev-cat-photo`, `.ev-cat-hover`, `.ev-cat-sublist`, `.ev-feature-strip`, `.ev-feature`, `.ev-fic`, `.ev-about`, `.ev-video`, `.ev-play`, `.ev-reviews`, `.ev-reviews-grid`, `.ev-review`, `.ev-review-head`, `.ev-review-text`, `.ev-review-more`, `.ev-who`, `.ev-date`, `.ev-btn`

### ev-catalog.css ← САМЫЙ ЧАСТЫЙ ПРЕДМЕТ ПРАВОК
**Актуальное содержимое (подтверждено):**

**Блок 1 — общий layout:**
```css
.ev-cat-page { padding-bottom: 80px; }
.ev-cat-layout { display: grid; gap: 54px; align-items: start; }
.ev-cat-layout:has(.ev-side) { grid-template-columns: 300px 1fr; }
```

**Блок 2 — сайдбар:**
```css
.ev-side { position: sticky; top: 170px; }
.ev-side nav a { font-size: 19px; ... }
.ev-side nav a.is-active { color: var(--ev-green); font-weight: 600; }
```

**Блок 3 — сетка серий (страница раздела):**
```css
.ev-series-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 30px; }
.ev-series-card { ... переходы, тень, padding-bottom: 22px ... }
.ev-series-chip { position: absolute; left: 18px; top: 18px; background: var(--ev-green); }
.ev-series-card .ev-ph { height: 300px; }
```

**Блок 4 — карточки товаров (CSS-оверрайды):**
```css
/* Сетка: 4 колонки по умолчанию, 3 при наличии сайдбара .ev-side */
.ev-scope .product-container--catalog.items { grid-template-columns: repeat(4,1fr); ... }
.ev-scope .ev-cat-layout:has(.ev-side) .product-container--catalog.items { grid-template-columns: repeat(3,1fr); }

/* Карточка <form class="catalog_list_item"> */
.ev-scope form.catalog_list_item { flex-direction: column; border-radius: var(--ev-radius); ... }
.ev-scope form.catalog_list_item .item_image { height: 200px; background: none !important; }
.ev-scope form.catalog_list_item .item_warranty { display: none !important; }
.ev-scope form.catalog_list_item .item_name a { color: var(--ev-green); font-weight: 600; }
.ev-scope form.catalog_list_item .item_price { font-size: 18px; font-weight: 700; }
.ev-scope form.catalog_list_item a.button-buy { display: none !important; }
.ev-scope form.catalog_list_item a.button-buy.active { display: inline-flex !important; background: var(--ev-green); }
.ev-scope form.catalog_list_item .counter-block { display: none !important; }
.ev-scope form.catalog_list_item .counter-block.active { display: flex !important; }
```

**Блок 5 — section_vertical layout (листинг с фильтром):**
```css
/* Убираем float, делаем .left_col частью grid */
.ev-scope .ev-cat-layout .left_col.sidebar,
.ev-scope .ev-cat-layout .right_col.catalog { float: none !important; width: auto !important; }
.ev-scope .ev-cat-layout .left_col.sidebar { position: sticky !important; top: 170px !important; }
.ev-scope .ev-cat-layout:has(.left_col.sidebar) { grid-template-columns: 300px 1fr !important; }
```

**Блок 6 — адаптив:**
```css
@media(max-width:1200px) { /* 3 колонки, при сайдбаре 2 */ }
@media(max-width:1024px) { /* одна колонка, сайдбар горизонтально */ }
@media(max-width:768px)  { /* 2 колонки, высота фото 150px */ }
```

### ev-product.css
**Назначение:** карточка товара — **не заполнен** (интеграция не начата).

---

## Старые CSS-файлы (не трогать, знать)

Порядок подключения в `footer.php`:
1. `styles_new.min.css` — основные стили (содержит Graphik LCG через `font/graphik/`) ← **шрифт уже здесь**
2. `css/app.min.css`
3. `style_select.css`
4. `css/plugins.min.css`
5. `css/slick.min.css`
6. `fancybox/src/css/core.css` + fullscreen + slideshow + thumbs

**Конфликтующие с редизайном:**

| Файл | Строк | Конфликтует с |
|---|---|---|
| `styles_new.min.css` | ~3000+ | `.catalog_list_item`, `.item_image`, `.item_warranty`, `.header_main`, `.header_mobile` |
| `css/app.min.css` | — | Общие компоненты, Bootstrap grid |

`template_styles.css` и `styles.css` также содержат конкурирующие стили. Все они загружаются **до** ev-* файлов, поэтому ev-* перекрывают их. Для надёжного перекрытия нужны `!important` с `.ev-scope`.

---

## Graphik LCG — шрифт (ЗАКРЫТЫЙ ВОПРОС)

Шрифт **уже подключён** через `styles_new.min.css` → `font/graphik/` на сервере.  
Manrope (Google Fonts) подключается в `header.php` через `<link>` — **нужно убрать** при финальном QA.  
Отдельной задачи по шрифту нет — он работает.

---

## Как работает CSS-кеш Bitrix

Bitrix объединяет все CSS в один файл при первом запросе:
- `template_[hash]_v1.css` — стили шаблона (все ev-* + старые)
- `page_[hash]_v1.css` — постраничные стили (компоненты страницы)

**После любого изменения CSS:**
```bash
rm -rf /home/bitrix/www/bitrix/cache/css/s1/eurovazon_0420/
```

**Проверка попал ли CSS в кеш:**
```bash
# Получить URL кешированного файла
curl -s -H "Host: test.eurovazon.com" http://localhost/ | grep 'href.*cache.*css'

# Проверить содержимое
curl -s "http://localhost/bitrix/cache/css/s1/eurovazon_0420/template_[hash]/template_[hash]_v1.css" \
  -H "Host: test.eurovazon.com" | grep "ev-series-grid"
```

---

## КРИТИЧНОЕ ПРАВИЛО

**Никогда не использовать `cat >>`** для добавления CSS. Только полная замена файла.  
Причина: накопление конфликтующих правил и незакрытых `@media {}` блоков.  
Незакрытый `@media { ... ` без закрывающей `}` = все последующие правила работают только внутри этого медиазапроса.
