# Инструкция для Claude — проект eurovazon редизайн

## Обязательно читать перед каждой сессией

---

## 0. Контекст проекта

**Что делаем:** интеграция редизайна (Figma → HTML/CSS) в существующий 1С-Битрикс шаблон `eurovazon_0420`. Новая верстка накладывается поверх старой через CSS-оверрайды. Старый функционал (корзина, фильтр, поиск) сохраняется полностью.

**Сервер:** SSH bitrix@dev, документ-рут `/home/bitrix/www/`, тестовый домен `test.eurovazon.com`  
**Шаблон:** `/home/bitrix/www/bitrix/templates/eurovazon_0420/`  
**Активный каталог:** компонент `bitrix:catalog`, шаблон `template_ajax`, SEF-путь `/internet-magazin/`

---

## 1. Справочные файлы проекта — читать до сканирования сервера

Перед любым шагом интеграции — прочитай нужный справочный файл. Они содержат всё, что нужно знать о структуре файлов. Повторно сканировать сервер нужно только для получения **актуального содержимого конкретного файла** перед правкой.

| Справочник | Когда читать |
|---|---|
| `integration-reference.md` | Перед любым шагом. Структура шаблона, маппинг компонентов, порядок ресурсов |
| `includes-reference.md` | При работе с хедером, футером, телефонами, email, логотипом, соцсетями |
| `catalog-item-tile-reference.md` | При работе с карточками товаров (CSS-оверрайды, что нельзя трогать) |
| `section-vertical-reference.md` | При работе со страницей листинга (section_vertical.php, проблема с layout) |
| `search-reference.md` | При работе с поиском (JCTitleSearch, AJAX, форма) |
| `filter-reference.md` | При работе с фильтром (kombox:filter, структура, CSS-классы) |
| `catalog-structure-reference.md` | При работе с каталогом (разделы, URL-структура, все компоненты и их шаблоны) |
| `product-detail-reference.md` | При работе с карточкой товара (Swiper 11, Fancybox 5) |
| `css-files-reference.md` | При любой правке стилей (что в каком файле, порядок, конфликты) |
| `js-files-reference.md` | При любой правке скриптов (ev-core, ev-catalog-menu, порядок подключения) |

---

## 2. Железные правила — никогда не нарушать

### CSS
- **Никогда `cat >>`** для добавления CSS. Только полная замена файла (скачать актуальный с сервера, отредактировать, загрузить целиком).
- После каждого изменения CSS: `rm -rf /home/bitrix/www/bitrix/cache/css/s1/eurovazon_0420/`
- `grid-template-columns` в `.ev-cat-layout` — только через `:has(.ev-side)` или `:has(.left_col.sidebar)`, никогда как значение по умолчанию.
- Все новые стили — только с префиксом `.ev-`, внутри `.ev-scope`.
- `!important` — только с комментарием почему нужен (конфликт с `template_styles.css` или `styles_new.min.css`).
- **Проверять закрытость всех `@media {}`** — незакрытый блок = все последующие правила только в этом медиазапросе.

### PHP
- **Никогда не трогать PHP-логику** `catalog.item/tile/card/template.php` (858 строк). Только CSS-оверрайды.
- Не удалять старые компоненты (`.header_mobile`, `.modal_header_*`, `.header_main`) — только скрывать через `display:none`.
- Не менять `$itemIds`, `buy_one_more()`, `.lazy`+`data-src`, `.counter-block` — JS-биндинги Bitrix.
- `id="catalog_items_block"` в `section_vertical.php` — не переименовывать (нужен для AJAX-пагинации).

### Сервер
- Перед правкой любого файла — читать его **актуальную версию** с сервера (`cat` или `sed -n` нужных строк).
- Для многострочных замен в PHP — не использовать `sed -i 'N,Mc\...'` (ненадёжно). Использовать полную замену файла через SFTP.
- После замены файла — проверять через `curl -s -H "Host: test.eurovazon.com" http://localhost/ | grep "ключевой_класс"`.

---

## 3. Алгоритм изменений

### Изменение CSS-файла
1. Прочитать `css-files-reference.md`
2. Получить актуальный файл: `cat /home/bitrix/www/.../ev-catalog.css`
3. Подготовить новую версию **целиком** (не дописывать, а переписывать)
4. Загрузить через SFTP, заменив оригинал
5. Сбросить кеш: `rm -rf /home/bitrix/www/bitrix/cache/css/s1/eurovazon_0420/`
6. Проверить: `curl -s -H "Host: test.eurovazon.com" http://localhost/[путь]/ | grep "нужный_класс"`

### Изменение PHP-файла
1. Прочитать актуальный файл: `sed -n 'N,Mp' /путь/к/файлу.php`
2. Если правка < 2 строк и уникальна → `sed -i 's/старое/новое/'` + проверка
3. Если правка многострочная → подготовить файл целиком, загрузить через SFTP
4. Проверить через curl что нужные классы/данные есть в HTML

### Изменение шаблона компонента
1. Прочитать соответствующий справочник
2. Прочитать текущий шаблон с сервера: `cat /путь/к/template.php`
3. Подготовить новую версию целиком, загрузить через SFTP

---

## 4. Структура файлов

```
/home/bitrix/www/
├── index.php                    ← главная страница (в корне сайта)
└── bitrix/templates/eurovazon_0420/
    ├── header.php               ← новый хедер (.ev-header, .ev-topbar, .ev-mmenu)
    ├── footer.php               ← Asset подключение всех CSS/JS + новый .ev-footer
    ├── css/
    │   ├── ev-base.css          ← CSS-переменные (--ev-green и др.)
    │   ├── ev-header.css        ← хедер, оверлей каталога, мобильное меню
    │   ├── ev-footer.css        ← футер
    │   ├── ev-home.css          ← главная
    │   ├── ev-catalog.css       ← каталог: серии + листинг + CSS-оверрайды карточек
    │   └── ev-product.css       ← карточка товара (пустой, интеграция не начата)
    ├── js/
    │   ├── ev-core.js           ← namespace EV, тосты, демо-корзина
    │   ├── ev-catalog-menu.js   ← оверлей каталога + мобильное меню
    │   ├── ev-home.js           ← главная (раскрытие отзывов, видео)
    │   ├── ev-catalog.js        ← ДЕМО, в проде не используется
    │   └── ev-product.js        ← карточка товара (не активен)
    ├── vendor/
    │   ├── swiper/              ← Swiper 11 (только для карточки товара)
    │   └── fancybox5/           ← Fancybox 5 (только для карточки товара)
    ├── font/graphik/            ← Graphik LCG woff2 (уже подключён через styles_new.min.css)
    ├── images/                  ← SVG и PNG изображения шаблона
    ├── includes/                ← include-файлы (телефоны, email, логотип, соцсети)
    └── components/bitrix/
        ├── menu/
        │   ├── catalog_menu_button/template.php    ← оверлей каталога desktop
        │   └── catalog_header_mobile/template.php  ← мобильный каталог (1 уровень)
        ├── catalog/template_ajax/
        │   ├── section.php           ← роутер: серии или листинг
        │   ├── section_vertical.php  ← листинг с фильтром (не переписывать PHP!)
        │   ├── element.php           ← карточка товара (не начата)
        │   └── search.php            ← поиск (стандартный, не трогать)
        ├── catalog.item/tile/card/template.php  ← НЕ ТРОГАТЬ PHP (858 строк)
        ├── catalog.section/tile_ajax/template.php ← НЕ ТРОГАТЬ PHP
        └── news.list/main_reviews/
            ├── template.php         ← отзывы (.ev-review), ПЕРЕПИСАН под редизайн
            └── result_modifier.php  ← ресайз PHOTOS MIN/MAX (оставить)
```

---

## 5. Маппинг блоков верстки → Bitrix

| Блок (.ev-класс) | Bitrix-компонент | Шаблон |
|---|---|---|
| `.ev-topbar` | `bitrix:menu` | `top_menu` |
| `.ev-catoverlay` | `bitrix:menu` | `catalog_menu_button` |
| `.ev-mmenu` (каталог) | `bitrix:menu` | `catalog_header_mobile` |
| `.ev-mmenu` (топ-меню) | `bitrix:menu` | `top_menu_mobile` |
| `.ev-search` | простая форма GET `/search/?q=` | — |
| `.ev-cart` | `bitrix:sale.basket.basket.small` | — |
| `.ev-contact-phone` | `includes/phone.php` | roistat-phone-1 |
| `.ev-contact-mail` | `includes/header_email.php` | — |
| `.ev-series-grid` | PHP: `CIBlockSection::GetList` | в `section.php` |
| `.catalog_list_item` (карточка) | `bitrix:catalog.item` → `tile/card` | CSS-оверрайд |
| `.ev-review` | `bitrix:news.list` | `main_reviews` |
| `.ev-foot-phone` | `includes/footer_phone1.php` | 8 800 775-60-11 |

---

## 6. Известные конфликты CSS

| Конфликт | Решение |
|---|---|
| `styles_new.min.css` содержит стили для `.catalog_list_item` без `.ev-scope` | Перебивать через `.ev-scope form.catalog_list_item` + `!important` |
| `.item_image` получает `background-image: url(loading.gif)` из старого CSS | `.ev-scope .catalog_list_item .item_image { background: none !important; }` |
| `.item_warranty` показывается в медиазапросах старого CSS | `.ev-scope form.catalog_list_item .item_warranty { display: none !important; }` |
| `section_vertical.php` рендерит `.left_col + .right_col` внутри `<div>` в `ev-cat-layout` | Стилизовать через `:has(.left_col.sidebar)`, см. `section-vertical-reference.md` |
| Старый jQuery Fancybox конфликтует с Fancybox 5 | Fancybox 5 из `vendor/` — только на карточке товара, не глобально |

---

## 7. Статус задач

| Задача | Статус |
|---|---|
| Хедер, топбар, мобильное меню | ✅ Готово |
| Оверлей каталога desktop | ✅ Готово |
| Футер | ✅ Готово |
| Главная страница | ✅ Готово |
| Страница раздела (сетка серий) | ✅ Готово |
| Страница листинга (карточки товаров) | 🔧 В работе — проблема с layout (3 колонки вместо 4) |
| Карточка товара (detail) | ○ Не начато |
| Поиск с автодополнением | ○ Отложено (TODO) |
| Шрифт Graphik LCG | ✅ Уже на сервере в `font/graphik/`, подключён через `styles_new.min.css` |
| Telegram в футере | ○ Ждём ссылку от клиента |
| Корзина через Bitrix | ○ Перед сдачей (сейчас демо через localStorage) |
| QA 375/768/1440px | ○ После всех компонентов |
| Перенос на продакшн | ○ После QA |

---

## 8. Быстрые команды

```bash
# Сброс CSS-кеша (после любого изменения CSS)
rm -rf /home/bitrix/www/bitrix/cache/css/s1/eurovazon_0420/

# Проверка что ev-классы есть в HTML
curl -s -H "Host: test.eurovazon.com" http://localhost/ | grep -o 'ev-[a-z-]*' | sort | uniq

# Читать диапазон строк файла
sed -n '100,150p' /home/bitrix/www/bitrix/templates/eurovazon_0420/header.php

# Поиск строки в файле с номерами строк
grep -n "ev-search\|left_col" /home/bitrix/www/.../section_vertical.php

# Проверить попал ли CSS в кеш
curl -s -H "Host: test.eurovazon.com" http://localhost/internet-magazin/folder/skameyki/ \
  | grep 'href.*cache.*css'

# Активный шаблон (проверка)
mysql -u bitrix0 -p sitemanager -e "SELECT LID, TEMPLATE FROM b_site_template;"
```
