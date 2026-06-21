# Справочник: includes/ — все include-файлы шаблона

_Путь на сервере: `/home/bitrix/www/bitrix/templates/eurovazon_0420/includes/`_  
_Все файлы подтверждены из реального кода._

---

## Телефоны

| Файл | Содержимое | Где используется |
|---|---|---|
| `phone.php` | `<a href="tel:+78007756011" class="roistat-phone-1">+7 (800) 775-60-11</a>` | Хедер (desktop, `.ev-contact-phone`) |
| `phone1.php` | `+7 (800) 775-60-11` в `.app-header__phone1`, класс `roistat-phone-1` | Старый хедер |
| `phone2.php` | `+7 (812) 918-71-03` класс `roistat-phone` + текст «Клиентский отдел» | Старый хедер |
| `footer_phone1.php` | `<a href="tel:88007756011" class="footer_phone roistat-phone-2">8 800 775-60-11</a>` + `<small>(бесплатно по России)</small>` | Футер нового дизайна |
| `footer_phone2.php` | `<a href="tel:+78129187103" class="roistat-phone">+7 (812) 918-71-03</a>` | Футер |

**В новом хедере используется `phone.php`** — `+7 (800) 775-60-11`, класс `roistat-phone-1` (нужен для Roistat-аналитики, не менять).

---

## Email

| Файл | Содержимое | Где используется |
|---|---|---|
| `email.php` | `<a href="mailto:info@eurovazon.com">info@eurovazon.com</a>` | Общий |
| `header_email.php` | `<a href="mailto:info@eurovazon.com" style="text-transform:initial;">info@eurovazon.com</a>` | Новый хедер (`.ev-contact-mail`) |
| `header_email2.php` | То же что header_email, но обёрнуто в `<span class="app-header__phone">` | Старый хедер |
| `footer_email.php` | `<a class="footer_email" href="mailto:info@eurovazon.com">info@eurovazon.com</a>` | Новый футер |

---

## Логотип и описание

| Файл | Содержимое |
|---|---|
| `logo.php` | `<a class="app-header__logo" href="/"><span class="svg-icon svg-icon--logo_icon"><img src=".../images/svg/logo.svg"></span></a>` |
| `logo_mob.php` | Логотип через SVG-спрайт `#logo_icon` (старый хедер) |
| `logo_text.php` | `Производство малых архитектурных форм премиум класса` |
| `logo_descript.php` | `Производство малых архитектурных форм` |

**В новом хедере логотип вставлен напрямую** через `<img src=".../images/logo.svg">` и `<img src=".../images/tagline.svg">` — файлы `logo.php` и `logo_mob.php` не используются.

---

## Футер

| Файл | Содержимое |
|---|---|
| `footer_sitename.php` | `© ООО "Евровазон" (www.eurovazon.com) 2011 - [текущий год]` |
| `footer_sitetext.php` | Юридический текст про копирайт и публичную оферту |
| `footer_social.php` | Instagram, YouTube, VK — PNG-иконки (старый стиль) |
| `footer_social_green.php` | То же, зелёные иконки + «Следите за нами в соцсетях» |
| `footer_features.php` | 6 преимуществ с PNG-иконками из `images/features/` (НЕ используется в новом футере) |
| `footer_static_menu.php` | 2 колонки меню каталога с жёсткими ссылками (НЕ используется в новом футере) |

---

## Контент и утилиты

| Файл | Содержимое |
|---|---|
| `cities.php` | `Санкт-Петербург` в `.form-block__item` (для модального окна выбора города) |
| `privacy.php` | Ссылка на Google Drive с политикой конфиденциальности ООО «Евровазон» |
| `create.php` | Ссылка на megagroup.ru (создатель сайта) — в новом дизайне не используется |
| `delivery_card.php` | `Доставка по Санкт-Петербургу осуществляется транспортной компанией.` |
| `contacts_social.php` | Instagram/YouTube/VK — серые PNG-иконки, только для страницы контактов |
| `main_slider_content.php` | Контент старого слайдера главной (5 пунктов + кнопка «В каталог») — НЕ используется |
| `sections_title.php` | Заголовок «Изделия» с лого SVG-спрайтом — старый, НЕ используется |
| `text.php` | SEO-текст о компании (3 абзаца) — для страницы «О нас» или SEO-блока |
| `text2.php` | Расширенный SEO-текст с заголовками h2 о бетоне и ассортименте |
| `svg_icons.php` | SVG-спрайт со всеми иконками старого шаблона. Подключается глобально в header.php |

---

## Как подключать в PHP

```php
// Через битрикс-компонент (редактируемые через админку)
$APPLICATION->IncludeComponent(
  "bitrix:main.include", "",
  array(
    "AREA_FILE_SHOW" => "file",
    "AREA_FILE_SUFFIX" => "inc",
    "EDIT_TEMPLATE" => "",
    "PATH" => SITE_TEMPLATE_PATH . "/includes/footer_phone1.php",
  )
);

// Напрямую (проще, но без редактирования через админку)
include(SITE_TEMPLATE_PATH . "/includes/phone.php");
```

В новом `footer.php` используется метод через `$APPLICATION->IncludeComponent` для: `footer_phone1.php`, `footer_email.php`, `footer_sitename.php`, `footer_sitetext.php`, `cities.php`.

---

## TODO

- **Telegram в футере** — в `footer.php` есть `<a href="https://t.me/">` с пустой ссылкой и комментарием `<!-- TODO: вставить ссылку на Telegram -->`. Когда получим ссылку — обновить прямо в `footer.php`.
- **footer_social.php** — в новом футере соцсети вставлены напрямую через `.ev-soc` с SVG-иконками. `footer_social.php` (PNG-иконки) не используется.
