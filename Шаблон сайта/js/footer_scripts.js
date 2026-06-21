$(document).ready(function() {
	$('#phone_form_call').mask('+7 (000) 000-00-00', {placeholder: "+7 (xxx) xxx-xx-xx"});

	if($(this).scrollTop() >= 32)
	{
		$('.header_main').addClass('fixed');
		/* if($(this).scrollTop() >= 300) 
		{
			$('.header').addClass('scrolled--fix');
		} */
	}
	else
	{
		$('.header_main').removeClass('fixed');
		/* $('.header').removeClass('fixed'); */
	}
	$(window).scroll(function(event) 
	{
		if($(this).scrollTop() >= 32)
		{
			$('.header_main').addClass('fixed');
			/* if($(this).scrollTop() >= 300) 
			{
				$('.header').addClass('scrolled--fix');
			} */
		}
		else
		{
			$('.header_main').removeClass('fixed');
			/* $('.header').removeClass('scrolled--fix'); */
		}
	});

	$('#header_but_menu').click(function () {
		if ($(".modal_header_menu").hasClass("active")) {
			$(".modal_header_menu").removeClass("active");
			$("#header_but_menu").removeClass("active");
			$("body").removeClass("hiddens");
		}
		else {
			$("#header_but_menu").addClass("active");
			$(".modal_header_menu").addClass("active");
				$(".modal_header_basket").removeClass("active");
				$("#header_but_basket").removeClass("active");
				$(".modal_header_catalog").removeClass("active");
				$("#header_but_catalog").removeClass("active");
				$(".modal_header_call").removeClass("active");
				$("#modal_but_call").removeClass("active");
			$("body").addClass("hiddens");
		}
	});

	$('#header_but_search').click(function () {
		if (!$('#header_but_menu').hasClass('active')) $('#header_but_menu').click();
		$('.header_search_input').focus();
	});
	
	$('#header_but_basket').click(function () {
		if (BX.hasClass(document.documentElement, 'bx-touch')) {
			window.location = '/personal/cart/';
			return;
		}
		if ($(".modal_header_basket").hasClass("active")) {
			$(".modal_header_basket").removeClass("active");
			$("#header_but_basket").removeClass("active");
			$("body").removeClass("hiddens");
		}
		else {
			$("#header_but_basket").addClass("active");
			$(".modal_header_basket").addClass("active");
				$(".modal_header_menu").removeClass("active");
				$("#header_but_menu").removeClass("active");
				$(".modal_header_catalog").removeClass("active");
				$("#header_but_catalog").removeClass("active");
				$(".modal_header_call").removeClass("active");
				$("#modal_but_call").removeClass("active");
			$("body").addClass("hiddens");
		}
	});
	
	$('#header_but_catalog').click(function (e) {
		e.preventDefault();
		if ($(".modal_header_catalog").hasClass("active")) {
			$(".modal_header_catalog").removeClass("active");
			$("#header_but_catalog").removeClass("active");
			$("body").removeClass("hiddens");
		}
		else {
			$("#header_but_catalog").addClass("active");
			$(".modal_header_catalog").addClass("active");
				$(".modal_header_menu").removeClass("active");
				$("#header_but_menu").removeClass("active");
				$(".modal_header_basket").removeClass("active");
				$("#header_but_basket").removeClass("active");
				$(".modal_header_call").removeClass("active");
				$("#modal_but_call").removeClass("active");
			$("body").addClass("hiddens");
		}
	});
	
	$('#modal_but_call').click(function () {
		if ($(".modal_header_call").hasClass("active")) {
			$(".modal_header_call").removeClass("active");
			$("#modal_but_call").removeClass("active");
			$("body").removeClass("hiddens");
		}
		else {
			$("#modal_but_call").addClass("active");
			$(".modal_header_call").addClass("active");
				$(".modal_header_menu").removeClass("active");
				$("#header_but_menu").removeClass("active");
				$(".modal_header_basket").removeClass("active");
				$("#header_but_basket").removeClass("active");
				$(".modal_header_catalog").removeClass("active");
				$("#header_but_catalog").removeClass("active");	
			$("body").addClass("hiddens");
		}
	});
	
	$('.tsveta_faktury').click(function () {
		window.location.href = 'https://eurovazon.ru/internet-magazin/folder/tsveta_faktury/';
	});
	//сортировка
	$('.sort_ajax_price').click(function () {
		var href=window.location.protocol+'//'+window.location.host+window.location.pathname;
		var param=$('.sort_ajax_price').attr('data-src');
		window.location.href = href+param;
		
		//console.log($('.sort_ajax_price').attr('data-src'));
		
	});
	$('.sort_ajax_name').click(function () {
		var href=window.location.protocol+'//'+window.location.host+window.location.pathname;
		var param=$('.sort_ajax_name').attr('data-src');
		window.location.href = href+param;
		//console.log($('.sort_ajax_name').attr('data-src'));
		//console.log('+++');
	});
	$('.sort_ajax_default').click(function () {
		var href=window.location.protocol+'//'+window.location.host+window.location.pathname;
		window.location.href = href;
	});
	


}); 
window.lazyLoadOptions = {
	threshold: 0
};
window.addEventListener('LazyLoad::Initialized', function (e) {
	//console.log(e.detail.instance);
}, false);
$(document).ready(function () {
	$('.new-product__main-slider').lightSlider({
		item: 1,
		slideMove: 1,
		slideMargin: 0,
		adaptiveHeight: true,
		enableDrag: false,
		loop: false
	});
});
/*(function () {
if (typeof carrotquest === 'undefined') {
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.async = true;
	s.src = '//cdn.carrotquest.io/api.min.js';
	var x = document.getElementsByTagName('head')[0];
	x.appendChild(s);

	carrotquest = {};
	window.carrotquestasync = [];
	carrotquest.settings = {};
	m = ['connect', 'track', 'identify', 'auth', 'open', 'onReady', 'addCallback', 'removeCallback', 'trackMessageInteraction'];
	function Build(name, args) {
		return function () {
			window.carrotquestasync.push(name, arguments);
		}
	}
	for (var i = 0; i < m.length; i++)
		carrotquest[m[i]] = Build(m[i]);
}
})();*/
//carrotquest.connect('13555-4003282fa0e8a925cc8f0f62fe');


function buy_one_more (_this, quantity = 1) {
	var id = _this;
	var id_factura = 11;
	quantity = parseInt(quantity);
	if (isNaN(quantity)) quantity = 1;
	if (id) {
		$.post('/ajax/buy_one_more.php', {'ID': id, 'id_factura': id_factura, 'quantity': quantity}, function (response) {
			if (response.type == 'ok')
			{
				//$('#'+id+'_buy').html('В корзине');
				$('#'+id+'_buy').addClass('btn--comlete');
				$('#'+id+'_buy').prop('onclick', null).off('click');
				$('#'+id+'_buy').attr('href', '/personal/cart/');

				updCart(id, quantity);
			} else
			{
				$('#'+id+'_buy').html('Ошибка');
			}
		})
	}
	return false;
}

console.log(window.location.protocol);
function add2basket(_this) {
	var id = $(_this).data('id');
	var id_osnovanie = $(_this).data('osnovanie');
	//alert(id_osnovanie);
	//id_osnovanie = 50270;
	if (id) {
		$.post('/ajax/add2basket.php', {'ID': id, 'id_osnovanie': id_osnovanie}, function (response) {
			//alert(response.type == 'ok' ? 'Товар добавлен в корзину' : 'Ошибка!');
			if (response.type == 'ok')
			{
				$(_this).html('В корзине');
				$(_this).addClass('btn--comlete');
				$(_this).prop('onclick', null).off('click');
				$(_this).attr('href', '/personal/cart/');
			} else
			{
				$('#bu').html('Ошибка');
			}
		})
	}
	return false;
}

function toggleProductDelay(p_id){
	$.ajax({
		type: "POST",
		url: "/ajax/toggleProductDelay.php",
		data: "product_id=" + p_id,
		dataType: 'json',
		success: function(data){
			if (data.OK) {
				$('#allSum_FORMATED').html(data.TOTAL);
			}
		}
	});
}

$(document).on('change', '.input-toggle-all', function(e){
	$.ajax({
		type: "POST",
		url: "/ajax/toggleProductDelay.php",
		data: "product_id=all&delay="+($(this).prop('checked') ? 'N' : 'Y'),
		dataType: 'json',
		success: function(data){
			if (data.OK) {
				$('#allSum_FORMATED').html(data.TOTAL);
			}
		}
	});
	$('#basket_items .input-buy').prop('checked', $(this).prop('checked'));
});

$(document).on('change', '#basket_items .input-buy', function(e){
	e.stopPropagation();
	var checked = true;
	$('#basket_items .input-buy').each(function(){
		checked = checked && $(this).prop('checked');
	});
	$('.input-toggle-all').prop('checked', checked);
});

function updCart(id, to) {
	var url = '/ajax/updCart.php?id=' + id + '&to=' + to;
	$.post(url).done(function (data) {
		$('#header_basket').html(data);
		$('#modal_header_basket').html(data);
		// upd total number
		var new_total = $("#header_basket .mobile_basket_total .count").text();
		var new_count = $("#header_basket .mobile_basket .mobile_basket_item").length;
		$("#basket_icon").text(new_count);
		$(".header_mobile .header_but div span").text(new_count);
	})
}

function removeCart(id) {
	var markup = document.getElementById('basket_icon').innerHTML;
	markup = parseInt(markup) - 1;
	var url = '/ajax/removeCart.php?id=' + id;
	$.post(url).done(function (data) {
		$('#header_basket').html(data);
		$('#modal_header_basket').html(data);
	})
	$('.basket_icon').html(markup);
}

function cartProductChange(target) {
	var v = target.value;
	v = Number(v);

	if (isNaN(v)) {
		target.value = 1; 
	}

	updCart($(target).data("kind-id"), target.value);
}

/*
$('.buy_click').click(function () {
	
	var url = '/ajax/updCart.php';
	var markup = document.getElementById('basket_icon').innerHTML;
	markup = parseInt(markup) + 1;
	setTimeout(function () {
		$.ajax({
			url: url,
			data: {
				txtsearch: 213
			},
			type: "GET",
			dataType: "html",
			success: function (data) {
				//$.fancybox.open('<div class="message"><h2>Товар добавлен в корзину</h2><p>Продолжить покупки или <a href = "/personal/cart/">перейти в корзину</a></p></div>');
				//$('#header_basket').html(data);
				//$('#modal_header_basket').html(data);
				//$('.basket_icon').html(markup);
			},
			error: function (xhr, status) {
				alert("Sorry, there was a problem!");
				
			},
			complete: function (xhr, status) {
				//$('#showresults').slideDown('slow')
			}
		});
	}, 1000);
});
*/

function add2basket(_this) {

	var id = $(_this).data('id');
	var id_factura = $(_this).data('factura');

	//alert(id_osnovanie);
	//id_osnovanie = 50270;
	if (id) {
		alert(id);
		alert(id_factura);
		$.post('/ajax/add2basket.php', {'ID': id, 'id_factura': id_factura}, function (response) {
			//alert(response.type == 'ok' ? 'Товар добавлен в корзину' : 'Ошибка!');
			console.log(response.type);
			if (response.type == 'ok')
			{
				$(_this).html('В корзине');
				$(_this).addClass('btn--comlete');
				$(_this).prop('onclick', null).off('click');
				$(_this).attr('href', '/personal/cart/');
			} else
			{
				$('#bu').html('Ошибка');
				alert('Ошибка');
			}
		})
	}
	return false;
}



(function(w, d, s, h, id) {
	w.roistatProjectId = id; w.roistatHost = h;
	var p = d.location.protocol == "https:" ? "https://" : "http://";
	var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? "/dist/module.js" : "/api/site/1.0/"+id+"/init";
	var js = d.createElement(s); js.charset="UTF-8"; js.async = 1; js.src = p+h+u; var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2);
})(window, document, 'script', 'cloud.roistat.com', 'd420ae8ceaa5cc0e0ef18a7ff5e63036');

$(document).ready(function() {
	
$('.p-cardslider').slick({
		asNavFor: '.p-cardslider-dots',
		arrows: false,
		slidesToShow: 1,
		fade: true,
		adaptiveHeight: false,
		infinite: true,
	});
	$('.p-cardslider-dots').slick({
		asNavFor: '.p-cardslider',
		arrows: true,
		prevArrow: '<div class="owl-nav owl-prev"><svg xmlns="http://www.w3.org/2000/svg" width="4.969" height="7.969" viewBox="0 0 4.969 7.969"><path id="Shape_21_copy_3" data-name="Shape 21 copy 3" d="M601.9,824.008a0.883,0.883,0,0,1-.617-0.249,0.839,0.839,0,0,1,0-1.206l2.617-2.531-2.617-2.531a0.838,0.838,0,0,1,0-1.205,0.888,0.888,0,0,1,1.235,0l3.234,3.133a0.838,0.838,0,0,1,0,1.206l-3.234,3.134a0.884,0.884,0,0,1-.618.249h0Z" transform="translate(-601.031 -816.031)"></path></svg></div>',
		nextArrow: '<div class="owl-nav owl-next"><svg xmlns="http://www.w3.org/2000/svg" width="4.969" height="7.969" viewBox="0 0 4.969 7.969"><path id="Shape_21_copy_3" data-name="Shape 21 copy 3" d="M601.9,824.008a0.883,0.883,0,0,1-.617-0.249,0.839,0.839,0,0,1,0-1.206l2.617-2.531-2.617-2.531a0.838,0.838,0,0,1,0-1.205,0.888,0.888,0,0,1,1.235,0l3.234,3.133a0.838,0.838,0,0,1,0,1.206l-3.234,3.134a0.884,0.884,0,0,1-.618.249h0Z" transform="translate(-601.031 -816.031)"></path></svg></div>',
		slidesToShow: 3,
		focusOnSelect: true,
		centerMode: true,
		infinite: true,
	});

	//$('.p-cardslider__item').parent().lightGallery();
	
}); 
	
(function($) {
	$(function() {

	  $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
		$(this)
		  .addClass('active').siblings().removeClass('active')
		  .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
	  	$(this).closest('div.tabs').find('div.tabs__content.active .slick-slider').slick('refresh');
	  });

	});
})(jQuery);

$(document).ready(function() {
	$(".p-cardslider").lightGallery({
		selector: '.p-cardslider__item a'
	}); 
	$(".reviews-block__list").lightGallery({
		selector: '.reviews-block__text a',
		thumbnail: false
	}); 
	/* $(".prod_slider").lightGallery({
		selector: '.prod_slider__item a'
	});  */
	
	
	$("#header_basket").on("click", function(e){
		e.stopPropagation();
	});

	// Close cart popup on outside click
	$(document).on("click", function(e){
		var t = $(e.target);

		if ($("#header_basket").css('display') == 'block') {
			$("#header_basket").stop(true).slideUp();
		}
	});

	$(document).on("click", ".basket_top a", function(e){
		e.stopPropagation();
	});

	$(document).on('click', '.catalog_list_item .counter-block__remove', function(e) {
		let $input = $(this).closest('.counter-block').find('.counter-block__input');
		let val = parseInt($input.val());
		val -= 1;
		if (val < 0 || isNaN(val)) val = 0;
		$input.val(val).change();
	});

	$(document).on('click', '.catalog_list_item .counter-block__add', function(e) {
		let $input = $(this).closest('.counter-block').find('.counter-block__input');
		let val = parseInt($input.val());
		val += 1;
		if (val < 0 || isNaN(val)) val = 0;
		$input.val(val).change();
	});

	window.productQuantityInputTimeouts = {};
	$(document).on('change', '.catalog_list_item .counter-block__input', function(e) {
		if (window.productQuantityInputTimeouts[$(this).data('id')]) clearTimeout(window.productQuantityInputTimeouts[$(this).data('id')]);
		let that = this;
		window.productQuantityInputTimeouts[$(this).data('id')] = setTimeout(function(){
			let val = parseInt($(that).val());
			if (val < 0 || isNaN(val)) val = 0;
			$(that).closest('.catalog_list_item').find('.button-buy').attr('data-quantity', val);

			$.post('/ajax/change_product_basket.php', {'ID': $(that).data('offer-id'), 'quantity': val}, function (response) {
				if (response.type == 'ok')
				{
					let counter = $(that).closest('.counter-block');
					let button = counter.next('.button-buy');
					button.toggleClass('active', !val);
					counter.toggleClass('active', !!val);
					console.log(counter, button, !val, val)
					updCart($(that).data('id'), val);
				}
			});
			window.productQuantityInputTimeouts[$(that).data('id')] = false;
		}, 300);
	});

	$(document).on('click', '.catalog_list_item .button-buy', function(e){
		let button = $(this);
		let counter = button.prev('.counter-block');
		$('.counter-block__input', counter).val(1);
		button.toggleClass('active', !1);
		counter.toggleClass('active', 1);
	});
});
$(".menu_cat_left_one span").click(function () {
	$(this).next('ul').slideToggle(100);
	
	if($(this).hasClass('active')){ 
		$(this).removeClass('active');
	}
	else
	{
		$(this).addClass('active');
	}
});

$(document).on('click', '.summary-mobile__sort-current', function(e) {
	e.preventDefault();
	$('.summary-mobile__sort-list').toggleClass('visible')
});
$(document).on('click', '.summary-mobile__filter', function(e) {
	e.preventDefault();
	$('.sidebar').addClass('active');
	$('.app-wrapper').addClass('app-wrapper--sidebar-active');

	var $range = $('.kombox-range div');
	if ($range.length) {
		$range.each(function(){
			var slider = $(this);
			var min = parseFloat(slider.data('min'));
			var max = parseFloat(slider.data('max'));
			var parent = slider.parents('.kombox-num');
			var inputFrom = $('.kombox-num-from', parent);
			var inputTo = $('.kombox-num-to', parent);

			var from = inputFrom.val();
			if(!from.length)from = min;
			from = parseFloat(from);

			var to = inputTo.val();
			if(!to.length)to = max;
			to = parseFloat(to);

			if(from > to){
				from = to;
				inputFrom.val(from);
			}
			else if(from==min){
				inputFrom.val('');
			}

			slider.ionRangeSlider("update", {
				from: from,
				to: to
			});
		});
	}
});
$(document).on('click', '.kombox-filter__cacnel', function(e) {
	e.preventDefault();
	$('.sidebar').removeClass('active');
	$('.app-wrapper').removeClass('app-wrapper--sidebar-active');
});
$(document).on('click', '#set_filter', function(e){
	$('.sidebar').removeClass('active');
	$('.app-wrapper').removeClass('app-wrapper--sidebar-active');
})

$(document).ready(function(){
	if (window.innerWidth <= 1024) {
		let leftTabs = $('.prod_tabs.tabs');
		let rightTabs = $('.prod_right.tabs');

		$('.prod_tabs_list li', rightTabs).removeClass('active').appendTo($('.prod_tabs_list', leftTabs));
		$('.tabs__content', rightTabs).removeClass('active').appendTo(leftTabs);

		$('.tabs .product-container').slick()
	}
});