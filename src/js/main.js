import { init as popupInit} from './popup.js';
import { init as formInit } from './form.js';

$(document).ready(function() {
  popupInit();
  formInit();
});

$('#first-submit').on('click', function firstStepError() {
  var brand = $('#form__input--brand').val();
  var sphere = $('#form__input--sphere').val();
  var error = $(".form__error--first");
  var err_text = "";
  if (sphere == '' && brand == '') {
    err_text = "<p>Введите навзание вашего бренда для его проверки</p><p>Начните вводить сферу деятельности из предложенных вариантов выберите наиболее подходящую</p>";
    error.html(err_text);
    error.fadeIn(300);
    $('.form__wrapper').addClass('active');
    return false;
  }
  if (brand == '' && sphere != '') {
    err_text = "<p>Введите навзание вашего бренда для его проверки</p>";
    error.html(err_text);
    error.fadeIn(300);
    $('.form__wrapper').addClass('active');
    return false;
  }
  if (brand != '' && sphere == '') {
    err_text = "<p>Начните вводить сферу деятельности из предложенных вариантов выберите наиболее подходящую</p>";
    error.html(err_text);
    error.fadeIn(300);
    $('.form__wrapper').addClass('active');
    return false;
  }
  else{
    error.fadeOut(300);
    $('.form__wrapper').removeClass('active');
    $('.form__first').fadeOut(300);
    $('.form__second').delay(300).fadeIn(300);
    return true
  }
  
});

$('#second-submit').on('click', function secondStepError() {
  var name = $('#form__input--name').val();
  var tel = $('#form__input--tel').val();
  var error = $(".form__error--second");
  var err_text = "";
  if (name == '' && tel == '') {
    err_text = "<p>Введите ваше имя, чтобы мы знали как к вам обращаться</p><p>Введите ваш телефон, чтобы мы с вами связаться</p>";
    error.html(err_text);
    error.fadeIn(300);
    $('.form__wrapper').addClass('active');
    console.log('Сука работай!');
    return false;
  }
  if (name == '') {
    err_text = "<p>Введите ваше имя, чтобы мы знали как к вам обращаться</p>";
    error.html(err_text);
    error.fadeIn(300);
    $('.form__wrapper').addClass('active');
    return false;
  }
  if (tel == '' || tel.indexOf('_') > 0) {
    err_text = "<p>Введите ваш телефон, чтобы мы с вами связаться</p>";
    error.html(err_text);
    error.fadeIn(300);
    $('.form__wrapper').addClass('active');
    return false;
  } else {
    error.fadeOut(300);
    $('.form__wrapper').removeClass('active');
    $('.form__second').fadeOut(300);
    $('.form__third').delay(300).fadeIn(300);
    return true
  }

});