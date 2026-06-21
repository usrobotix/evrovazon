"use strict";

var myMap           = {};
var placemarks      = [];
var myGeoCollection = {};

var mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Touch/i.test(window.navigator.userAgent)) ? true : false;

$(function () {

var classes = {
	offices      : $('.amazing-block__list-item'),
	descriptions : $('.amazing-block__description-wrapper'),
	filterGo     : $('select.js-filter-go, a.js-filter-go'),
	filterClear  : $('.js-clear-filter')
};

var myBalloonLayout = null;

function filterGo (event) {
	event.preventDefault();
	
	var type          = $(this).data('filter-type');
	var name          = $(this).find(':selected').val() || $(this).data(type);
	var anchor        = '[data-' + type + '="' + name + '"]';
	var activeOffices = name == "ALL" ? classes.offices : classes.offices.filter(anchor);
	
	classes.offices.hide();
	activeOffices.show();
	disableActiveOffice();
	setMapCollection(activeOffices);
}

function filterClear () {
	classes.offices.show();
	classes.filterGo.find('option:contains("Все")')
                    .prop({"selected" : true})
                    .end()
                    .trigger('refresh');
                              
	disableActiveOffice();
	setMapCollection(classes.offices);
}

function disableActiveOffice () {
	classes.offices.removeClass('amazing-block__list-item--active');
	classes.descriptions.hide();
}

function setMapCollection (offices) {
	myGeoCollection.removeAll();

	placemarks.forEach(function(placemark, i){
		var placemarkCoords = placemark.options.get('coord').join(',');

		$.each(offices, function (i, office) {
			if ($(office).data('coords') == placemarkCoords) {
				myGeoCollection.add(placemark);
			}
		});
	});

	myMap.geoObjects.add(myGeoCollection);
	myMap.setBounds(myGeoCollection.getBounds(), {
		checkZoomRange:true,
		useMapMargin: true,
		zoomMargin: 3,
	}).then(function () {
		if (myMap.getZoom() > 6) {
			myMap.setZoom(6);
		}	
	});
}

function newPlacemark ($this){
    var coords          = $this.data('coords').split(","),
        coordsstring    = $this.data('coords'),	
        country         = $this.data('country'),
        city            = $this.data('city'),
        type            = $this.data('office-type'),
        itemId          = $this.data('card-index'),
        balloonHeader   = $this.find('.amazing-block__tab-title').html(),
        hintContent     = $this.find('.amazing-block__information-item--firm').text(),
        typeIcon       = '/images/map_icon1.svg';
        
	switch (type) {
		case 'sales_office':
			typeIcon = "/images/map_icon2.svg";
			break;
  		case 'distributor':
  			typeIcon = "/images/map_icon3.svg";
			break;
	};
	
	var balloonContent = [
        '<div class="map-block__information">',
            '<div class="map-block__information-item">',
                $this.find('.amazing-block__information-item--city').html(),
            '</div>',
            '<div class="map-block__information-item">',
                $this.find('.amazing-block__information-item--firm').html(),
            '</div>',
            '<div class="map-block__information-item">',
                $this.find('.amazing-block__information-item--address').html(),
            '</div>',
            '<div class="map-block__information-item">',
                $this.find('.amazing-block__information-item--phone').html(),
            '</div>',
            '<div class="map-block__information-item">',
                $this.find('.amazing-block__information-item--mail').html(),
            '</div>',
        '</div>',
	].join('');
	
    var placemark = new ymaps.Placemark(coords, {
            balloonHeader  : balloonHeader,
            balloonContent : balloonContent,
            hintContent    : hintContent,
            itemId         : itemId,
        },
        {
            iconImageHref   : typeIcon,
            iconImageSize   : [35, 44],
            iconImageOffset : [-17, -44],
            iconLayout      : 'default#image',
            coord           : coords,
            country         : country,
	        city            : city,
	        type            : type,
	        itemId          : itemId,
	        balloonLayout   : myBalloonLayout
        }
    ); 
    
    placemark.events.add('click', function (e) {
    	var itemId = e.get('target').options.get('itemId');
		classes.offices.filter('[data-card-index="' + itemId + '"]').trigger('click');
	});

    return placemark;
}

function initMap () {
	myMap = new ymaps.Map('ya-map', {
	    center: [55.76, 37.64],
	    zoom: 10,
        behaviors: ["default", "scrollZoom"],
        controls: ['zoomControl'],
	}, {
	    searchControlProvider: 'yandex#search'
	});

	if (mobile){
		myMap.behaviors.disable('drag');
	}
	
	myGeoCollection = new ymaps.GeoObjectCollection();

	classes.offices.each(function(){
		//placemarks.push(newPlacemark($(this)));
	});
	
	setMapCollection(classes.offices);

	// события фильтра
	classes.filterGo.on('change click', filterGo);
	classes.filterClear.on('click', filterClear);
}

// карта готова
ymaps.ready(function () {
	
	// кастомная разметка балуна
	myBalloonLayout = ymaps.templateLayoutFactory.createClass([
        '<div class="map-block__content">',
            '<div class="map-block__content-close"></div>',
            '<div class="map-block__content-title">',
                '<div class="svg-icon svg-icon--logo_icon"><svg class="svg-icon__link"><use xlink:href="#logo_icon" /></svg></div>',
            '</div>',
            '$[properties.balloonContent]',
	        '<div class="map-block__content-note map-block__content-note--2">',
	            '$[properties.balloonHeader]',
	        '</div>',
	        '<div class="site-btn3 map-block__content-more" data-item-id="$[properties.itemId]" href="#">Подробнее <span class="svg-icon svg-icon--button_icon"><svg class="svg-icon__link"><use xlink:href="#button_icon" /></svg></span></div>',
	        '<div class="map-block__map-button"> <img class="opened-icon" src="/d/1621441/t/images/files/map_icon_open.svg" alt=""> </div>',
        '</div>',
 	].join(''),
	{
	    /*Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.*/
	    build: function () {
	        this.constructor.superclass.build.call(this);

	        this._$element = $('.map-block__content', this.getParentElement());
	
	        this.applyElementOffset();
	
	        this._$element
	        	.find('.map-block__content-close')
	            .on('click', $.proxy(this.onCloseClick, this));

	        this._$element
	        	.find('.map-block__content-more')
        		.on('click', function (e) {
		            var tabBlockOffset  = 0;
		            var tabBlock = $(this).attr('data-item-id');
		            var $listItem = $('.amazing-block__list-item[data-card-index="' + $(this).data('item-id') + '"]');
		        
		            $listItem.click();
		        
		            tabBlockOffset = $listItem.offset().top - 82 + $listItem.outerHeight();
		        
		            setTimeout(function () {
		        
		                $('html,body').animate({'scrollTop': tabBlockOffset}, 1000);
		        
		            },500);
		        
		            event.preventDefault();     
		        });
	
	    },
	    
	    onSublayoutSizeChange: function () {
	        MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
	
	        if(!this._isElement(this._element)) {
	            return;
	        }
	
	        this.applyElementOffset();
	        this.events.fire('boundschange');
	    },
	
	    /*Удаляет содержимое макета из DOM.*/
	    clear: function () {
	        this._$element.find('.close')
	            .off('click');
	
	        this.constructor.superclass.clear.call(this);
	    },            
	
	    /*Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.*/
	    applyElementOffset: function () {
	        this._$element.css({
	            left: -186, 
	            top: -(this._$element[0].offsetHeight + 20) // 10 - высота ножки контента балуна
	        });
	    },
	
	    /* Закрывает балун при клике на крестик, кидая событие "userclose" на макете. */
	    onCloseClick: function (e) {
	        e.preventDefault();
	        this.events.fire('userclose');
	    },
	
	    getClientBoundingRect: function () {
	        var left =  this._$element.position().left,
	            top =  this._$element.position().top;
	
	        return [
	            [left, top], [
	                left +  this._$element[0].offsetWidth,
	                top +  this._$element[0].offsetHeight + 20 // 10 - высота ножки контента балуна
	            ]
	        ];
	    },
	    /**
         * Используется для автопозиционирования (balloonAutoPan).
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
         * @function
         * @name getClientBounds
         * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
         */
        getShape: function () {
            if(!this._isElement(this._$element)) {
                return MyBalloonLayout.superclass.getShape.call(this);
            }

            var position = this._$element.position();

            return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                [position.left, position.top], [
                    position.left + this._$element[0].offsetWidth,
                    position.top + this._$element[0].offsetHeight
                ]
            ]));
        },
	
	    /* Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).*/
	    _isElement: function (element) {
	        return element && element[0];
	    }
	});

	// инициализация карты
	initMap();
});


});