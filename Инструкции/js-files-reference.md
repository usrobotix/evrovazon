# Справочник: JS-файлы проекта

_Все файлы проверены по реальному коду._

---

## Файлы редизайна (ev-*)

Подключаются в `footer.php` через `Asset::getInstance()->addJs(...)`.

### ev-core.js
**Назначение:** базовый namespace `EV`, тосты, демо-корзина  
**Что внутри:**
- `window.EV` — глобальный namespace (IIFE, не засоряет глобальный скоуп)
- `EV.toast(html)` — всплывающие уведомления (создаёт `.ev-toast` в body)
- `EV.cart` — счётчик корзины **ДЕМО через localStorage** (`ev_cart`)
  - `EV.cart.get()` — читает из localStorage
  - `EV.cart.set(n)` — пишет в localStorage, обновляет `#evCartBadge` и `#evCartBadgeM`
  - `EV.cart.add(name)` — +1 к счётчику + тост + анимация `#evCart`
- При `DOMContentLoaded` — инициализирует счётчик из localStorage

**TODO в продакшне:** `EV.cart` заменить данными от `bitrix:sale.basket.basket.small`. `#evCartBadge` и `#evCartBadgeM` должны обновляться Bitrix-компонентом, а не localStorage.

---

### ev-catalog-menu.js
**Назначение:** оверлей каталога (desktop) + мобильное меню + бургер  

**lockScroll / unlockScroll** — блокировка прокрутки body с компенсацией ширины скроллбара (без прыжка контента). Счётчик `lockCount` для вложенных вызовов.

**Desktop оверлей:**
- `#evCatBtn` — кнопка «Каталог», переключает `.is-open` на `#evCatOverlay`
- Escape закрывает оверлей
- `.ev-catlist a[data-cat-id]` — hover/click переключает активную `.ev-catpane[data-cat-pane="id"]`
- Клик по ссылке категории закрывает оверлей и разрешает переход

**Мобильное меню:**
- `#evMenuBtn` — бургер, открывает `#evMmenu`
- `#evMSearchBtn` — открывает меню и фокусирует `.ev-msearch input`
- `[data-go="catalog"]` / `[data-go="main"]` — навигация по уровням через `data-level` на `.ev-mslider`
- `[data-acc]` — аккордеон фильтра (класс `is-open` на `.ev-macc`)
- `[data-mclose]` — закрыть меню

---

### ev-home.js
**Назначение:** интерактив главной страницы  
**Что делает:**
- `.ev-review-more` — раскрытие/сворачивание отзыва (класс `is-open` на `.ev-review`, текст кнопки меняется)
- `.ev-video` — клик показывает тост «Видео / Презентация продукции»

---

### ev-catalog.js
**ВАЖНО: ДЕМО-реализация для статичной верстки.**  
В Bitrix фильтр → `kombox:filter`, товары → `bitrix:catalog.section → tile_ajax`. Этот файл в продакшне фактически не используется (нет `#evProdGrid` в реальных страницах).  

Содержит: демо-данные товаров, JS-фильтр по материалу/форме/размеру, ценовой слайдер, рендер карточек `ev-prod-card`. Оставить как есть, не подключать глобально.

---

### ev-product.js
**Назначение:** карточка товара (не начато в интеграции)  
**Что делает:**
- Инициализация **Swiper 11** (`#evPdThumbSw` вертикально, `#evPdMainSw` основной)
- Инициализация **Fancybox 5** (`[data-fancybox="pd"]`)
- Свотчи цвета (`.ev-swatch`)
- Выбор размера (`.ev-size-row`)
- Счётчик количества (`#evQtyMinus`, `#evQtyPlus`, `#evQtyVal`)
- Кнопка «В корзину» (`#evPdAdd`) — демо через `EV.cart.add()`
- Вкладки (`.ev-pd-tab` / `.ev-pd-pane[data-pane]`)

Требует: Swiper 11 и Fancybox 5 из `vendor/` подключены **до** этого файла.

---

## Старые JS-файлы (не трогать)

Все подключаются в `footer.php` через Asset. Порядок зафиксирован.

| Файл | Назначение |
|---|---|
| `jquery-2.2.0.min.js` | jQuery — основа всего старого JS |
| `lightGallery/dist/js/lightgallery.min.js` | Галерея (используется в старых шаблонах) |
| `fancybox/dist/jquery.fancybox.min.js` | Старый jQuery Fancybox (не путать с Fancybox 5 в vendor/) |
| `lightslider.min.js` | Слайдер (старые страницы) |
| `slick.min.js` | Slick-карусель |
| `lang_ru.min.js` | Локализация Bitrix |
| `widgets.min.js?v=7` | Виджеты Bitrix |
| `plugins.min.js` | Плагины (remodal и др.) |
| `animator.min.js` | Анимации |
| `cookie.min.js` | `createCookie()`, `readCookie()`, `eraseCookie()` — утилиты cookie |
| `articles.min.js` | Статьи |
| `s3.includeform.min.js` | Формы |
| `main.min.js` | Основной JS старого шаблона |
| `forms.min.js` | Обработка форм (обратный звонок и т.д.) |
| `detail.min.js` | Старая карточка товара (только `$(document).ready` с закомментированным fancybox) |
| `footer_scripts.js` | **Lazy-load изображений** (`.lazy` + `data-src` через jQuery `.evLazy()`), обработчик `ajaxStop` |

---

## Порядок подключения в footer.php

```
1. jquery-2.2.0.min.js
2. lightGallery...
3. jquery.fancybox.min.js  ← старый, jquery-based
4. lightslider, slick, lang_ru, widgets, plugins, animator
5. cookie.min.js
6. articles, s3.includeform, main, forms, detail
   --- редизайн ---
7. ev-core.js
8. ev-catalog-menu.js
   --- постранично (TODO) ---
9. ev-home.js       ← только главная
10. ev-catalog.js   ← только каталог (демо, не активен в проде)
11. ev-product.js   ← только карточка товара (+ Swiper 11 + Fancybox 5)
   --- после ---
12. footer_scripts.js  ← lazy-load (должен быть последним)
13. ya_map.js           ← только на /kontakty/
```

---

## Bitrix JS-функции (глобальные, не трогать)

| Функция/объект | Назначение |
|---|---|
| `buy_one_more(id)` | Добавление в корзину. Определена в `main.min.js` или `detail.min.js`. Вызывается через `onclick` в шаблоне карточки. |
| `BX.ready(fn)` | Аналог `$(document).ready()` для Bitrix |
| `BX.ajax` | AJAX-обёртка Bitrix |
| `JCTitleSearch` | Виджет автодополнения поиска |
| `AjaxFormRequest(...)` | Отправка формы через AJAX (используется в форме обратного звонка в footer.php) |

---

## Lazy-load изображений

Определён в `footer.php` inline-скриптом (jQuery plugin `.evLazy()`) и продублирован в `footer_scripts.js`.

Картинки с `class="lazy"` и `data-src="..."` загружаются при: первоначальной загрузке страницы и после AJAX-запросов (`ajaxStop`).

**Не менять `class="lazy"` и `data-src`** в шаблонах карточек — иначе фото не загрузятся.
