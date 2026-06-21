$(document).ready(function() {});

function AjaxFormRequest(result_id, form_id, url) {
    $form_box = $('#' + result_id);
    $form = $('#' + form_id);
	var $that = $('#' + form_id);
    if ($form.data('lacation') !== '') {
        var locate = $form.data('lacation');
    }

    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    };
    var name_input = $("#name_" + form_id);
    var phone_input = $("#phone_" + form_id);
    var email_input = $("#email_" + form_id);
    var text = $("#text_" + form_id);
    var status_name = false;
    var status_phone = false;
    var status_email = false;
    var status_textarea = false;
    if ($(name_input).hasClass('required')) {
        var nameval = $("#name_" + form_id).val();
        var namelen = nameval.length;
        if (namelen < 3 || nameval == 'Как вас зовут?' || nameval == '' || nameval == 'Василий') {
            name_input.parent().addClass('no');
            name_input.parent().removeClass('yes');
            $form.children('.form_error_name').html('Укажите Ваше имя');
            $form_box.addClass('shake');
        } else {
            $form.children('.form_error_name').html('');
            name_input.parent().removeClass('no');
            name_input.parent().addClass('yes');
            status_name = true;
        }
    } else {
        status_name = true;
    }
    if ($(phone_input).hasClass('required')) {
        var phoneval = $("#phone_" + form_id).val();
        var phonelen = phoneval.length;
        if (phonelen <= 5 || phoneval == 'Номер телефона' || phoneval == '+ 7 921 000 00 00' || phoneval == '') {
            phone_input.parent().addClass('no');
            phone_input.parent().removeClass('yes');
            $form.children('.form_error_phone').html('Укажите Ваш номер телефона');
            $form_box.addClass('shake');
        } else {
            $form.children('.form_error_phone').html('');
            phone_input.parent().addClass('yes');
            phone_input.parent().removeClass('no');
            status_phone = true;
        }
    } else {
        status_phone = true;
    }
    if ($(email_input).hasClass('required')) {
        var emailval = $("#email_" + form_id).val();
        var emaillen = emailval.length;
        if ((emaillen >= 6) & (emailval != 'Ваш Email') & (emailval != 'hello@mail.ru') & (emailval != 'info@marketicus.ru') & (emailval != '') & (isValidEmailAddress(emailval))) {
            $form.children('.form_error_email').html('');
            email_input.parent().removeClass('no');
            email_input.parent().addClass('yes');
            status_email = true;
        } else {
            email_input.parent().addClass('no');
            email_input.parent().removeClass('yes');
            $form.children('.form_error_email').html('Укажите Ваш email корректно');
            $form_box.addClass('shake');
        }
    } else {
        status_email = true;
    }
    if ($(text).hasClass('required')) {
        var textarea_val = $("#text_" + form_id).val();
        var textarea_len = textarea_val.length;
        if ((textarea_len >= 3) & (textarea_val != 'Ссылка на сайт')) {
            $form.children('.form_error_textarea').html('');
            text.parent().removeClass('no');
            text.parent().addClass('yes');
            status_textarea = true;
        } else {
            text.parent().addClass('no');
            text.parent().removeClass('yes');
            $form.children('.form_error_textarea').html('Заполните текстовое поле');
            $form_box.addClass('shake');
        }
    } else {
        status_textarea = true;
    }
    if ((status_name == true) & (status_phone == true) & (status_email == true) & (status_textarea == true)) {
        //ga('send', 'event', 'form', 'send');
		//gtag('event','formsend', {event_category:'form', event_action:'send'});					
        /* yaCounter32601330.reachGoal('FORMSEND');
		fbq('track', 'CompleteRegistration', {
			value: 1.00,
			currency: 'USD'
		}); */
        /* jQuery.ajax({
            url: url,
            type: "POST",
            dataType: "html",
            data: jQuery("#" + form_id).serialize(),
            success: function(response) {
                document.getElementById(result_id).innerHTML = response;
                if (locate) {
                    window.location.href = locate;
                }
            },
            error: function(response) {
                document.getElementById(result_id).innerHTML = "Ой... ошибочка!";
            }
        }); */
		formData = new FormData($that.get(0));
		jQuery.ajax({
            url: url,
            type: "POST",
			contentType: false, 
			processData: false, 					
            dataType: "html",
        	data: jQuery("#" + form_id).serialize(),
			data: formData,
            success: function(response) {
               
				document.getElementById(result_id).innerHTML = response;
                
            },
            error: function(response) {
				alert('no');
                document.getElementById(result_id).innerHTML = "Ой... ошибочка!";
            }
        });
		
		

    }
    setTimeout(function() {
        $form_box.removeClass('shake');
    }, 1000);
    return false;
};

function check(id, value, num) {
    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    };
    var name_input = $("#" + id);
    var val_input = $(name_input).val();
    if (name_input.attr('type') == 'email') {
        if (isValidEmailAddress(val_input)) {
            name_input.parent().addClass('yes');
            name_input.parent().removeClass('no');
        } else {
            name_input.parent().addClass('no');
            name_input.parent().removeClass('yes');
        }
    } else {
        if (value.length < num) {
            name_input.parent().addClass('no');
            name_input.parent().removeClass('yes');
        } else {
            name_input.parent().addClass('yes');
            name_input.parent().removeClass('no');
        }
    }
};