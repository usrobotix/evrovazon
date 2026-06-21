"use strict";

var mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Touch/i.test(window.navigator.userAgent)) ? true : false;

$(function () {
    $('.contacts__item-title').on('click', function(e) {
        $(this).toggleClass('active');
        $(this).next('.contacts-block').slideToggle();
    });

    ymaps.ready(function () {
        $('.contacts-block__map').each(function(){
            var coords = $(this).attr('data-coord').split(','),
                typeIcon       = '/images/map_icon1.svg';

            var myMobileMap = new ymaps.Map(this, {
                center: coords,
                zoom: 15,
                behaviors: ["default", "scrollZoom"],
                controls: ['zoomControl'],
            }, {
                searchControlProvider: 'yandex#search'
            });

            if (mobile){
                myMobileMap.behaviors.disable('drag');
            }

            var placemark = new ymaps.Placemark(coords, {},
                {
                    iconImageHref   : typeIcon,
                    iconImageSize   : [35, 44],
                    iconImageOffset : [-17, -44],
                    iconLayout      : 'default#image',
                    coord           : coords,
                }
            );
            myMobileMap.geoObjects.add(placemark);
        });
    });
});