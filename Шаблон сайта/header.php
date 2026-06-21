<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
die();
IncludeTemplateLangFile(__FILE__);
?>
<? $url = explode("/", ($APPLICATION->GetCurPage())); ?>
<? $page_url = $APPLICATION->GetCurPage(); ?>
<?if(($url[1] == "internet-magazin") OR ($url[1] == "personal"))
{
	if(!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == ""){
		$redirect = "https://eurovazon.com".$_SERVER['REQUEST_URI'];
		header("HTTP/1.1 301 Moved Permanently");
		header("Location: $redirect");
	}
}
else
{
	if ($_SERVER['REQUEST_URI'] != strtolower($_SERVER['REQUEST_URI'])) {
		header('Location: https://' . $_SERVER['HTTP_HOST'] .
				strtolower($_SERVER['REQUEST_URI']), true, 301);
		exit();
	}
	if(!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] == ""){
		$redirect = "https://eurovazon.com".$_SERVER['REQUEST_URI'];
		header("HTTP/1.1 301 Moved Permanently");
		header("Location: $redirect");
	}
}?>

<?
$hour = date('H');
$H = $hour;
header("Expires:" .date("D, d M Y"." $H".":i:s")." GMT");

$classes = array();
if ($url[1] == "") $classes[] = 'app-wrapper--main';
if ($url[1] == "personal") $classes[] = 'app-wrapper--personal';
if ($url[1] == "kontakty") $classes[] = 'app-wrapper--contacts';
if ($url[1] == "nashi-raboty") $classes[] = 'app-wrapper--projects';
if ($url[1] == "internet-magazin") $classes[] = 'app-wrapper--shop';
?>

<!doctype html>
<html lang="ru">
	<head>
		<base href="/">
		<meta http-equiv="Content-Type" content="text/html; charset=<?=LANG_CHARSET;?>" />
		<title><? $APPLICATION->ShowTitle(); ?></title>
		<?//$APPLICATION->ShowHead(); ?>
		<? $APPLICATION->ShowMeta("keywords") ?>
		<? $APPLICATION->ShowMeta("description") ?>
		<? $APPLICATION->ShowMeta("robots", false, true);?>
		<? $APPLICATION->ShowHeadStrings() ?>
		<? $APPLICATION->ShowHeadScripts() ?>
		<? $APPLICATION->ShowCSS();?>
		<!-- Add to homescreen -->
		<?
		$page = $APPLICATION->GetCurPageParam(true);
		$delete = array("filter/clear/apply", "index.php");
		$page_text = $APPLICATION->GetCurDir(true);
		?>
		<meta name="yandex-verification" content="759249f5f4940b41" />
		<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE">
		<meta name="format-detection" content="telephone=no">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="msapplication-tap-highlight" content="no">
		<meta property="og:locale" content="ru_RU" />
		<meta property="og:type" content="website"/>
		<meta property="og:title" content="<? $APPLICATION->ShowTitle(); ?>"/>
		<meta property="og:description" content="<? $APPLICATION->ShowProperty('description'); ?>"/>
		<meta property="og:image" content="https://eurovazon.com/logo.jpg"/>
		<meta property="og:url" content= "https://eurovazon.com<? echo $page_url ?>" />
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="MobileOptimized" content="320">
		<meta name="HandheldFriendly" content="True">
		<meta name="cmsmagazine" content="68252fec4f923b95c3e67979678660c7" />
		<meta name="facebook-domain-verification" content="wk8cnkzqs58g2kma5zwvwc1zn1ki4i" />
		<?$APPLICATION->SetPageProperty("canonical", "https://eurovazon.com".$page_text);?>
		<?if(($url[1] == "internet-magazin") AND ($url[2] == "folder")): ?>

		<? else:?>
			<?/*<link rel="canonical" href="https://eurovazon.com<?=$page_text?>" />*/?> 
			<?$APPLICATION->ShowLink("canonical", null, true);?>
		<? endif;?>
		<link rel="icon" href="<?= SITE_TEMPLATE_PATH ?>/favicon.ico" type="image/x-icon">
		<link rel="shortcut icon" href="<?= SITE_TEMPLATE_PATH ?>/favicon.ico" type="image/x-icon">
		<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=!0;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f)})(window,document,'script','dataLayer','GTM-MZNGMZN');</script>
		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-110089934-1"></script>
		<script>
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());
		  gtag('config', 'UA-110089934-1');
		</script>
		<!-- Global site tag (gtag.js) - Google Ads: 467270754 -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=AW-467270754"></script>
		<script>
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());
		  gtag('config', 'AW-467270754');
		</script>
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-QTSC9SEMRT"></script>
		<script>
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());
		  gtag('config', 'G-QTSC9SEMRT');
		</script>
		<script type="text/javascript" data-skip-moving="">
		var __cs = __cs || [];
		__cs.push(["setCsAccount", "Wybl3gUskcZlbcMXb8GWof3CLeeEZrsU"]);
		</script>
		<script type="text/javascript" async src="https://app.comagic.ru/static/cs.min.js" data-skip-moving=""></script>
		<script data-skip-moving="" src="https://bot.jaicp.com/chatwidget/UBEgbaLH:81483634bbf48e4f578089c49845bff2856a1aa3/justwidget.js?force=true" async></script>
		<!-- Шрифт редизайна: Manrope (временно). Заменить на Graphik LCG woff2 после получения от клиента -->
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
	</head>
	<body class="app-wrapper ev-scope <?= implode(' ', $classes) ?>">
		<script type="application/ld+json">{"@context":"http://schema.org","@type":"Organization","url":"https://eurovazon.com/","logo":"https://eurovazon.com/logo.jpg"}</script><script type="application/ld+json">{"@context":"http://schema.org","@type":"Organization","name":"Евровазон","url":"https://eurovazon.com/","sameAs":["https://vk.com/eurovazon/","https://www.instagram.com/eurovazon/"]}</script>
		<?$APPLICATION->ShowPanel(); ?>
		<?
		$APPLICATION->IncludeComponent(
			"bitrix:main.include", "", Array(
			"AREA_FILE_SHOW" => "file",
			"AREA_FILE_SUFFIX" => "inc",
			"EDIT_TEMPLATE" => "",
			"PATH" => SITE_TEMPLATE_PATH . "/includes/svg_icons.php"
			)
		);
		?>
		<div class="b-scroll-wrapper">

			<!-- ============================================================
			     РЕДИЗАЙН: новый хедер
			     Старые .header_mobile и .header_main скрыты через CSS (display:none в ev-header.css).
			     Не удалять — они содержат рабочие Bitrix-компоненты корзины и поиска.
			     ============================================================ -->

			<!-- Верхняя навигационная строка -->
			<div class="ev-topbar">
			  <div class="ev-wrap">
				<?
				$APPLICATION->IncludeComponent(
					"bitrix:menu", "top_menu", Array(
					"ALLOW_MULTI_SELECT" => "N",
					"CHILD_MENU_TYPE" => "left",
					"DELAY" => "N",
					"MAX_LEVEL" => "2",
					"MENU_CACHE_GET_VARS" => array(""),
					"MENU_CACHE_TIME" => "3600",
					"MENU_CACHE_TYPE" => "N",
					"MENU_CACHE_USE_GROUPS" => "Y",
					"ROOT_MENU_TYPE" => "top",
					"USE_EXT" => "Y"
					)
				);
				?>
			  </div>
			</div>

			<!-- Основной хедер -->
			<header class="ev-header">
			  <div class="ev-wrap">
				<a class="ev-logo" href="/">
				  <span class="ev-logo-mark"><img src="<?=SITE_TEMPLATE_PATH?>/images/logo.svg" alt="EUROVAZON"></span>
				  <span class="ev-logo-tag"><img src="<?=SITE_TEMPLATE_PATH?>/images/tagline.svg" alt="Производство малых архитектурных форм"></span>
				</a>

				<button class="ev-catbtn" id="evCatBtn" type="button" aria-label="Каталог">
				  <span class="ev-burger"><span></span><span></span><span></span></span>
				  <span class="ev-catbtn-t">Каталог</span>
				</button>
                                <form class="ev-search" action="/search/" method="get">
                                  <span class="ev-ic ev-ic--search"></span>
                                  <input id="ev-search-q" type="text" name="q" placeholder="Быстрый поиск" autocomplete="off">
                                  <button type="submit" class="ev-find" style="background:none;border:none;cursor:pointer;display:flex;align-items:center;gap:6px;"><span class="ev-ic ev-ic--enter"></span>Найти</button>
                                </form>

				<div class="ev-htools">
				  <div class="ev-contacts">
					<div class="ev-contact-mail">
					  <span class="ev-ic ev-ic--mail"></span>
					  <?
					  $APPLICATION->IncludeComponent(
						"bitrix:main.include", "", Array(
						"AREA_FILE_SHOW" => "file",
						"AREA_FILE_SUFFIX" => "inc",
						"EDIT_TEMPLATE" => "",
						"PATH" => SITE_TEMPLATE_PATH . "/includes/header_email.php"
						)
					  );
					  ?>
					</div>
					<div class="ev-contact-phone">
					  <div class="ev-cp-row">
						<span class="ev-ic ev-ic--phone"></span>
						<?
						$APPLICATION->IncludeComponent(
						  "bitrix:main.include", "", Array(
						  "AREA_FILE_SHOW" => "file",
						  "AREA_FILE_SUFFIX" => "inc",
						  "EDIT_TEMPLATE" => "",
						  "PATH" => SITE_TEMPLATE_PATH . "/includes/phone.php"
						  )
						);
						?>
					  </div>
					  <a class="ev-callback" href="#" data-url="/obratnyy-zvonok" data-current-url="eurovazon.com/">Заказать звонок</a>
					</div>
				  </div>
				  <div class="ev-cart" id="evCart">
					<a href="/personal/cart/">
					  <div class="ev-cart-top">
						<span class="ev-ic ev-ic--cart"></span>
						<span class="ev-badge" id="evCartBadge">
						  <?
						  $APPLICATION->IncludeComponent(
							"bitrix:sale.basket.basket.line", "small_basket", array(
							"HIDE_ON_BASKET_PAGES" => "N",
							"PATH_TO_AUTHORIZE" => "",
							"PATH_TO_BASKET" => SITE_DIR . "personal/cart/",
							"PATH_TO_ORDER" => SITE_DIR . "personal/cart/",
							"PATH_TO_PERSONAL" => SITE_DIR . "personal/",
							"PATH_TO_PROFILE" => SITE_DIR . "personal/",
							"PATH_TO_REGISTER" => SITE_DIR . "login/",
							"POSITION_FIXED" => "N",
							"SHOW_AUTHOR" => "N",
							"SHOW_DELAY" => "N",
							"SHOW_EMPTY_VALUES" => "Y",
							"SHOW_IMAGE" => "Y",
							"SHOW_NOTAVAIL" => "Y",
							"SHOW_NUM_PRODUCTS" => "Y",
							"SHOW_PERSONAL_LINK" => "N",
							"SHOW_PRICE" => "Y",
							"SHOW_PRODUCTS" => "Y",
							"SHOW_SUMMARY" => "Y",
							"SHOW_TOTAL_PRICE" => "Y",
							"COMPONENT_TEMPLATE" => "small_basket"
							), false
						  );
						  ?>
						</span>
					  </div>
					  <span class="ev-cart-label">Ваш заказ</span>
					</a>
				  </div>
				</div>

				<!-- Мобильные инструменты (< 1024px) -->
				<div class="ev-mtools">
				  <a class="ev-mtool ev-mtool--phone" href="tel:+78007756011" aria-label="Позвонить"><span class="ev-ic ev-ic--phone"></span></a>
				  <button class="ev-mtool ev-mtool--search" id="evMSearchBtn" type="button" aria-label="Поиск"><span class="ev-ic ev-ic--search"></span></button>
				  <a class="ev-mtool ev-mtool--cart" href="/personal/cart/" aria-label="Корзина"><span class="ev-ic ev-ic--cart"></span><span class="ev-badge ev-badge--orange" id="evCartBadgeM">0</span></a>
				  <button class="ev-mtool ev-mtool--burger" id="evMenuBtn" type="button" aria-label="Меню"><span class="ev-mburger"><span></span><span></span><span></span></span></button>
				</div>
			  </div>
			</header>

			<!-- Оверлей каталога (десктоп) -->
			<div class="ev-catoverlay" id="evCatOverlay">
			  <div class="ev-catscrim" data-close></div>
			  <div class="ev-catpanel">
				<div class="ev-wrap" style="padding:0;max-width:none">
				  <h2 class="ev-cattitle">Каталог продукции</h2>
				  <div class="ev-cattitle-rule"></div>
				  <div class="ev-catgrid">
					<?
					$APPLICATION->IncludeComponent(
						"bitrix:menu", "catalog_menu_button", Array(
						"ALLOW_MULTI_SELECT" => "N",
						"CHILD_MENU_TYPE" => "catalog_inner",
						"DELAY" => "N",
						"MAX_LEVEL" => "3",
						"MENU_CACHE_GET_VARS" => array(""),
						"MENU_CACHE_TIME" => "3600",
						"MENU_CACHE_TYPE" => "N",
						"MENU_CACHE_USE_GROUPS" => "Y",
						"ROOT_MENU_TYPE" => "catalog",
						"USE_EXT" => "Y"
						)
					);
					?>
				  </div>
				</div>
			  </div>
			</div>

			<!-- Мобильное меню (бургер) -->
			<div class="ev-mmenu" id="evMmenu">
			  <div class="ev-mscrim" data-mclose></div>
			  <div class="ev-mpanel">
				<form class="ev-msearch" action="/search/" method="get">
				  <span class="ev-ic ev-ic--search"></span>
				  <input id="ev-msearch-q" type="text" name="q" placeholder="Быстрый поиск">
				  <button type="submit" class="ev-msearch-btn">Найти</button>
				</form>

				<div class="ev-mviewport">
				  <div class="ev-mslider" data-level="main">

					<!-- УРОВЕНЬ 1: главное меню -->
					<nav class="ev-mlevel ev-mlevel--main">
					  <a class="ev-mrow ev-mrow--catalog" data-go="catalog">Каталог товаров<span class="ev-ic ev-ic--arrow"></span></a>
					  <div class="ev-mdiv"></div>
					  <?
					  $APPLICATION->IncludeComponent(
						"bitrix:menu", "top_menu_mobile", Array(
						"ALLOW_MULTI_SELECT" => "N",
						"CHILD_MENU_TYPE" => "left",
						"DELAY" => "N",
						"MAX_LEVEL" => "1",
						"MENU_CACHE_GET_VARS" => array(""),
						"MENU_CACHE_TIME" => "3600",
						"MENU_CACHE_TYPE" => "N",
						"MENU_CACHE_USE_GROUPS" => "Y",
						"ROOT_MENU_TYPE" => "top",
						"USE_EXT" => "Y"
						)
					  );
					  ?>
					</nav>

					<!-- УРОВЕНЬ 2: каталог продукции -->
					<nav class="ev-mlevel ev-mlevel--catalog">
					  <a class="ev-mback" data-go="main"><span class="ev-ic ev-ic--arrow"></span>В главное меню</a>
					  <?
					  $APPLICATION->IncludeComponent(
						"bitrix:menu", "catalog_header_mobile", Array(
						"ALLOW_MULTI_SELECT" => "N",
						"CHILD_MENU_TYPE" => "catalog_inner",
						"DELAY" => "N",
						"MAX_LEVEL" => "3",
						"MENU_CACHE_GET_VARS" => array(""),
						"MENU_CACHE_TIME" => "3600",
						"MENU_CACHE_TYPE" => "N",
						"MENU_CACHE_USE_GROUPS" => "Y",
						"ROOT_MENU_TYPE" => "catalog",
						"USE_EXT" => "Y"
						)
					  );
					  ?>
					</nav>

				  </div>
				</div>

				<div class="ev-mfoot">
				  <div class="ev-mfoot-phone">8 800 775-60-11</div>
				  <div class="ev-mfoot-sub">(бесплатно по России)</div>
				  <a class="ev-mfoot-mail" href="mailto:info@eurovazon.com">info@eurovazon.com</a>
				  <div class="ev-mfoot-soc">
					<a class="ev-soc" href="https://vk.com/eurovazon" aria-label="VK"><span class="ev-ic ev-ic--vk"></span></a>
					<a class="ev-soc" href="https://t.me/" aria-label="Telegram"><!-- TODO: вставить ссылку на Telegram --><span class="ev-ic ev-ic--tg"></span></a>
				  </div>
				</div>
			  </div>
			</div>

			<!-- ============================================================
			     СТАРЫЙ ХЕДЕР — скрыт через CSS (display:none).
			     НЕ УДАЛЯТЬ: содержит рабочие компоненты корзины и поиска,
			     которые инициализируют JS-логику Bitrix.
			     ============================================================ -->
			<!-- /mobile-header -->
			<div class="header_mobile" style="display:none!important">
				<div class="center">
                    <?
                    $APPLICATION->IncludeComponent(
                        "bitrix:main.include", "", Array(
                            "AREA_FILE_SHOW" => "file",
                            "AREA_FILE_SUFFIX" => "inc",
                            "EDIT_TEMPLATE" => "",
                            "PATH" => SITE_TEMPLATE_PATH . "/includes/logo.php"
                        )
                    );
                    ?>
                    <a href="tel:88007756011" class="header_but ic_call"></a>
                    <div class="header_but ic_search" id="header_but_search">
                        <svg width="25" height="25" viewBox="0 0 56.966 56.966"><g><path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" data-original="#000000" class="active-path" data-old_color="#a6a6aa" fill="#46a128"/></g></svg>
                    </div>
                    <div class="header_but ic_basket" id="header_but_basket">
                        <div>
							<span>
								<?
                                $APPLICATION->IncludeComponent(
                                    "bitrix:sale.basket.basket.line", "small_basket", array(
                                    "HIDE_ON_BASKET_PAGES" => "N",
                                    "PATH_TO_AUTHORIZE" => "",
                                    "PATH_TO_BASKET" => SITE_DIR . "personal/cart/",
                                    "PATH_TO_ORDER" => SITE_DIR . "personal/cart/",
                                    "PATH_TO_PERSONAL" => SITE_DIR . "personal/",
                                    "PATH_TO_PROFILE" => SITE_DIR . "personal/",
                                    "PATH_TO_REGISTER" => SITE_DIR . "login/",
                                    "POSITION_FIXED" => "N",
                                    "SHOW_AUTHOR" => "N",
                                    "SHOW_DELAY" => "N",
                                    "SHOW_EMPTY_VALUES" => "Y",
                                    "SHOW_IMAGE" => "Y",
                                    "SHOW_NOTAVAIL" => "Y",
                                    "SHOW_NUM_PRODUCTS" => "Y",
                                    "SHOW_PERSONAL_LINK" => "N",
                                    "SHOW_PRICE" => "Y",
                                    "SHOW_PRODUCTS" => "Y",
                                    "SHOW_SUMMARY" => "Y",
                                    "SHOW_TOTAL_PRICE" => "Y",
                                    "COMPONENT_TEMPLATE" => "small_basket"
                                ), false
                                );
                                ?>
							</span>
                        </div>
                    </div>
					<div class="header_but ic_menu" id="header_but_menu"></div>
				</div>
			</div>
			<div class="modal_header modal_header_call" style="display:none!important">
			</div>
			<div class="modal_header modal_header_menu" style="display:none!important">
			</div>
			<div class="modal_header modal_header_basket" style="display:none!important">
				<div id="modal_header_basket">
					<?
					$APPLICATION->IncludeComponent(
						"bitrix:sale.basket.basket.line",
						"small_basket_mobile", array(
						"HIDE_ON_BASKET_PAGES" => "N",
						"PATH_TO_AUTHORIZE" => "",
						"PATH_TO_BASKET" => SITE_DIR . "personal/cart/",
						"PATH_TO_ORDER" => SITE_DIR . "personal/cart/",
						"PATH_TO_PERSONAL" => SITE_DIR . "personal/",
						"PATH_TO_PROFILE" => SITE_DIR . "personal/",
						"PATH_TO_REGISTER" => SITE_DIR . "login/",
						"POSITION_FIXED" => "N",
						"SHOW_AUTHOR" => "N",
						"SHOW_DELAY" => "N",
						"SHOW_EMPTY_VALUES" => "Y",
						"SHOW_IMAGE" => "Y",
						"SHOW_NOTAVAIL" => "Y",
						"SHOW_NUM_PRODUCTS" => "Y",
						"SHOW_PERSONAL_LINK" => "N",
						"SHOW_PRICE" => "Y",
						"SHOW_PRODUCTS" => "Y",
						"SHOW_SUMMARY" => "Y",
						"SHOW_TOTAL_PRICE" => "Y",
						"COMPONENT_TEMPLATE" => "small_basket_mobile"
						), false
					);
					?>
				</div>
			</div>
			<div class="modal_header modal_header_catalog" style="display:none!important">
			</div>
			<!-- /СТАРЫЙ ХЕДЕР -->

			<div class="app-body">
				<div class="app-content center">
                    <?$ajax = $_POST['filter_ajax'] == 'y';
                    if($ajax)$APPLICATION->RestartBuffer();
                    ?>
					<? if(($url[1] != "") AND ($url[2]!='product')):?>
						<?
						$APPLICATION->IncludeComponent(
							"bitrix:breadcrumb", "breadcrumbs_eurovazon", array(
							"PATH" => "",
							"SITE_ID" => "s1",
							"START_FROM" => "1",
							"COMPONENT_TEMPLATE" => "breadcrumbs_eurovazon"
							), false
						);
						?>
					<? endif; ?>
