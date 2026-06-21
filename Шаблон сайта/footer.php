<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}
?>
<? $url = explode("/", ($APPLICATION->GetCurPage())); ?>

			</div>
			<!-- /app-content -->
		</div>
		<!-- /app-body -->

		<!-- ============================================================
		     РЕДИЗАЙН: новый футер
		     ============================================================ -->
		<footer class="ev-footer">
		  <div class="ev-wrap">
			<div class="ev-foot-soc">
			  <a class="ev-soc" href="https://vk.com/eurovazon" aria-label="VK"><span class="ev-ic ev-ic--vk"></span></a>
			  <a class="ev-soc" href="https://t.me/" aria-label="Telegram"><!-- TODO: вставить ссылку на Telegram --><span class="ev-ic ev-ic--tg"></span></a>
			</div>

			<div class="ev-foot-main">
			  <div class="ev-foot-row1">
				<div class="ev-foot-phone">
				  <?
				  $APPLICATION->IncludeComponent(
					"bitrix:main.include", "", array(
					"AREA_FILE_SHOW" => "file",
					"AREA_FILE_SUFFIX" => "inc",
					"EDIT_TEMPLATE" => "",
					"PATH" => SITE_TEMPLATE_PATH . "/includes/footer_phone1.php",
					)
				  );
				  ?>
				</div>
				<a class="ev-foot-mail" href="mailto:info@eurovazon.com">
				  <?
				  $APPLICATION->IncludeComponent(
					"bitrix:main.include", "", array(
					"AREA_FILE_SHOW" => "file",
					"AREA_FILE_SUFFIX" => "inc",
					"EDIT_TEMPLATE" => "",
					"PATH" => SITE_TEMPLATE_PATH . "/includes/footer_email.php",
					)
				  );
				  ?>
				</a>
				<div class="ev-foot-iso">
				  <img src="<?=SITE_TEMPLATE_PATH?>/images/footer_sert.jpg" alt="ISO">
				  <span>ISO 9001:2015</span>
				</div>
			  </div>

			  <div class="ev-foot-nav">
				<ul>
				  <li><a href="/">Главная</a></li>
				  <li><a href="/about/">О нас</a></li>
				  <li><a href="/delivery/">Доставка / Оплата</a></li>
				  <li><a href="/warranty/">Гарантия</a></li>
				</ul>
				<ul>
				  <li><a href="/faq/">Вопрос-ответ</a></li>
				  <li><a href="/vacancies/">Вакансии</a></li>
				  <li><a href="/contacts/">Контакты</a></li>
				</ul>
			  </div>

			  <div class="ev-foot-copy">
				<?
				$APPLICATION->IncludeComponent(
				  "bitrix:main.include", "", array(
				  "AREA_FILE_SHOW" => "file",
				  "AREA_FILE_SUFFIX" => "inc",
				  "EDIT_TEMPLATE" => "",
				  "PATH" => SITE_TEMPLATE_PATH . "/includes/footer_sitename.php",
				  )
				);
				?>
				<?
				$APPLICATION->IncludeComponent(
				  "bitrix:main.include", "", array(
				  "AREA_FILE_SHOW" => "file",
				  "AREA_FILE_SUFFIX" => "inc",
				  "EDIT_TEMPLATE" => "",
				  "PATH" => SITE_TEMPLATE_PATH . "/includes/footer_sitetext.php",
				  )
				);
				?>
			  </div>
			</div>
		  </div>
		</footer>
		<!-- /РЕДИЗАЙН футер -->

	</div>
	<!-- /b-scroll-wrapper -->

<?
global $APPLICATION;
$dir = $APPLICATION->GetCurDir();
?>
<div class="b-2top" id="b-2top" title="Наверх"></div>

<!-- Модальное окно: обратный звонок (не трогать) -->
<div class="remodal" id="phonePopup" data-remodal-id="phonePopup" data-remodal-options="hashTracking: false, closeOnOutsideClick: true">
    <div class="icon-close" data-remodal-action="close"></div>
    <div class="remodal-title">Обратный звонок</div>
    <div class="remodal-content" id="result_form_call">
        <div class="form-block call-back">
            <form action="" id="form_call">
                <div class="form-block__item form-block__item--user">
                    <div class="form-block__title">Ваше Имя <span class="form-block__required">*</span></div>
                    <div class="form-block__text input">
                        <input id="name_form_call" class="required" name="name" type="text">
                    </div>
                </div>
                <div class="form-block__item form-block__item--phone">
                    <div class="form-block__title">Телефон <span class="form-block__required">*</span></div>
                    <div class="form-block__text input">
                        <input id="phone_form_call" class="required" name="phone" type="text" placeholder="+7 (ххх) ххх-хх-хх">
                        <input name="request_uri" type="hidden" value="<? echo $_SERVER['REQUEST_URI']; ?>">
                    </div>
                </div>
                <div class="form-block__item form-block__item--hidden">
                    <div class="form-block__text">
                        <input type="text" name="url" value="<?= $dir ?>">
                        <input type="hidden" name="subject" value="Обратный звонок">
                    </div>
                </div>
                <div class="form-block__button">
                    <input class="gr-button site-btn" type="button" value="Жду звонка" onclick='AjaxFormRequest("result_form_call", "form_call", "/send/send_callback.php")'>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="remodal" data-remodal-id="locationPopup" data-remodal-options="hashTracking: false, closeOnOutsideClick: true">
    <div class="icon-close" data-remodal-action="close"></div>
    <div class="remodal-title">Выбор города</div>
    <div class="remodal-content">
        <?
        $APPLICATION->IncludeComponent(
             "bitrix:main.include", "", array(
            "AREA_FILE_SHOW" => "file",
            "AREA_FILE_SUFFIX" => "inc",
            "EDIT_TEMPLATE" => "",
            "PATH" => SITE_TEMPLATE_PATH . "/includes/cities.php",
             )
        );
        ?>
    </div>
</div>

<div class="remodal remodal--texture" data-remodal-id="texture" data-remodal-options="hashTracking: false, closeOnOutsideClick: true">
    <div class="icon-close" data-remodal-action="close"></div>
    <div class="remodal-title">Выберите фактуру</div>
    <div class="remodal-content"></div>
</div>

<?
use Bitrix\Main\Page\Asset;
// ---- Старые стили (не трогать) ----
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/styles_new.min.css");
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/css/app.min.css");
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/style_select.css");
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/css/plugins.min.css");
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/css/slick.min.css");
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/fancybox/src/css/core.css");
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/fancybox/src/css/fullscreen.css");
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/fancybox/src/css/slideshow.css");
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/fancybox/src/css/thumbs.css");
// ---- Стили редизайна ----
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/css/ev-base.css");
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/css/ev-header.css");
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/css/ev-footer.css");
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/css/ev-home.css");
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/css/ev-catalog.css");
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH."/css/ev-product.css");
// ---- Старые скрипты (не трогать) ----
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/jquery-2.2.0.min.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/lightGallery/dist/js/lightgallery.min.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/fancybox/dist/jquery.fancybox.min.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/lightslider.min.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/slick.min.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/lang_ru.min.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/widgets.min.js?v=7");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/plugins.min.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/animator.min.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/cookie.min.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/articles.min.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/s3.includeform.min.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/main.min.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/forms.min.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/detail.min.js");
// ---- Скрипты редизайна (порядок важен!) ----
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/ev-core.js");
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/ev-catalog-menu.js");
// ev-home.js / ev-catalog.js / ev-product.js подключаются постранично (TODO)
?>

    <script>
        (function( $ ){
            $.fn.evLazy = function() {
                return this.each(function() {
                    var tt = $(this);
                    if(tt.hasClass('loaded')) { return true; }
                    var img = new Image();
                    img.onload = function () { tt.attr('src', tt.data('src')); tt.addClass('loaded'); };
                    img.src = tt.data('src');
                });
            };
        })( jQuery );
        $('.lazy, .lazy2').evLazy();
        $(document).ajaxStop(function() { $('img.lazy').evLazy(); });
    </script>

<?
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/footer_scripts.js");
if ($url[1] == "kontakty"):
	Asset::getInstance()->addJs("https://api-maps.yandex.ru/2.1/?load=package.full&lang=ru-RU");
	Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/ya_map.min.js");
	Asset::getInstance()->addJs(SITE_TEMPLATE_PATH."/js/contacts_mobile.js");
endif;
?>

<!-- Yandex.Metrika counter -->
<script type="text/javascript">(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
	ym(46758951,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true,trackHash:true,ecommerce:"dataLayer"});
	ym(79989442,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false,trackHash:true,ecommerce:"dataLayer"});
</script>
<noscript><div>
	<img src="https://mc.yandex.ru/watch/46758951" style="position:absolute; left:-9999px;" alt="" />
	<img src="https://mc.yandex.ru/watch/79989442" style="position:absolute; left:-9999px;" alt="" />
</div></noscript>
<!-- /Yandex.Metrika counter -->

</body>
</html>
<?
if (isset($_GET['utm_source']) || isset($_GET['utm_content']) || isset($_GET['utm_campaign']) || isset($_GET['utm_keyword']) || isset($_GET['utm_term']) || isset($_GET['utm_medium'])) {
    session_start();
    $_SESSION['utm']['utm_source'] = $_GET['utm_source'] ?? '';
    $_SESSION['utm']['utm_content'] = $_GET['utm_content'] ?? '';
    $_SESSION['utm']['utm_campaign'] = $_GET['utm_campaign'] ?? '';
    $_SESSION['utm']['utm_keyword'] = $_GET['utm_keyword'] ?? '';
    $_SESSION['utm']['utm_term'] = $_GET['utm_term'] ?? '';
    $_SESSION['utm']['utm_medium'] = $_GET['utm_medium'] ?? '';
}?>
