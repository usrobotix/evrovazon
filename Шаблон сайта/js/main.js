$(document).ready(function() {
    $('.folder-category .folder-category__button').parent().hover(function() {
        $('.folder-category__content').slideDown();
    }, function() {
        $('.folder-category__content').slideUp();
    });


    "use strict";

    // Test via a getter in the options object to see if the passive property is accessed
    var supportsPassive = false;

    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
            }
        });
        window.addEventListener("test", null, opts);
    } catch (e) {}
    // Use our detect's results. passive applied if supported, capture will be false either way.
    // elem.addEventListener('touchstart', fn, supportsPassive ? { passive: true } : false);

    // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
        };
    })();
    
    function initPlupLoad(plupload_data) {

        // JS_FORM_REQUIRED_FIELD = $('.upl_req_field').val();
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.charset = "UTF-8";
        script.src      = "/shared/s3/plupload/plupload.all.pack.js";
        
        script.onload = script.onreadystatechange = function() {
            if (!script.onloadDone && (!this.readyState ||
                        this.readyState === "loaded" || this.readyState === "complete") ) {
                script.onloadDone = true;
                if(plupload_data) {
                    newSWFU(
                    plupload_data['position'],
                    plupload_data['required'],
                    plupload_data['count'],
                    plupload_data['url'],
                    plupload_data['field'],
                    plupload_data['size'] + " MB",
                    plupload_data['filetype1'] + " MB",
                    plupload_data['filetype0'] + " MB",
                    plupload_data['button']);
                }
            }
        };
        
        var head = document.getElementsByTagName('HEAD').item(0);
        head.insertBefore(script, head.firstChild);
        window.pl_script = script;
    };
        
    function getPlupLoadData(el) {
        
        var fileHidden = el;
        
        var plupload_data = {
            position : fileHidden.data('position'),
            required : fileHidden.data('required'),
            count : fileHidden.data('count'),
            url : fileHidden.data('url'),
            size : fileHidden.data('size'),
            field : fileHidden.data('field'),
            filetype1 : fileHidden.data('filetype1'),
            filetype0 : fileHidden.data('filetype0'),
            button : fileHidden.data('button')
        };
        
    
        return plupload_data;
    }

    

    $('.link_top').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    /**
     * Прокрутка страницы вверх
     */
    // main function
    function scrollToY(scrollTargetY, speed, easing) {
        // scrollTargetY: the target scrollY property of the window
        // speed: time in pixels per second
        // easing: easing equation to use

        var scrollY = window.scrollY || document.documentElement.scrollTop,
            scrollTargetY = scrollTargetY || 0,
            speed = speed || 2000,
            easing = easing || 'easeOutSine',
            currentTime = 0;

        // min time .1, max time .8 seconds
        var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

        // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
        var easingEquations = {
            easeOutSine: function(pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function(pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function(pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

        // add animation loop
        function tick() {
            currentTime += 1 / 60;

            var p = currentTime / time;
            var t = easingEquations[easing](p);

            if (p < 1) {
                requestAnimFrame(tick);

                window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
            } else {

                window.scrollTo(0, scrollTargetY);
            }
        }

        // call it once to get started
        tick();
    }

    /** ===========================================================================
     * Mobile scripts
     * ============================================================================ */
    /**
     * определение существования элемента на странице
     */
    $.exists = function(selector) {
        return ($(selector).length > 0);
    }

    var mobileHeader = $('.mobile-header');
    var toTop = document.getElementById('b-2top');

    toTop.addEventListener('pointerup', function() {
        scrollToY(0, 1500, 'easeInOutQuint');
    }, false);

    function setupScrollEvents() {

        if (window.scrollY > 30) {
            mobileHeader.addClass('mobile-header--not-top');
        } else {
            mobileHeader.removeClass('mobile-header--not-top');
        }

        if (window.scrollY > 200) {
            toTop.classList.add('b-2top--is-show');
        } else {
            toTop.classList.remove('b-2top--is-show');
        }
    }

    setupScrollEvents();

    window.addEventListener('scroll', setupScrollEvents, supportsPassive ? {
        passive: true
    } : false);

    // var mobileHeader = document.querySelector('.mobile-header');
    // var headroom  = new Headroom(mobileHeader, {
    //  offset : 30
    // });
    // headroom.init();

    // внутренние классы
    var mobile_classes = {
        opened: 'is-opened',
        closed: 'is-closed'
    };

    var target_toolbar_buttons = $('.me-cart-trigger, .me-search-trigger, .me-user-trigger, .me-feedback-trigger');

    // выпадалки
    var toolbar_button_dropdowns = $('.toolbar-button-dropdown');

    /**
     * закрываем все выпадалки
     */
    function close_toolbar_button_dropdowns() {
        toolbar_button_dropdowns
            .removeClass(mobile_classes.opened);
        target_toolbar_buttons
            .removeClass(mobile_classes.opened);
    }

    /**
     * предотвращаем всплытие кликов на документе от .toolbar-button-dropdown
     */
    toolbar_button_dropdowns.on('click', function(event) {
        event.stopPropagation();
    });

    /**
     * кнопки у которых есть выпадалки
     */
    target_toolbar_buttons.on('click', function(event) {

        event.stopPropagation();
        event.preventDefault();

        var $self = $(this);

        if ($self.hasClass(mobile_classes.opened)) {

            $self.removeClass(mobile_classes.opened);
            close_toolbar_button_dropdowns();

        } else {

            close_toolbar_button_dropdowns();

            if ($self.hasClass('me-search-trigger')) {
                $('.mobile-search-form__input').focus();
            }

            $self.addClass(mobile_classes.opened);

        }
    });

    /* pointer */
    /*========================*/
    $('.map-block__map-point img').on('click', function() {

        if ($(this).closest('.map-block__map-point').hasClass('js-opened')) {

            $(this).closest('.map-block__map-point').removeClass('js-opened');

        } else {

            $(this).closest('.map-block__map-point').addClass('js-opened');

        }

    });

    $('.map-block__content-close').on('click', function() {

        $(this).closest('.map-block__map-point').removeClass('js-opened');

    });

    /**
     * нажатие на ESC
     */
    $(document).on('keydown', function(event) {

        if (event.keyCode === 27) {
            close_toolbar_button_dropdowns();
        }

    });

    /*!
     * клик по документу
     */
    $(document).on('click', function(event) {

        close_toolbar_button_dropdowns();
    });

    /*!
     * Remodal actions
     */ 

    // обратный звонок
    var extendedPhonePopup = $('[data-remodal-id=phonePopup]').remodal();

    $(document).on('click', '.phone-back', function(event) {
		
        event.preventDefault();
        extendedPhonePopup.open();
		/* $.fancybox.open({
			src  : '#phonePopup',
			type : 'inline',
			opts : {
				afterShow : function( instance, current ) {
					//console.info( 'done!' );
				}
			}
		}); */
    });
	
	 // вопрос о продукте
    var extendedProdPopup = $('[data-remodal-id=product-quest]').remodal();

    $(document).on('click', '.product-quest-but', function(event) {
		
        event.preventDefault();
        extendedProdPopup.open();
    });


    // выбор города
    var extendedLocationPopup = $('[data-remodal-id=locationPopup]').remodal();
    $('.location-popup').on('click', function(event) {
        event.preventDefault();
        extendedLocationPopup.open();
    });
	
    // авторизация
	/*
    var extendedAutorizationPopup = $('[data-remodal-id=autorizationPopup]').remodal();

    $(document).on("click", '.need-autorization', function(event) {
        event.preventDefault();
        extendedAutorizationPopup.open();
    });
	*/

    /**
     * Адаптивные видео
     * YouTube,Vimeo, Blip.tv*, Viddler*, Kickstarter*
     * * means native support for these may be deprecated. If your video platform is not currently supported, try adding it via a customSelector
     */
//    $('body').fitVids();

    /**
     * Таблицы со скроллом
     */
    $('table:not(data-table-crash,.shop2-cart-table,.shop2-cart-total,.table-registration)').wrap("<div class='scroll-table_enabled'/>");

    /**
     * table2grid
     */
//    $.table2grid('[data-table-crash]');

    /**
     * Маска для полей ввода телефона
     * https://igorescobar.github.io/jQuery-Mask-Plugin/
     */
    // $('.excl-phonemask, [type="tel"]').mask('+0 (000) 000-00-00', {
    //     placeholder: "+x (xxx) xxx-xx-xx"
    // });

    /**
     * Мобильное меню сайта
     */
    var asideMenuBtn = $('.b-aside-menu-btn');
    var asideMenu = $('.b-aside-menu');
    var asideMenuScroller = $('.b-aside-menu__scroller-content');

    function openAsideMenu() {
        asideMenu.addClass('js-animate js-opening');
    }

    function closeAsideMenu() {

        asideMenu.removeClass('js-animate');

        setTimeout(function() {
            asideMenu.removeClass('js-opening');
        }, 150);
    }

    asideMenuBtn.on('pointerup', function(event) {
        event.preventDefault();
        openAsideMenu();
    });

    $('.b-aside-menu__close').on('pointerup', function(event) {
        event.preventDefault();
        closeAsideMenu();
    });

    $('.b-aside-menu__overlay').on('pointerup', function(event) {
        event.preventDefault();
        closeAsideMenu();
    });

    /**
     * запрещаем прокрутку страницы при прокрутке бокового-мобильного
     */
//    $.preventScrolling($('.b-aside-menu__scroller'));

    /**
     * Клонирование верхнего,нижнего меню в боковое-мобильное
     */

     if ($.exists('.folder-category__list')) {

        asideMenuScroller.append('<ul class="aside-nav-list aside-nav-list--category aside-nav-list--background-green"><li><a href="#">Каталог</a></li></ul>');

        var newAppNav = $('.folder-category__list').clone().removeAttr('class');


        $('.aside-nav-list--category > li').append(newAppNav);
    } 

    if ($.exists('.header-menu--passive .header-menu__list')) {

        var newAppNav = $('.header-menu--passive .header-menu__list').clone();

        newAppNav
            .removeAttr('class')
            .addClass('aside-nav-list aside-nav-list--background-green')
            .appendTo(asideMenuScroller);
    }

    if ($.exists('.company-list__content')) {

        var newAppNav = $('.company-list__content').clone();

        newAppNav
            .removeAttr('class')
            .addClass('aside-nav-list aside-nav-list--background-grey')
            .appendTo(asideMenuScroller);
    }

    if ($.exists('.header-menu--fixed .header-menu__list')) {

        var newAppNav = $('.header-menu--fixed .header-menu__list').clone();

        newAppNav
            .removeAttr('class')
            .addClass('aside-nav-list')
            .appendTo(asideMenuScroller);
    }

    /*if ($.exists('.company-block__list')) {

        var newAppNav = $('.company-block__list').clone();

        newAppNav
            .removeAttr('class')
            .addClass('aside-nav-list')
            .appendTo(asideMenuScroller);
    }

    if ($.exists('.footer-menu ul')) {

        var newAppNav = $('.footer-menu ul').clone();

        newAppNav
            .removeAttr('class')
            .addClass('aside-nav-list')
            .appendTo(asideMenuScroller);
    }*/



    $.each(asideMenuScroller.find('li'), function(index, element) {

        if ($(element).find('ul').length) {

            var triggerIcon = ['<div class="svg-icon svg-icon--angle-down">',
                '<svg class="svg-icon__link">',
                '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#angle-down"></use>',
                '</svg>',
                '</div>'
            ].join('');

            var subMenuTrigger = $('<div class="sub-menu-trigger">' + triggerIcon + '</div>');

            $(element)
                .addClass('is-has-child')
                .append(subMenuTrigger);
        }
    });

    /*if ($.exists('.aside-nav-list')) {

        $('.aside-nav-list').simpleMenu({
            timing: 500,
            menu: {
                trigger: '.sub-menu-trigger'
            }
        });
    }*/
    
    $('.aside-nav-list li').each(function(){
        if($(this).hasClass('open')){
            $(this).parents('li.is-has-child').addClass('open');
        }   
    });
    
    $('.aside-nav-list li.is-has-child > a').on('click', function(e){
        e.preventDefault();
        $(this).parent().toggleClass('open').find('>ul');
    });

    /* Всплывающая галерея */
    /*========================*/
    $('.highslide').off('click').removeAttr('onclick');
    $('body').lightGallery({
        selector: ".highslide",
        autoplayControls: false,
        pager: false,
        thumbnail: false,
        counter: false,
        actualSize: false,
        fullScreen: false,
        hash: false,
        download: false
    });

    /* стилизация полей формы */
    /*========================*/
//    $('input, select').not('.no-styler').styler();


    /* Кнопка  читать полностью */
    /*===========================*/
    var textHeight  = 0;
    var formHeight  = 0;
    var max_940     = false;
    
    function moreCalc () {
        textHeight = $('.information-block__text-content').height();
        formHeight = $('.information-block__form').height() - 45;
    
        $('.information-block__text').attr('data-height', textHeight).attr('data-form-height', formHeight);
    
        
        if (textHeight > formHeight) {
    
            $('.information-block__text').height(formHeight);
    
            $('.information-block__more').removeClass('js-hide');
    
        } else {
    
            $('.information-block__text').removeAttr('style');
            $('.information-block__more').addClass('js-hide');
    
        }
    };
    
    function moreOpen () {
        $('.information-block__more').on('click', function(event) {
    
            if ($(this).hasClass('js-opened')) {
    
                $(this).removeClass('js-opened');
                $('.information-block__text').stop().animate({height: formHeight});
    
            } else {
    
                $(this).addClass('js-opened');
                $('.information-block__text').stop().animate({height: textHeight});
    
            };
            event.preventDefault();
    
        });
    };


    /* категории в блоке */
    /*========================*/
    $('.folder-list__item').on('click', function(event) {

        if ($(this).hasClass('folder-list__item--popup')) {


            $(this).find('.folder-list__popup').addClass('js-opened');
            $(this).addClass('js-opened');
            var thisElem = $(this);
            $(document).mouseup(function(e) {
                var container = thisElem;

                if (container.has(e.target).length === 0) {
                    container.find('.folder-list__popup').removeClass('js-opened');
                    container.removeClass('js-opened');
                }
            });

        }

    });

    /* текст в категориях */
    /*========================*/
    var textFolderBlock = $('.folder-text__content');
    var textFolder = $('.folder-text__inner');
    var textMaxHeight = textFolderBlock.height();
    var moreButton = $('.folder-text__more');
    var textfolderHeight = 0;

    function moreText() {
        textfolderHeight = textFolder.height();

        textFolderBlock.attr('data-height', textfolderHeight).attr('data-max-height', textMaxHeight);

        if (textfolderHeight > textMaxHeight) {

            textFolderBlock.height(textMaxHeight);

            moreButton.removeClass('js-hide');

        } else {

            moreButton.addClass('js-hide');

        }
    };

    $(window).on('resize', function() {

        moreText();

    }).trigger('resize');

    function moreOpenText() {
        moreButton.on('click', function(event) {

            if ($(this).hasClass('js-opened')) {


                $(this).removeClass('js-opened');
                textFolderBlock.stop().animate({
                    height: textMaxHeight
                });

            } else {

                $(this).addClass('js-opened');
                textFolderBlock.stop().animate({
                    height: textfolderHeight
                });

            };
            event.preventDefault();

        });
    };

    moreOpenText();
    /* Каталог (открытие и вычисление высоты) */
    /*========================================*/

    /* $('.folder-category').hover(function() {
        var folderButton = $('.folder-category__button');
        var folderContent = folderButton.closest('.folder-category').find('.folder-category__content');
        var positionList = 0;
        var windowHeight = $(window).outerHeight();
        if ($(this).closest('.header-menu').hasClass('js-fixed')) {

            positionList = $('.header-menu--fixed').outerHeight() + $('.header-menu--passive').outerHeight();

        } else {

            positionList = $('.header-menu--passive').offset().top + $('.header-menu--passive').outerHeight();

        }

        var listHeight = windowHeight - positionList - Math.round(windowHeight * 0.01);

        //$('.folder-category__list').height(listHeight);

        if (folderButton.hasClass('js-opened')) {

            folderButton.removeClass('js-opened');
            folderContent.stop().slideUp(400);

        } else {

            folderButton.addClass('js-opened');
            folderContent.stop().slideDown(800);

        }

        $(document).mouseup(function(e) {
            var container = $(".folder-category");
            if (container.has(e.target).length === 0) {
                folderButton.removeClass('js-opened');
                folderContent.slideUp(400);
            }
        });

    }); */

    /* Фиксируем меню при прокрутке */
    /*==============================*/
    var menuPassive = 0;
    var menuPassiveHeight = 0;
    var menuFixedHeight = 0;


   /*  $(window).resize(function() {

        menuPassive = $('.app-header').offset().top + $('.app-header').outerHeight();
        menuPassiveHeight = $('.header-menu--passive').outerHeight();
        menuFixedHeight = $('.header-menu--fixed').outerHeight();

    }).trigger('resize'); */


    /* $(window).scroll(function() {

        var menuFixed = $('.header-menu--fixed').offset().top + menuFixedHeight;

        if (menuFixed >= menuPassive) {

            $('.app-header').css({
                'margin-bottom': menuPassiveHeight
            });

            $('.header-menu--passive, .header-menu--fixed').addClass('js-fixed');

        } else {

            $('.app-header').css({
                'margin-bottom': '0'
            });
            $('.header-menu--passive, .header-menu--fixed').removeClass('js-fixed');

        }

    }).trigger('scroll'); */
    

    /* табы на странице контакты */
    /*===========================*/
    var $cards = $('.amazing-block__list-item');
    var cards = '.amazing-block__list-item';
    var $itemsContainer = $('.amazing-block__list');
    var $bodys = $('.amazing-block__description-wrapper');
    var index = 'card-index';
    var activeClass = 'amazing-block__list-item--active';
    
    function insertDescription() {
        
        var $cards = $('.amazing-block__list-item').not(':hidden');
        var cards = '.amazing-block__list-item';
        
        if (!$cards.filter('.' + activeClass).length) return;
        
        $(cards).removeAttr('data-index-id');
        
        $cards.each(function(i, el){
            $(this).attr('data-index-id', i+1);
        });
    
        var activeIndex = $cards.filter('.' + activeClass).data(index);
        var $body = $bodys.filter('[data-' + index + '="' + activeIndex + '"]');
        var ind = $cards.filter('.' + activeClass).attr('data-index-id') || 0;
        var countItemsInRow = parseInt($itemsContainer.outerWidth() / $cards.outerWidth(true));
        var rowIndex = Math.floor(ind / countItemsInRow) == ind / countItemsInRow ?
            ind / countItemsInRow :
            parseInt(ind / countItemsInRow) + 1;

        var $lastItemInRow = $(cards).not(':hidden').splice((rowIndex * countItemsInRow) - countItemsInRow, countItemsInRow);
    
        $lastItemInRow = $lastItemInRow[$lastItemInRow.length - 1];
        $body.insertAfter($lastItemInRow);
    };
    
    
    $(window).on('resize', function () {
        insertDescription();
    });
    
    $cards.on('click', function (e) {
    
        var $body = $bodys.filter('[data-' + index + '="' + $(this).data(index) + '"]');
    
        var alias = $(this).data('alias');

        $bodys.slideUp();
        if (!$(this).hasClass(activeClass)) $body.slideDown();
        $cards.not($(this)).removeClass(activeClass);
        $(this).toggleClass(activeClass);
    
        insertDescription();
    
        $('.contacts-towns__list ul li a:contains(' + alias + ')')
            .parent('li').addClass('active')
            .siblings('li').removeClass('active');
    
    
    });
    
    $('.towns-card__hide-link').on('click', function () {
        $bodys.slideUp();
        $cards.removeClass(activeClass);
        return false;
    });
    
    
    
    $('.amazing-tab__close').on('click', function(event) {
    
        $('.amazing-block__list-item--active').click();
        event.preventDefault();
    
    });
     
    /* Прокрутка до блока при клике на точку на карте */
    /*================================================*/
    
    /* Перенесено в ya_map.js */

    // var $listItems = $('.amazing-block__list-item');
    
    // $('.map-block__content-more').on('click', function(event) {
        
    //  var tabBlockOffset  = 0;
    //  var tabBlock = $(this).attr('data-item-id');
    
    //  var $listItem = $listItems.filter('[data-' + index + '="' + $(this).data('item-id') + '"]');
    
    //  $listItem.click();
    
    //  console.log($(this).data('item-id'));
    
    //  tabBlockOffset = $listItem.offset().top - 82 + $listItem.outerHeight();
    
    //  setTimeout(function () {
    
    //      $('html,body').animate({'scrollTop': tabBlockOffset}, 1000);
    
    //  },500);
    
    //  event.preventDefault();
        
    // });
    /* Табы на странице товара */
    /*========================
    $('.full-product').responsiveTabs({
        rotate: false,
        animation: 'slide',
        collapsible: true,
        active: 0,
        setHash: false
    });
*/
    /* Основной слайдер на странице товара */
    /*=====================================*/


    var slideFlag_1025 = false;
    var slideFlag_1024 = false;
    var productSlider = $('.full-product__images-content');
    var productSliderOptions = {
        gallery: true,
        item: 1,
        thumbItem: 7,
        thumbMargin: 10,
        slideMargin: 0,
        vertical: true,
        verticalHeight: 640,
        vThumbWidth: 80,
        speed: 0,
        galleryMargin: 55,
        enableDrag: false,
        sliderInitalized: false,
        onSliderLoad: function() {

            if (!$('.pager-wrapper').length) {

                $('.full-product .full-product__images .lSPager').wrap('<div class="pager-wrapper"></div>')

            }

        },
        responsive: [{
            breakpoint: 800,
            settings: {
                thumbItem: 6,
            }
        }, {
            breakpoint: 480,
            settings: {
                thumbItem: 3,
            }
        }]
    };

    function initProductSlider() {
        productSlider = $('.full-product__images-content').lightSlider(productSliderOptions);
        productSlider.refresh();
        productSliderOptions.sliderInitalized = true;
    };

    if (productSlider.length) {



        $(window).on('resize', function() {

            if (window.matchMedia('(min-width: 1025px)').matches) {

                if (!slideFlag_1025) {

                    if (productSliderOptions.sliderInitalized) {
                        productSlider.destroy();
                    }

                    productSliderOptions.vertical = true;
                    productSliderOptions.galleryMargin = 55;

                    productSliderOptions.onSliderLoad = function() {
                        if (!$('.pager-wrapper').length) {

                            $('.full-product .full-product__images .lSPager').wrap('<div class="pager-wrapper"></div>');

                        }
                    };

                    initProductSlider();

                    slideFlag_1025 = true;
                    slideFlag_1024 = false;
                }

            } else if (window.matchMedia('(max-width: 1024px)').matches) {

                if (!slideFlag_1024) {

                    if (productSliderOptions.sliderInitalized) {
                        productSlider.destroy();
                    }

                    productSliderOptions.vertical = false;
                    productSliderOptions.galleryMargin = 20;

                    productSliderOptions.onSliderLoad = function() {
                        $('.pager-wrapper').remove();
                    };

                    initProductSlider();

                    slideFlag_1025 = false;
                    slideFlag_1024 = true;

                }

            }


        }).trigger('resize');

    }

    /* похожие товары */
    /*========================
    $('.full-product__similar-list').lightSlider({
        item: 5,
        loop: false,
        slideMove: 1,
        speed: 600,
        slideMargin: 20,
        enableDrag: true,
        pager: false,
        adaptiveHeight: true,
        responsive: [{
            breakpoint: 840,
            settings: {
                item: 4,
                slideMove: 1,
                slideMargin: 6
            }
        }, {
            breakpoint: 840,
            settings: {
                item: 3,
                slideMove: 1
            }
        }, {
            breakpoint: 540,
            settings: {
                item: 2,
                slideMove: 1
            }
        }, {
            breakpoint: 440,
            settings: {
                item: 1,
                slideMove: 1
            }
        }]
    });
*/
    /* Слайдер на главной */
    /*========================*/
    $('.main-slider__list').lightSlider({
        item: 1,
        slideMove: 1,
        speed: 1000,
        slideMargin: 0,
        pause: 2000,
        adaptiveHeight: true,
        auto: true,
        pauseOnHover: true,
        enableDrag: false,
        loop: false
    });

    /* Отзывы */
    /*========================*/
    window.reviewsListSlider = $('.reviews-block__list').lightSlider({
        item: 3,
        slideMove: 1,
        speed: 1000,
        slideMargin: 20,
        adaptiveHeight: true,
        enableDrag: false,
        auto: false,
        pager: false,
        pause: 4000,
        loop: true,
        responsive: [{
            breakpoint: 1200,
            settings: {
                item: 2
            }
        }, {
            breakpoint: 800,
            settings: {
                item: 1
            }
        }]
    });

    $('.reviews-block__item').each(function(index, el) {

        var itemGallery = $(this);

        itemGallery.lightGallery({
            selector: ".reviews-block__popup-item",
            hash: false,
            thumbWidth: 80,
            counter: false,
            fullScreen: false,
            download: false,
            autoplay: false,
            autoplayControls: false,
            toogleThumb: false,
            addClass: "reviews-gallery"

        })

    });
    
    // нужно больше рекомендуемых товаров
    
    $('.product-container__more').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $('.product-container__limit').stop().slideToggle();
    });
    
    // новинки
    /*
    if ($.exists('.new-products')) {
        $.ajax({
            url:'/internet-magazin/search?s',
            data: {
                's[new]'               : 1,
                'products_only'        : 1,
                's[products_per_page]' : 4,
                'no_pager'             : 1,
                'ajax'                 : 1,
            }
        }).done(function(res){
            var $newProducts = $(res).find('.product-block');
            $(res).appendTo('.new-products .product-container');
            
            
        });
    }
    */
	//форма о нас
	/* 
    $(".information-block__form").s3IncludeForm("/poyavilis-voprosy-napishite-nam", function(){
        initPlupLoad( getPlupLoadData( $('.information-block__form').find('.anketa-flash-upload input:hidden') ) );

        $(window).on('resize', function() {
        
            if (window.matchMedia('(min-width: 941px)').matches) {
                
                moreCalc();
        
                max_940 = false;
        
            } else {
        
                if (!max_940) {
        
                    $('.information-block__text')
                        .removeAttr('data-height')
                        .removeAttr('data-form-height')
                        .removeAttr('style');
        
                    max_940 = true;
        
                }
        
            }
        
        }).trigger('resize');
        
        moreOpen();

    });
    */
    
    /* $(document).on('click', '.phone-back', function(event){
        event.preventDefault;
        var $this = $(this);
        var url = $(this).data("url");
        
        $(".call-back").s3IncludeForm(url, function(){
            var block = $(this);
            var procuctName = $this.data("product-name");
            if (procuctName) {
                $(this).find("[data-alias='product_name']").val(procuctName).attr("readonly", true);
            }
            initPlupLoad( getPlupLoadData( block.find('.anketa-flash-upload input:hidden') ) );
            
            //текущий URL
            $(this).find("[data-alias='field_366945041']").val(window.location.href);
            
        });
        
    }); */
    
    /* выбор города */
    

    /* $('.js-form-block__item').on('click', function(event){
        
        event.preventDefault();
        var dateNum = $(this).data("num"),
            dateTel1 = $(this).data("tel1"),
            dateTel2 = $(this).data("tel2"),
            datePhones2 = $(this).data("phones2"),
            dateText = $(this).text();
            
            
        createCookie("city", $(this).data('url').replace('/',''), 30);
        
        $('.app-header__cities-name').text(dateText);
        $('.app-header__phone-item').find('.app-header__phone1').text(dateTel1);
        $('.app-header__phone-item').find('.app-header__phone2').text(dateTel2);
        
        $('.b-aside-menu-phone__item').find('.app-header__phone1').text(dateTel1);
        $('.b-aside-menu-phone__item').find('.app-header__phone2').text(dateTel2);
        
        $('.footer-phone').find('.footer-phone-col').text(datePhones2);
        $('.city-phones__item').hide();
        $('.city-phones__item[data-num="'+dateNum+'"]').show();

    }); */
    
    if (readCookie("city")) {
        $('.js-form-block__item[data-url="/'+readCookie("city")+'"]').click();
    }
    
    // Костыль для закрытия после выбора города
    $(document).on('opened', '[data-remodal-id=locationPopup]', function () {
        
      $('.js-form-block__item').on('click', function(event){
        
        extendedLocationPopup.close();
      
      });
      
    });
    
    var requisitesOffset = 0;
    
    $('.city-sorting__more').on('click', function (event) {
        
        event.preventDefault();
        
        requisitesOffset = $('.requisites').offset().top - 70;
    
        setTimeout(function () {
    
            $('html,body').animate({'scrollTop': requisitesOffset}, 1000);
    
        },500);
        
    });
    
    // Прокрутка к товарам в конце категории
    var sortingContainer        = $('.sorting-block');
    var sortingContainerPos     = 0;
    var scrollFault             = 80;
    var folderScroll            = 0;
    
    $('.folder-text__more-product').on('click', function() {
        
        sortingContainerPos     = sortingContainer.offset().top;
        
        folderScroll = sortingContainerPos - scrollFault;
        
        $('html,body').animate({'scrollTop': folderScroll}, 1000);
        
    });
    
    $('.map-block__city-list li').on('click', function(event){
        event.stopPropagation();
        
        $('.map-block__city-list li').removeClass('active');
        $(this).addClass('active');
    });
    
    $('.js-clear-filter').on('click', function(){
        $('.map-block__city-list li').removeClass('active');
    });
    $('select[data-filter-type="city"]').on('change', function(){
        var city = $(this).find('option:selected').val();
        $('.map-block__city-list li').removeClass('active');
        $('.map-block__city-list li a[data-city="'+city+'"]').closest('li').addClass('active');
    });
    
    $('select[data-filter-type="office-type"]').on('change', function(){
        $('.map-block__city-list li').removeClass('active');
    });
    
    
    /*Новый слайдер в карточке товара*/
    /*
    // comment 06.09.2017
    
    var newProductSlider = $('.new-product__main-slider'),
    newProductItems      = newProductSlider.find('.new-product__main-slider-item'),
    newItemsCount        = $('.new-product__main-slider-item').length,
    newProductThumbs     = $('.new-product__slider-thumb');
    
    if(newItemsCount > 1) {
        $.each(newProductItems, function(i, el){
          var item = $('<div class="new-product__thumb" data-index="' + i + '"><img src="' + $(el).data('thumb') + '" alt=""></div>');
          item.appendTo(newProductThumbs);
            //$(el).attr('data-index', i);
        });
    }

    newProductSlider.addClass('owl-carousel').owlCarousel({
        mouseDrag: false,
        items: 1,
        animateOut: 'fadeOut',
        onInitialize: callback
    });
        
    function callback(){
        if (newItemsCount > 1) {
            newProductThumbs.addClass('owl-carousel').owlCarousel({
              items: 4,
              margin: 15,
              loop: true,
              nav: true,
              navText: ['<svg xmlns="http://www.w3.org/2000/svg" width="4.969" height="7.969" viewBox="0 0 4.969 7.969"><path id="Shape_21_copy_3" data-name="Shape 21 copy 3" d="M601.9,824.008a0.883,0.883,0,0,1-.617-0.249,0.839,0.839,0,0,1,0-1.206l2.617-2.531-2.617-2.531a0.838,0.838,0,0,1,0-1.205,0.888,0.888,0,0,1,1.235,0l3.234,3.133a0.838,0.838,0,0,1,0,1.206l-3.234,3.134a0.884,0.884,0,0,1-.618.249h0Z" transform="translate(-601.031 -816.031)"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" width="4.969" height="7.969" viewBox="0 0 4.969 7.969"><path id="Shape_21_copy_3" data-name="Shape 21 copy 3" d="M601.9,824.008a0.883,0.883,0,0,1-.617-0.249,0.839,0.839,0,0,1,0-1.206l2.617-2.531-2.617-2.531a0.838,0.838,0,0,1,0-1.205,0.888,0.888,0,0,1,1.235,0l3.234,3.133a0.838,0.838,0,0,1,0,1.206l-3.234,3.134a0.884,0.884,0,0,1-.618.249h0Z" transform="translate(-601.031 -816.031)"/></svg>'],
              mouseDrag: false,
              responsive: {
                0: {
                  items: 2
                },
                481: {
                  
                },
                641: {
                  
                }
              }
            });
            $('body').on('click', '.new-product__thumb', function(){
                newProductSlider.trigger('to.owl.carousel', [$(this).data('index'), 300]);
                $('.new-product__thumb').removeClass('is-active');
                $('.new-product__thumb[data-index="' + $(this).data('index') + '"]').addClass('is-active');
            });
        }
    }
    */
    
    
    /*
    $('.texture-block__all .shop2-color-ext-list > li span').on('click', function(event,index){
        event.preventDefault();
        $('.texture-block__all ul li span').each(function(){
            if($(this).hasClass('active')){
                return;
            }
            $(this).removeClass('active')
        }).removeClass('active');
        $(this).toggleClass('active');
        var index = $(this).parent().index();
        var url   = $(this).closest('.shop2-color-ext-list').data('url').split(',');
        $.ajax({
            url: '/' + url[index],
            data: {
                "price":"1"
            },
            type: "get",
            dataType: "html",
            cache: false,
            success: function (html) {
                var oldPrice  = $(html).find('.price-old span strong').text();
                var newPrice  = $(html).find('.full-product__price-new').text();
                var kindId    = $(html).find('input[name=kind_id]').attr('value');
                var productId = $(html).find('input[name=product_id]').attr('value');
                $('input[name=kind_id]').attr('value', kindId);
                $('.price-old span strong').text(oldPrice);
                $('.full-product__price-new').text(newPrice);
            }
            
        });
        return false;
    });*/
    
    
    
    
    /*
    // comment 05.09.2017
    var texturePopup = $('[data-remodal-id="texture"]').remodal();
    //$('.site-btn.full-product__order-button.shop2-product-btn').on('click', function(e){
    $('.choose_texture').on('click', function(e){
        e.preventDefault();
        texturePopup.open();
        if ($('.remodal-content .texture-block .texture-block__link').length == 1) {
            return;
        }
        var textAll = $('.remodal-content .texture-block__all').outerHeight();
        if (textAll > 40) {
            $('.remodal-content .texture-block').append('<a class="texture-block__link" href="#" data-show="Посмотреть все" data-hide="Свернуть"></a>');
            $('.remodal-content .texture-block__all ul li').each(function(index){
                if ($(this).index() > 4) {
                    $(this).hide();
                }
            });
        }
    });
    */
    
    
    /*
    // comment 06.09.2017
    var textureHeight = $('.texture-block__all').outerHeight();
    if (textureHeight > 50) {
        $('.new-product__characteristics-value .texture-block').append('<a class="texture-block__link" href="#" data-show="Посмотреть все" data-hide="Свернуть"></a>');
    }
    */
    
    /*$(document).on('click', '.texture-block__link', function(event){
        event.preventDefault();
        $(this).toggleClass('active');
        if ($(this).closest('.new-product__characteristics-value').length && window.matchMedia("(min-width: 981px)").matches){
            $(this).siblings('.texture-block__visible').find('.texture-block__all ul li').each(function(index){
                if ($(this).index() > 4) {
                    $(this).fadeToggle();
                }
            });
        }
        if ($(this).closest('.remodal-content').length) {
            $(this).siblings('.texture-block__visible').find('.texture-block__all ul li').each(function(index){
                if ($(this).index() > 4) {
                    $(this).fadeToggle();
                }
            });
        }
        var defaultHeight = 44;
        var mobileDefaultHeight = 62;
        var minHeight = $(this).siblings('.texture-block__visible').outerHeight();
        var maxHeight = $(this).siblings('.texture-block__visible').find('.texture-block__all').outerHeight();
        var height;
        if($(this).closest('.remodal-content') && window.matchMedia("(max-width: 480px)").matches) {
            $(this).siblings('.texture-block__visible').animate({'height':height = (maxHeight > minHeight) ? maxHeight : mobileDefaultHeight});
        } else {
            $(this).siblings('.texture-block__visible').animate({'height':height = (maxHeight > minHeight) ? maxHeight : defaultHeight});
            
        }
    });*/
    
/*    
    // comment 07.09.2017
    $('.texture-block ul').lightGallery({
        selector: 'li',
        autoplayControls: false,
        pager: false,
        thumbnail: false,
        counter: false,
        actualSize: false,
        fullScreen: false,
        hash: false,
        download: false
    });
*/
    
    
    
    /*
    // comment 05.09.2017*/
    $('.small-basket__inner').on('click', function(e){
        e.preventDefault();
        $(this).siblings('.small-basket__popup').stop().slideToggle();
    });
    
    
    
    /*
    $(document).on('click', function(event){
        if ($(event.target).closest('.small-basket').length ){
            return;
        }
        //$('.small-basket__popup').slideUp();
        //console.log('close')
    });
    */
    
    /*
    // comment 06.09.2017
    $('.filter-output__value-item').on('click', function(){
        $(this).siblings('.filter-output__value-item').removeClass('active');
        $(this).toggleClass('active');  
    });
    */
    
    
    //$('.filter-block__item-slider input').ionRangeSlider();
    
    
/*
// comment 06.09.2017
    (function(){

        $('.filter-block__item').each(function(){
    
            function replaceValues(obj) {
                input_from.html(obj.from);
                input_to.html(obj.to);
            }
    
            var filter_price = $(this);
            var range = filter_price.find('input.range');
            var input_from = filter_price.find('.filter-block__item-value-from');
            var input_to = filter_price.find('.filter-block__item-value-to');
    
            range.ionRangeSlider({
                type: "double",
                hide_min_max: true,
                hide_from_to: true,
                drag_interval: true,
                from_shadow: false,
                to_shadow: false,
                onStart: function(obj) {
                    replaceValues(obj);
                },
                onChange: function(obj) {
                    replaceValues(obj);
                }
            });
    
            var rangeSlider = range.data("ionRangeSlider");
    
        });    
    
    })();
*/
});





/**
 * Новый функционал - корзина
 * 
 * alkh
 * 05.09.2017
 */
var EV = {
    init : function(){
        //EV.checkShop2();
        // Загрузка товаров в малую корзину
        //EV.loadSmallCart();
        // Инициализация галереии текстур
        EV.initTextureGallery();
        
        // Изменение количества +
        //$(document).on("click touchstart", ".counter-block__add", function() { return EV.amountCounter("plus", $(this)); });
        // Изменение количества -
        //$(document).on("click touchstart", ".counter-block__remove", function() { return EV.amountCounter("minus", $(this)); });
        // Показать варианты текстур перед добавлением в корзину
        //$(document).on("click touchstart", ".choose_texture", function(e) {e.preventDefault(); return EV.chooseTexture($(this)); });
        
        // ФИЛЬТРАЦИЯ В КАТАЛОГЕ
        
        // Инициализация диапазона
        EV.filterIonRange();
        // Выбор флага фильтрации
        $(".shop2-filter .ev_flag_filter").on("click", function(){ return EV.filterFlag($(this)); });
        
        
        
        // 
        
        // Окно с выбором фактуры
//        EV.texturePopup = $('[data-remodal-id="texture"]').remodal();
        
        
        //
        
        // Показать малую корзину
		/*
        $(document).on("click", '.small-basket__inner', function(e){
            e.preventDefault();
            EV.loadSmallCart();
            $(this).siblings('.small-basket__popup').stop().slideToggle();
        });
		*/
        
        // Удаление товара из малой корзины
		/*
        $(document).on("click touch touchstart", '.small-basket__remove-button', function(ev){
            ev.preventDefault();
            EV.smallCartRemoveItem($(this));
            return false;
        });
        */
        // Инициализация обработчиков после загрузки товара
        if (typeof shop2 !== 'undefined' && shop2.mode == "product"){ EV.afterLoadKind(); }
        
        
        if ($(".shop2-order-completed").length) {
        	carrotquest.track("$order_completed"); 
        }
        
        // ------ ------ ------ ------ ------ ------ ------ ------ ------ ------ ------ 
    },
    
    
    
    /**
     * 
    
    checkShop2 : function(){
        if (typeof shop2 == "undefined"){
            var script = document.createElement("script"); //Make a script DOM node
            script.src = '/g/shop2v2/default/js/shop2.2.js'; //Set it's src to the provided URL
//            document.head.appendChild(script);
            
            $.ajax({
                url: '/internet-magazin?products_only=1&shop_init=1',
                success: function(res){
                    setTimeout(function(){
//                        eval($.trim(res));
                    }, 600);
                }
            });
        }
    },
     
    
    texturePopup : null,
    */
    /**
     * Подгрузка товаров в маленькую корзину
     * 
    
    loadSmallCart : function(){
        var url = "/personal";
        if( typeof shop2 !== 'undefined' ){
            url = shop2.uri;
        }
        $.ajax({
            url: url + '/cart',
            data: {"need_small_cart": 1, "products_only": 1},
            success: function(res){
                var tmplt = '<div class="small-basket__item ev_scbi"> <div class="small-basket__item-layout"> <div class="small-basket__item-img"> <img src="#____IMG_SRC____#" alt=""> </div> </div> <div class="small-basket__item-layout"> <div class="small-basket__item-title"> #____PROD_NAME____# </div> <div class="small-basket__item-row"> <div class="small-basket__item-row-name"> Цена: </div> <div class="small-basket__item-row-value"> #____PROD_PRICE____# р. </div> </div> <div class="small-basket__item-row"> <div class="small-basket__item-row-name"> Количество: </div> <div class="counter-block"> <button class="counter-block__remove"> - </button> #____PROD_AMOUNT____# <button class="counter-block__add"> + </button> </div> </div> <div class="small-basket__item-row"> <div class="small-basket__item-row-name"> Фактура: </div> <a class="texture-button" href="#"> <img src="#____PROD_FAKTURA____#" alt=""> </a> </div> </div> <span href="#____REMOVE_LINK____#" class="small-basket__remove-button"> <span>Удалить</span> </span> </div>', // Шаблон товара в корзине
                    small_cart_html = '';
                
                // Обновить Итого
                let total_sum = ($(res).find(".total_line").length) ? $(res).find(".total_line").html().replace(' руб.', 'р.') || '0 р.' : '0 р.',
                    total_amount = $(res).find(".total_line").data('total_amount') || '';
                
                $("#shop2-cart-preview, #mobile-header").find(".total").html(total_sum);
                $("#shop2-cart-preview, #mobile-header").find(".count").text(total_amount);
                
                $(".small-basket__counter").text(total_amount || 0)
                
                // Если корзина пуста
                if ($(res).find(".cart-product").length == 0) {
                    $(".ev_load_smallcart").html('<div class="small-basket__item-row-name"><p>Корзина пуста</p></div>');
                    return;
                }
                
            
                // Перебор товаров в корзине
                $(res).find(".ev_product_row").each(function(){
                    let img_src         = $(this).find(".cart-product-image a img").attr("src")     || '', // изображение товара
                        prod_name       = $(this).find(".cart-product-name a").text()               || '', // название товара
                        prod_price      = $(this).find(".cart-price:last").text()                   || '', // цена товара
                        prod_amount     = $(this).find(".shop2-product-amount input")[0].outerHTML  || '', // количество
                        prod_faktura    = $(this).find(".shop2-color-ext-list li img").attr("src")  || '', // фактура
                        remove_link     = $(this).find(".cart-delete a").attr("href")               || '', // ссылка для удаления
                        html            = '';
    
                    prod_amount = prod_amount.replace(/data-kind="(\d+)"/, 'data-kind_id="$1"');
                    prod_amount = prod_amount.replace(/data-max="(\d+)"/, 'data-max_amount="$1"');
    
                    html = tmplt.replace("#____IMG_SRC____#", img_src);
                    html = html.replace("#____PROD_NAME____#", prod_name);
                    html = html.replace("#____PROD_PRICE____#", prod_price);
                    html = html.replace("#____PROD_AMOUNT____#", prod_amount);
                    html = html.replace("#____PROD_FAKTURA____#", prod_faktura);
                    html = html.replace("#____REMOVE_LINK____#", remove_link);
                    
                    small_cart_html += html;
                });
                
                
                // Обновляем малую корзину
                $(".ev_load_smallcart").html(small_cart_html);
            }
        });
    },
     */
    
    
    /**
     * Удаление товара из малой корзины
     * 
     * @param el {jQuery} 
    
    smallCartRemoveItem : function(el){
        var remove_url = el.attr("href");
        
        $.ajax({
            url: remove_url,
            success: function(res){
                EV.loadSmallCart();
            }
        });
    },
     */
    
    
    
    /**
     * Изменение количества
     *
     * @param cntr_mode {string} [plus,minus] - режим
     * @param el {jQuery} - элемент, по которому был клик
     
    amountCounter : function(cntr_mode, el){
        var amount_input = el.parents(".counter-block").find("input"),
            amount_input_val = parseInt(amount_input.val()) || 1;
        
        if (cntr_mode == "minus") {
            if ( amount_input_val <= 1){
                amount_input.val(1);
                shop2.msg("Количество не может быть менее 1", amount_input);
                return false;
            }
            else{
                amount_input.val(amount_input_val-1);
            }
        }
        else{
            // plus
            if (amount_input.data() && amount_input.data('max_amount')) {
                let max_amount = parseInt(amount_input.data('max_amount'));
                if( amount_input_val*1+1 > max_amount ){
                    amount_input.val(max_amount);
                    shop2.msg("Доступно "+max_amount+" шт.", amount_input);
                    return false;
                }
            }
            amount_input.val(amount_input_val*1+1);
            
        }
        
        
        // В маленькой корзине делаем обновление
        if (el.parents(".small-basket__item").length) {
            if (EV.updateCartTimer) { clearTimeout(EV.updateCartTimer); }
            EV.updateCartTimer = null;
            EV.updateCartTimer = setTimeout(function(){ EV.setCartDataFromSmallCart();}, 600);
            
        }
        
        return false;
    },
    */
    
    /**
     * Таймер обновления корзины
     
    updateCartTimer : null,
    */
    
    
    /**
     * Обновляем корзину на основе данных из малой корзины
     * 
     
    setCartDataFromSmallCart : function(){
        var data = [];
        
        $(".ev_scbi").each(function(){
            let inp = $(this).find(".counter-block input");
            
            data.push(inp.attr("name") +'='+ inp.val());
        });
        
        $.post(
                '/my/s3/api/shop2/?cmd=cartUpdate',
                'ver_id=' + shop2.verId +
                '&hash=' + shop2.apiHash.cartUpdate +
                '&' + data.join("&"),
                function(d, status) {
                    if (status == "success"){
                        EV.loadSmallCart();
                    }
                    else{
                        shop2.alert("При обновлении корзины произошла ошибка");
                    }
                }
            );
    },
    
    */
    /**
     * Выбор текстуры перед добавлением в корзину
     * 
     * upd. 23.11.2017 - выбор цвета дерева и металла
     * 
     
    chooseTexture : function(el){
        // In product list
        var prod_url = el.closest("form").find("a.product-block__button-part").attr("href"),
            amount = el.closest("form").find("input[name=amount]").val() || 1;
        
        //  Запрашиваем параметры товара
        $.ajax({
            url: prod_url,
            data: {"products_only": 1},
            success: function(res){
            	
            	// Шаблон для выбра фактур
                var popup_content_tmplt = '<div class="texture-block__title">#__NAME__#</div> <div class="texture-block"> <div class="texture-block__visible"> <div class="texture-block__all"> #____TEXTURE____# </div> </div> </div> ',
                    texture = $(res).find(".texture-block__all");
                
                var t = '';
                if (texture.length) {
                	texture.each(function(){
                		var n = $(this).find(".shop2-color-ext-list.fakture").data('name') || 'Допустимые фактуры.'
                		t += popup_content_tmplt.replace("#____TEXTURE____#", $(this).html()).replace("#__NAME__#", n);
                	});
                }
                
                
                
                //popup_content_tmplt = popup_content_tmplt.replace("#____TEXTURE____#", texture.html());
            	t += '<button class="texture-block__button ev_add_with_texture">Добавить в корзину</button>';
            	popup_content_tmplt = t;
            
                $('[data-remodal-id="texture"] .remodal-content').html(popup_content_tmplt);
                
                $('[data-remodal-id="texture"] .remodal-content .ev_add_with_texture').on("click", function(){
                    EV.addWithTexture(el, parseInt(amount));
                    return false;
                })
                
                // Настройки
                if ($('.remodal-content .texture-block .texture-block__link').length == 1) {
                    return;
                }
                
                
                /*
                var textAll = $('.remodal-content .texture-block__all').outerHeight();
                if (textAll > 50) {
                    $('.remodal-content .texture-block').append('<a class="texture-block__link" href="#" data-show="Посмотреть все" data-hide="Свернуть"></a>');
                    $('.remodal-content .texture-block__all ul li').each(function(index){
                        if ($(this).index() > 4) {
                            $(this).hide();
                        }
                    });
                }*/
				/*
                EV.initTextureGallery();
                $('[data-remodal-id="texture"] .remodal-content').find("li.shop2-color-ext-selected").removeClass("shop2-color-ext-selected");
            }
        })
        
        
        EV.texturePopup.open();
        
        return false;
    },
    
    */
    
    
    /**
     * Добавление товара с учетом выбранной текстуры во вслывающем окне
     * 
     
    addWithTexture : function(el, amount){
        
        let kind_id = $('.remodal-content .texture-block__all li.shop2-color-ext-selected:last').data('kindId') || false;
        if (kind_id) {
            shop2.cart.add(kind_id, amount, function(d) {

                $('#shop2-cart-preview').replaceWith(d.data);

                if (d.errstr) {
                    shop2.msg(d.errstr, $(".ev_add_with_texture"));
                } else {
                    shop2.msg(window._s3Lang.JS_ADDED, $(".ev_add_with_texture"));
                    var _d = $('.remodal-content .texture-block__all li.shop2-color-ext-selected:first').data();
                    
                    carrotquest.track('$cart_added', {
					    '$name': _d.carrotquest_name,
					    '$url': _d.carrotquest_url,
					    '$amount': parseInt(amount),
					    '$img': _d.carrotquest_img
					});
					
                }

                if (d.panel) {
                    $('#shop2-panel').replaceWith(d.panel);
                }
                
                EV.loadSmallCart();
            });
        }
        else{
            shop2.alert("Для добавления товара в корзину необходимо выбрать фактуру");
        }
    },
    
    */
    // ФИЛЬТРАЦИЯ В КАТАЛОГЕ
    
    /**
     * Выбор флага для фильтрации
     * 
     * @param el {jQuery} - выбранный флаг
     
    filterFlag : function(el){
        let flag_val = 1;
        el.siblings('.filter-output__value-item').removeClass('active');
        
        if (el.hasClass("active")) {
            flag_val = 0;
        }
        
        el.toggleClass('active');
        let url = location.pathname + '?s[' + el.data('flag') + ']='+flag_val;
        location.href = url;
        return false;
    },*/
    
    
    
    /**
     * Инициализация выбора диапазона в фильтре
     * 
     */
    filterIonRange : function(){
        $('.filter-block__item').each(function(){
    
            function replaceValues(obj) {
                // Текст для информации
                el_from.html(obj.from);
                el_to.html(obj.to);
                
                // Значение для поиска
                input_from.val(obj.from).keyup();
                input_to.val(obj.to).keyup();
                
                
                $(".shop2-filter-go").removeClass("hide");
            }
    
            var filter_price = $(this),
                range = filter_price.find('input.range'),
                el_from = filter_price.find('.filter-block__item-value-from'),
                el_to = filter_price.find('.filter-block__item-value-to'),
                input_from = filter_price.find('.from_val'),
                input_to = filter_price.find('.to_val');
    
            range.ionRangeSlider({
                type: "double",
                hide_min_max: true,
                hide_from_to: true,
                drag_interval: true,
                from_shadow: false,
                to_shadow: false,
                onStart: function(obj) {
                    //replaceValues(obj);
                },
                onChange: function(obj) {
                    //replaceValues(obj);
                },
                onFinish: function(obj) {
                    replaceValues(obj);
                }
            });
    
            var rangeSlider = range.data("ionRangeSlider");
    
        });    
    },
    
    
    
    
    /**
     * Инициализация всяких штук после загрузки товара
     * 
     */
    afterLoadKind : function(){
        // СЛАЙДЕР В КАРТОЧКЕ ТОВАРА
        
        /*Новый слайдер в карточке товара*/

        var newProductSlider = $('.new-product__main-slider'),
        newProductItems      = newProductSlider.find('.new-product__main-slider-item'),
        newItemsCount        = $('.new-product__main-slider-item').length,
        newProductThumbs     = $('.new-product__slider-thumb');
        
        if(newItemsCount > 1) {
            $.each(newProductItems, function(i, el){
              var item = $('<div class="new-product__thumb" data-index="' + i + '"><img src="' + $(el).data('thumb') + '" alt=""></div>');
              item.appendTo(newProductThumbs);
                //$(el).attr('data-index', i);
            });
        }
        
        newProductSlider.addClass('owl-carousel').owlCarousel({
            mouseDrag: false,
            items: 1,
            animateOut: 'fadeOut',
            onInitialize: callback
        });
            
        function callback(){
            if (newItemsCount > 1) {
                newProductThumbs.addClass('owl-carousel').owlCarousel({
                  items: 4,
                  margin: 15,
                  loop: true,
                  nav: true,
                  navText: ['<svg xmlns="http://www.w3.org/2000/svg" width="4.969" height="7.969" viewBox="0 0 4.969 7.969"><path id="Shape_21_copy_3" data-name="Shape 21 copy 3" d="M601.9,824.008a0.883,0.883,0,0,1-.617-0.249,0.839,0.839,0,0,1,0-1.206l2.617-2.531-2.617-2.531a0.838,0.838,0,0,1,0-1.205,0.888,0.888,0,0,1,1.235,0l3.234,3.133a0.838,0.838,0,0,1,0,1.206l-3.234,3.134a0.884,0.884,0,0,1-.618.249h0Z" transform="translate(-601.031 -816.031)"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" width="4.969" height="7.969" viewBox="0 0 4.969 7.969"><path id="Shape_21_copy_3" data-name="Shape 21 copy 3" d="M601.9,824.008a0.883,0.883,0,0,1-.617-0.249,0.839,0.839,0,0,1,0-1.206l2.617-2.531-2.617-2.531a0.838,0.838,0,0,1,0-1.205,0.888,0.888,0,0,1,1.235,0l3.234,3.133a0.838,0.838,0,0,1,0,1.206l-3.234,3.134a0.884,0.884,0,0,1-.618.249h0Z" transform="translate(-601.031 -816.031)"/></svg>'],
                  mouseDrag: false,
                  responsive: {
                    0: {
                      items: 2
                    },
                    481: {
                      
                    },
                    641: {
                      
                    }
                  }
                });
                $('body').on('click', '.new-product__thumb', function(){
                    newProductSlider.trigger('to.owl.carousel', [$(this).data('index'), 300]);
                    $('.new-product__thumb').removeClass('is-active');
                    $('.new-product__thumb[data-index="' + $(this).data('index') + '"]').addClass('is-active');
                });
            }
        }
        
		$('.new-product__main-slider').lightGallery({
		    selector: '.new-product__main-slider-item',
		    autoplayControls: false,
		    pager: false,
		    thumbnail: false,
		    counter: false,
		    actualSize: false,
		    fullScreen: false,
		    hash: false,
		    download: false
		});
        
        // "ПОКАЗАТЬ ЕЩЕ" в вариантах фактуры
        /*
        var textureFlag = false;
        $(window).on('resize', function(){
            if (!textureFlag){
                if(window.matchMedia("(min-width: 981px)").matches){
                    console.log('980>');
                    $('.new-product__characteristics-value .texture-block__all ul li').each(function(index){
                        if ($(this).index() > 4) {
                            $(this).hide();
                        }
                    });
                    if ($('.new-product__characteristics-value .texture-block__all ul li').length > 5) {
                        $('.new-product__characteristics-value .texture-block').append('<a class="texture-block__link" href="#" data-show="Посмотреть все" data-hide="Свернуть"></a>');
                    }
                    
                    textureFlag = true;
                }
            } else {
                if(textureFlag){
                    if(window.matchMedia("(max-width: 980px)").matches){
                        console.log('980<');
                        $('.new-product__characteristics-value .texture-block__all ul li').show();
                        $('.new-product__characteristics-value .texture-block .texture-block__link').remove();
                        textureFlag = false;
                    }
                }
            }
            if(window.matchMedia("(max-width: 980px)").matches){
                var maxHeight     = $('.new-product__characteristics-value .texture-block__all').outerHeight();
                console.log(maxHeight);
                if (maxHeight > 50 && $('.new-product__characteristics-value .texture-block .texture-block__link').length < 1) {
                    $('.new-product__characteristics-value .texture-block').append('<a class="texture-block__link" href="#" data-show="Посмотреть все" data-hide="Свернуть"></a>');
                }
                else if (maxHeight == 50) {
                    $('.new-product__characteristics-value .texture-block .texture-block__link').remove();
                }
            }
        }).trigger('resize');*/
        EV.initTextureGallery();
        
        $('.full-product').responsiveTabs({
            rotate: false,
            animation: 'slide',
            collapsible: true,
            active: 0,
            setHash: false
        });
    },
    
    
    /**
     * Галерея текстур
     * 
     */
    initTextureGallery : function(){
        $('.texture-block ul').lightGallery({
            selector: '.texture_loupe',
            autoplayControls: false,
            pager: false,
            thumbnail: false,
            counter: false,
            actualSize: false,
            fullScreen: false,
            hash: false,
            download: false
        });
    },
    
    
    
    
    /**
     * Обновление адаптивной корзины
     * 
     * @param d_data {string} - html малой корзины
     
    updateSmallCartAdaptiv : function(d_data){
        console.log(d_data);
        
        var total_line = $(d_data).find(".small-basket__total").html();
        
        
        $(".small-basket__total").html(total_line);
    }
    
    */
};
$(function(){EV.init(); });



// Переназначение перезагрузки товара при смене фактуры

/*
$(function(){
    if( typeof shop2 !== 'undefined' ){
        shop2.product._reload = function(node) {
    
            var $node = $(node);
            var kinds = shop2.product.getNodeData(node, 'kinds', true);
            var paramName = shop2.product.getNodeData(node, 'name');
            var paramValue = shop2.product.getNodeData(node, 'value');
            var $form = $node.closest('form');
            var form = $form.get(0);
            var meta;
            var kind_id;
            var product_id;
            var keys = {};
    
            if (kinds && $.type(paramName) !== 'undefined' && $.type(paramValue) !== 'undefined' && form) {
    
                meta = $form.find('input[name=meta]').val();
    
                product_id = $form.find('input[name=product_id]').val();
    
                $form.find('[name=submit]').prop('disabled', true);
    
                $form.find('select.shop2-cf>option, li.shop2-cf, li.shop2-color-ext-selected, ul.shop2-color-ext-list>li').each(function() {
                    var name = $(this).data('name');
                    if (name) {
                        keys[name] = true;
                    }
                });
    
                kind_id = shop2.product.findKindId(product_id, kinds, paramName, paramValue, meta, keys);
    
                if (shop2.mode == 'product') {
                  
                    
                    // 06.09.2017
                    // Подгрузка модификации без перезагрузки
                    var kind_url = document.location.href.replace(/\/product\/.+/, '/product/' + kind_id);
                    if (shop2.uri) {
                        kind_url = shop2.uri + '/product/' + kind_id;
                    }
                    
                    $.ajax({
                        url: kind_url,
                        data: {"products_only": 1},
                        success: function(res){
                            let h1 = "",
                                kind_html = res;
                            
                            $(".full-product").remove();    
                            $(".product-more-desc").remove();
                            
                            $(".new-product").replaceWith(kind_html);
                            EV.afterLoadKind();
                        }
                    })
    
                } else {
    
                    shop2.product.getProductListItem(product_id, kind_id, function(d, status) {
                        var cont, newCont, body;
                        if (status === 'success') {
    
                            cont = $node.closest('.shop2-product-item');
                            cont.hide();
    
                            body = $.trim(d.data.body);
                            newCont = $(body).insertBefore(cont);
    
                            cont.remove();
    
                            shop2.queue.heights();
                        }
    
                    });
    
                }
            }
    
        };
    };
});
*/

if( typeof shop2 !== 'undefined' ){
    // Клик по фактуре
    shop2.queue.colorPopup = function(){
        var popup = $('<div id="shop2-color-ext-popup"></div>');
        var close = $('<div id="shop2-color-ext-close"></div>');
        var list = $('<ul id="shop2-color-ext-list" class="shop2-color-ext-list"></ul>');
        var colors = null;
    
        popup.append(close);
        popup.append(list);
        $(document.body).append(popup);
    
        $.on('.shop2-color-ext-caption', {
    
            click: function() {
                var caption = $(this);
                var wrap = caption.closest('.shop2-color-ext-popup');
                var ul = wrap.find('.shop2-color-ext-list');
                var offset = caption.offset();
    
                colors = ul.children('li');
                list.html(ul.html());
    
                popup.css(offset).show();
    
                return false;
            }
    
        });
    
        /*Убрал touchstart, не работала lightgallary на адаптиве*/
    	/* 
    		ВЫБОР МОДИФИКАЦИИ ВО ВСПЛЫВАШЕ ПЕРЕД ДОБАВЛЕНИЕМ В КОРЗИНУ 
		*/
        $(document).on('click', '.shop2-color-ext-list li', function(event) {
        	console.log('Выбор модификации перед добавлением в корзину');
        	
            event.preventDefault();
            event.stopPropagation();
            /*
            console.log(event);
            console.log(event.target.nodeName, event.target.nodeName == "SPAN");
            console.log($(event.target).hasClass("texture_loupe"));
            */
            
            if (event.target.nodeName == "SPAN" && $(event.target).hasClass("texture_loupe")) {
                // Если клик по лупе - отменяем загрузку модификации
                console.log('Клик по лупе - отменяем загрузку модификации');
                return false;
            }
            
            var $this = $(this);
            var data = $this.data();
            var input = $this.parent().find('input.additional-cart-params');
            var isSelected = $this.is('.shop2-color-ext-selected');
    
            if (typeof data.kinds !== 'undefined' || input.length) {
                $this.addClass('shop2-color-ext-selected').siblings().removeClass('shop2-color-ext-selected');
    
    
    			if ($this.parents('div.remodal-content').length) {
    				// КЛИК БЫЛ ВНУТРИ ВСПЛЫВАШКИ
    				console.log('КЛИК БЫЛ ВНУТРИ ВСПЛЫВАШКИ')
    				
    				// ЕСЛИ ЕСТЬ ВЫБОР ИЗ РАЗНЫХ ПАРАМЕТРОВ
    				if ($("div.remodal-content ul.fakture").length > 1){
    					console.log('О, сложный вариант. Find: '+data.value)
    					var changed_ul = $(this).parents("ul.fakture").get(0);
    					$("div.remodal-content ul.fakture").each(function(){
    						if ($(this).get(0) != changed_ul) {
    							if ($(this).find("li.shop2-color-ext-selected").length == 0) {
    								// Нет выбранных вариантов
    								$(this).find("li").each(function(){
    									var k = ''+$(this).data('kinds')+'';
    									if (k.indexOf(data.kindId) != -1) {
    										$(this).addClass('shop2-color-ext-selected');
    										return false;
    									}
    								});
    							}
    							else{
    								$(this).find("li").removeClass("shop2-color-ext-selected");
    								$(this).find("li").each(function(){
    									var k = ''+$(this).data('kinds')+'';
    									if (k.indexOf(data.kindId) != -1) {
    										$(this).addClass('shop2-color-ext-selected');
    										return false;
    									}
    								});
    							}
    						}
    					});
    					
    				}
    			}
    
                if (input.length) {
                	// Записываем выбранную модификацию
                    input.val(data.value);
                    
                    console.log('Покажем допустимые варианты');
                } else {
                    if (!isSelected) {
                    	// Перезагружаем карточку
                        shop2.product._reload(this);
                    }
                }
    
            } else {
    			// Не смогли определить параметры кайнда
                var index = $this.index();
                var isPopup = !!$this.closest('#shop2-color-ext-popup').length;
                if (isPopup) {
                    $this.toggleClass('shop2-color-ext-selected');
                    colors.eq(index).toggleClass('shop2-color-ext-selected');
                    shop2.filter.toggle(data.name, data.value);
                    shop2.filter.count();
                }
            }
            return false;
        });
    
        $(document).on('click', function(e) {
            var target = $(e.target);
            var wrap = target.closest('#shop2-color-ext-popup');
    
            if (!wrap.get(0) || e.target == close.get(0)) {
                popup.hide();
            }
        });
    };
    
    
    // --------------------------------
    
    
    // Добавление в корзину 
    shop2.queue.addToCart = function() {

        $(document).on('click', '.shop2-product-btn', function(e) {

            var $this = $(this),
                $form = $this.closest('form'),
                form = $form.get(0),
                adds = $form.find('.additional-cart-params'),
                len = adds.length,
                i, el,
                a4 = form.amount.value,
                kind_id = form.kind_id.value;

            e.preventDefault();

            if (len) {
                a4 = {
                    amount: a4
                };

                for (i = 0; i < len; i += 1) {
                    el = adds[i];
                    if (el.value) {
                        a4[el.name] = el.value;
                    }
                }
            }

            shop2.cart.add(kind_id, a4, function(d) {

                $('#shop2-cart-preview').replaceWith(d.data);
                
                EV.loadSmallCart();

                if (d.errstr) {
                    shop2.msg(d.errstr, $this);
                } else {
                	// Товар успешно добавлен в корзину
                    shop2.msg(window._s3Lang.JS_ADDED, $this);
               
                    // carrotquest
                    var _name = $form.find('.product-block__name').text(), 
                    	_url = location.origin + $form.find('a.product-block__button-part').attr("href"), 
                    	_amount = form.amount.value || 1, 
                    	_img = location.origin + $form.find(".product-block__images img:first").attr("src");
                    
                    if (shop2.mode == "product") {
                    	_url = location.href;
                    	_name = $("h1:first").text();
                    	_img = $(".new-product__main-slider-item:first img:first").length ? location.origin + $(".new-product__main-slider-item:first img:first").attr("src") : '';
                    	
                    }
                    
                    carrotquest.track('$cart_added', {
					    '$name': _name,
					    '$url': _url,
					    '$amount': parseInt(_amount),
					    '$img': _img
					});
                }

                if (d.panel) {
                    $('#shop2-panel').replaceWith(d.panel);
                }
            });

        });
    };


    shop2.queue.lazyLoad = function () {
        
        var $document = $(document),
            $window = $(window),
            blocked = false,
            products = $('.product-container');

        function path(url, param, value) {
            return url + (~url.indexOf('?') ? '&' : '?') + param + '=' + value;
        }

        if (shop2.my.lazy_load_subpages && products.get(0)) {
            $document.scroll(function() {
                var pagelist = $('.shop2-pagelist:last');
                var next = pagelist.find('.active-num').next().find('a');

                if (!next.length) {
                    return;
                }

                pagelist.addClass('show');
                var offsetTop = pagelist.offset().top;
                pagelist.removeClass('show');

                if ($document.scrollTop() + $window.height() >= offsetTop && !blocked && next.get(0)) {
                    blocked = true;

                    $.get(path(next.attr('href'), 'products_only', 1), function(data) {
                        pagelist.after('<hr />' + data);
                        pagelist = $('.shop2-pagelist:last');
                        pagelist.find('a').each(function() {
                            var $this = $(this),
                                href = $this.attr('href');
                            $this.attr('href', href.replace(/[&|\?]*products_only=[^&]/, ''));
                        });

                        shop2.queue.heights();

                        blocked = false;
                    });
                }
            });
        }
    };

};