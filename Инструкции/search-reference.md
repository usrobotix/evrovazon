# Справочник: поиск — JCTitleSearch, форма, AJAX

---

## Текущее состояние (TODO — автодополнение не работает)

Сейчас в `header.php` стоит простая форма без компонента `bitrix:search.title`:

```html
<form class="ev-search" action="/search/" method="get">
  <span class="ev-ic ev-ic--search"></span>
  <input id="ev-search-q" type="text" name="q" placeholder="Быстрый поиск" autocomplete="off">
  <button type="submit" class="ev-find" style="...">
    <span class="ev-ic ev-ic--enter"></span>Найти
  </button>
</form>
```

Поиск работает: отправляет на `/search/?q=запрос`. Автодополнение отложено.

---

## Что такое JCTitleSearch

JS-виджет Bitrix для автодополнения поиска. Инициализируется через:

```js
new JCTitleSearch({
  'AJAX_PAGE': '/текущая_страница/',  // куда уходит AJAX
  'CONTAINER_ID': 'id_контейнера',   // div куда вставляет выпадашку
  'INPUT_ID': 'id_инпута',           // какой input слушать
  'MIN_QUERY_LEN': 2
});
```

Виджет:
1. Слушает `keyup` на инпуте по `INPUT_ID`
2. Отправляет AJAX-запрос на `AJAX_PAGE` с параметром `?q=текст`
3. Вставляет результаты в `CONTAINER_ID`

---

## Проблемы которые уже были (не повторять)

| Попытка | Что пошло не так |
|---|---|
| `SHOW_INPUT=N` в компоненте | JS-виджет не подключается без рендеринга формы |
| `id="title-search"` на нашей `<form>` | Компонент рендерит `<div id="title-search">` — конфликт id |
| Форма внутри формы | `<div id="title-search"><form>...</form></div>` внутри нашей `<form>` = невалидный HTML |
| `CONTAINER_ID="bx-title-search"` (несуществующий) | Виджет инициализируется, но вставляет контент в `<body>` |
| `AJAX_PAGE='/search/index.php'` | Возвращает HTML страницы, не JSON для виджета |
| `POST_FORM_ACTION_URI` на главной | Возвращает `/`, Bitrix редиректит на HTTPS → 302 |

---

## Правильное решение (когда будем делать)

1. В `header.php` — наш инпут с уникальным `id="ev-search-q"` (без `id` на форме)
2. Переписать шаблон `components/bitrix/search.title/header/template.php` — убрать рендер формы, оставить только JS-инит
3. В PHP шаблоне использовать `$GLOBALS['APPLICATION']->GetCurPage()` для `AJAX_PAGE` (не `POST_FORM_ACTION_URI`)
4. `CONTAINER_ID` — реально существующий пустой `<div>` рядом с инпутом

```php
// template.php для search.title/header (правильный вариант)
<?if(!defined("B_PROLOG_INCLUDED")...)die();
$this->setFrameMode(true);
$INPUT_ID = CUtil::JSEscape(trim($arParams["~INPUT_ID"]) ?: "ev-search-q");
$CONTAINER_ID = CUtil::JSEscape(trim($arParams["~CONTAINER_ID"]) ?: "ev-search-results");
$ajax_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] ? 'https' : 'http')
          . '://' . $_SERVER['HTTP_HOST'] . $GLOBALS['APPLICATION']->GetCurPage();
?>
<script>
BX.ready(function(){
  new JCTitleSearch({
    'AJAX_PAGE': '<?=CUtil::JSEscape($ajax_url)?>',
    'CONTAINER_ID': '<?=$CONTAINER_ID?>',
    'INPUT_ID': '<?=$INPUT_ID?>',
    'MIN_QUERY_LEN': 2
  });
});
</script>
```

---

## Страница результатов поиска

URL: `/search/?q=запрос`  
Bitrix рендерит через стандартный компонент поиска. Редизайн этой страницы не входит в текущий скоуп.

---

## Мобильный поиск

В мобильном меню `.ev-mmenu` отдельный инпут с `id="ev-msearch-q"` (переименован чтобы не дублировать `id`).
