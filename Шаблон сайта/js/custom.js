(function ($) {
    const templateParse = function (str, ph, values) {
            if (typeof str === 'undefined') {
                return '';
            }

            if (typeof ph !== 'object') {
                ph = [ph];
            }

            for (const k in ph) {
                if (ph.hasOwnProperty(k)) {
                    let r;
                    const v = ph[k];

                    if (typeof values === 'object') {
                        r = typeof values[k] !== 'undefined' ? values[k] : '';
                    } else {
                        r = values;
                    }

                    str = str.replace(new RegExp('{{' + v + '}}', 'g'), r);
                }
            }

            return str.replace(/{{[\w\S]*}}/g, '');
        },
        mainMenu = $('#site-main-menu'),
        subCatsContainer = $('#tpl-menu-subcategories-container'),
        catGroup = $('#tpl-menu-subcategory-group'),
        catGroupItem = $('#tpl-menu-subcategory-group-item'),
        seriesList = $('#tpl-menu-menu-series-list'),
        seriesListItem = $('#tpl-menu-menu-series-list-item'),
        // mobile
        mobileMenu = $('.modal_header_catalog'),
        mobileCatalog = $('#tpl-menu-mobile-catalog'),
        mobileCatalogCategory = $('#tpl-menu-mobile-catalog-category'),
        mobileCatalogCategoryGroup = $('#tpl-menu-mobile-catalog-category-group'),
        mobileCatalogCategoryGroupItem = $('#tpl-menu-mobile-catalog-category-group-item'),
        mobileCatalogSeries = $('#tpl-menu-mobile-catalog-series'),
        mobileCatalogSeriesItem = $('#tpl-menu-mobile-catalog-series-item');

    $(function () {
        $.ajax({
            url: "ajax/main_menu.php",
            data: {},
            type: 'POST',
            beforeSend: function () {

            },
            success: function (response) {
                let subCats = '';
                let mobileCats = '';
                let mobileSeries = '';

                $.each(response, function (k, catData) {
                    let categories = '';
                    let series = '';
                    let mobileCatItems = '';

                    $.each(catData['children'], function (k2, filterCatData) {
                        let items = '';
                        let mobileCatGroupItems = '';

                        $.each(filterCatData['children'], function (k3, filterVarData) {
                            items += templateParse(catGroupItem.html(), ['id', 'title', 'url'], [filterVarData['id'], filterVarData['title'], filterVarData['url']]);
                            mobileCatGroupItems += templateParse(mobileCatalogCategoryGroupItem.html(), ['id', 'title', 'url'], [catData['id'] + '-' + filterVarData['id'], filterVarData['title'], filterVarData['url']]);

                            let sItems = '';
                            let sMobileItems = '';

                            $.each(filterVarData['children'], function (k4, seriaData) {
                                sItems += templateParse(seriesListItem.html(), ['img', 'url', 'title', 'cnt'], [seriaData['img'], seriaData['url'], seriaData['title'], seriaData['cnt']]);
                                sMobileItems += templateParse(mobileCatalogSeriesItem.html(), ['img', 'url', 'title', 'cnt'], [seriaData['img'], seriaData['url'], seriaData['title'], seriaData['cnt']]);
                            });

                            if (sItems !== '') {
                                series += templateParse(seriesList.html(), ['items', 'parent'], [sItems, filterVarData['id']]);
                                mobileSeries += templateParse(mobileCatalogSeries.html(), ['items', 'parent'], [sMobileItems, catData['id'] + '-' + filterVarData['id']]);
                            }
                        });

                        categories += templateParse(catGroup.html(), ['title', 'items'], [filterCatData['title'], items]);
                        mobileCatItems += templateParse(mobileCatalogCategoryGroup.html(), ['title', 'items'], [filterCatData['title'], mobileCatGroupItems]);
                    });

                    subCats += templateParse(subCatsContainer.html(), ['categories', 'series', 'parent', 'parent_url'], [categories, series, catData['id'], catData['url']]);
                    mobileCats += templateParse(mobileCatalogCategory.html(), ['id', 'url', 'img', 'title', 'items'], [catData['id'], catData['url'], catData['img'], catData['title'], mobileCatItems]);
                });

                mainMenu.find('.menu_categories').append(subCats);

                const mobile = templateParse(mobileCatalog.html(), ['categories', 'series'], [mobileCats, mobileSeries]);

                mobileMenu.append(mobile);
            },
            complete: function (jqXHR, textStatus) {

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.info(textStatus + ' ' + errorThrown);
            }
        });

        /**
         * Desktop
         */
        $('.button--catalog_menu').click(function (e) {
            e.preventDefault();

            $('body').toggleClass('menu-opened');
            mainMenu.toggleClass('menu_catalog_over--open');
            $(this).toggleClass('button--catalog_menu-open');
        });

        let menuCategoryTimeout;

        mainMenu.find('.menu_category_item').mouseenter(function () {
            if (menuCategoryTimeout) {
                clearTimeout(menuCategoryTimeout);
                menuCategoryTimeout = false;
            }
            mainMenu.find('.menu_category_item--active').removeClass('menu_category_item--active');
            $(this).addClass('menu_category_item--active');
            mainMenu.find('.menu_subcategories--active').removeClass('menu_subcategories--active');
            mainMenu.find('.menu_subcategories[data-parent-id="' + $(this).data('id') + '"]').addClass('menu_subcategories--active');
        });

        mainMenu.find('.menu_category_item').mouseleave(function (e) {
            if (e.pageX < $(this).get(0).getBoundingClientRect().x + $(this).get(0).getBoundingClientRect().width) {
                menuCategoryTimeout = setTimeout(() => {
                    $(this).removeClass('menu_category_item--active');
                    mainMenu.find('.menu_subcategories--active').removeClass('menu_subcategories--active');
                }, 10000);
            }
        });

        let menuSubcategoryTimeout;
        let menuSubcategoryItemTimeout;

        mainMenu.on('mouseenter', '.menu_subcategory_item', function () {
            if (menuSubcategoryTimeout) {
                clearTimeout(menuSubcategoryTimeout);
                menuSubcategoryTimeout = false;
            }

            menuSubcategoryItemTimeout = setTimeout(() => {
                mainMenu.find('.menu_subcategory_item--active').removeClass('menu_subcategory_item--active');
                $(this).addClass('menu_subcategory_item--active');

                mainMenu.find('.menu_series--active').removeClass('menu_series--active');
                mainMenu.find('.menu_series[data-parent-id="' + $(this).data('id') + '"]').addClass('menu_series--active');
                menuSubcategoryItemTimeout = false;
            }, 100);
        });

        mainMenu.on('mouseleave', '.menu_subcategory_item', function (e) {
            if (menuSubcategoryItemTimeout) {
                clearTimeout(menuSubcategoryItemTimeout);
                menuSubcategoryItemTimeout = false;
                return;
            }

            if (e.pageX < $(this).get(0).getBoundingClientRect().x + $(this).get(0).getBoundingClientRect().width) {
                menuSubcategoryTimeout = setTimeout(() => {
                    $(this).removeClass('menu_subcategory_item--active');
                    mainMenu.find('.menu_series--active').removeClass('menu_series--active');
                }, 10000);
            }
        });

        mainMenu.on('mouseleave', '.menu_series', function (e) {
            menuSubcategoryTimeout = setTimeout(() => {
                $(this).removeClass('menu_series--active');
                mainMenu.find('.menu_subcategory_item--active').removeClass('menu_subcategory_item--active');
            }, 10000);
        });

        mainMenu.on('mouseleave', '.menu_subcategories', function (e) {
            menuCategoryTimeout = setTimeout(() => {
                $(this).removeClass('menu_subcategories--active');
                mainMenu.find('.menu_category_item--active').removeClass('menu_category_item--active');
            }, 10000);
        });


        /**
         * Mobile
         */

        mobileMenu.on('click', '.mobile-catalog__link', function (e) {
            const item = $(this).closest('.mobile-catalog__item');
            const menu = $(this).closest('.mobile-catalog');

            if (item.hasClass('mobile-catalog__item--back')) {
                e.preventDefault();

                menu.find('.mobile-catalog__item--active').removeClass('mobile-catalog__item--active');
                if (!menu.hasClass('mobile-catalog--children')) $('#header_but_menu').click();
                menu.removeClass('mobile-catalog--children');
            } else if (!item.hasClass('mobile-catalog__item--active') && item.find('.mobile-catalog__group').length) {
                e.preventDefault();

                item.addClass('mobile-catalog__item--active');
                menu.addClass('mobile-catalog--children');
            }
        });

        mobileMenu.on('click', '.mobile-catalog__group-header', function (e) {
            e.preventDefault();

            $(this).closest('.mobile-catalog__group').toggleClass('mobile-catalog__group--active');
        });

        mobileMenu.on('click', '.mobile-catalog__group-link', function (e) {
            const menu = $(this).closest('.mobile-catalog'),
                series = menu.find('.mobile-catalog-series[data-parent-id="' + $(this).parent().data('id') + '"]');

            if (series.length) {
                e.preventDefault();
                menu.addClass('mobile-catalog--series');
                series.show();
            }
        });

        mobileMenu.on('click', '.mobile-catalog-series__back', function (e) {
            e.preventDefault();

            const menu = $(this).closest('.mobile-catalog');
            menu.removeClass('mobile-catalog--series');
            $(this).closest('.mobile-catalog').find('.mobile-catalog-series').hide();
        });
    });

    $('.prod_tabs_list .amazing-link[data-href]').on('click', function (e) {
        if ($(this).closest('li').hasClass('active') && $(this).data('href').length) {
            e.preventDefault();
            window.location = $(this).data('href');
        }
    });

    $('.product_scu_item .product_scu_item_img')
        .on('mouseenter', function () {
            if ($(window).width() > 1024) {
                let $hoverImage = $('.product_scu_item_img_hover');
                if (!$hoverImage.length) {
                    $('<img class="product_scu_item_img_hover" style="display: none;">').appendTo($('body'));
                    $hoverImage = $('.product_scu_item_img_hover');
                }
                $hoverImage.attr('src', $('img', this).attr('data-src'));

                $hoverImage.stop().fadeIn(150);
            }
        })
        .on('mouseleave', function () {
            let $hoverImage = $('.product_scu_item_img_hover');
            if ($hoverImage.length) {
                $hoverImage.stop().fadeOut(150);
            }
        })
        .on('mousemove', function (e) {
            let $hoverImage = $('.product_scu_item_img_hover');
            $hoverImage.css({
                left: e.clientX,
                top: e.clientY,
            });
        });

    function moveProductPrice(e) {
        if (e.matches) {
            $('.prod_right .product_price > *').appendTo('.prod_left_right .product_price');
        } else {
            $('.prod_left_right .product_price > *').appendTo('.prod_right .product_price');
        }
    }
    const mediaQueryList = window.matchMedia('(min-width: 1024px)');
    mediaQueryList.addEventListener('change', moveProductPrice);
    moveProductPrice({matches: window.innerWidth >= 1024});


    let reviewsBlockHeading = 0;
    let reviewsBlockText = 0;
    $('.reviews-block__item').each(function() {
        let lineHeight = parseFloat($(this).css('line-height'));
        if ($('.reviews-block__text', this).height() >= lineHeight * 9) {
            $(this).addClass('clamp');
            $(this).append('<button class="reviews-block__toggle" data-more="Показать полностью" data-less="Спрятать"></button>');
        }
        reviewsBlockHeading = Math.max(reviewsBlockHeading, parseFloat($('.reviews-block__heading', this).height()));
        reviewsBlockText = Math.max(reviewsBlockText, parseFloat($('.reviews-block__text', this).height()));
    });
    $('.reviews-block__heading').height(reviewsBlockHeading);
    $('.reviews-block__item:not(.clamp) .reviews-block__text').height(reviewsBlockText);

    $(document).on('click', '.reviews-block__toggle', function(e) {
        e.preventDefault();
        $(this).closest('.reviews-block__item').toggleClass('show-more');
        if (window.reviewsListSlider) window.reviewsListSlider.refresh();
    });
})(jQuery);