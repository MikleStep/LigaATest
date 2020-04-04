import { init as popupInit} from './popup.js';
import { init as formInit } from './form.js';

$(document).ready(function() {
  popupInit();
  formInit();
});

$(document).ready(function () {
  //
  // init token field
  // var input = document.querySelector('#tokenfield'),
  //     tagify = new Tagify(input, {
  //         whitelist : ['спорт', 'машина', 'Луганск'],
  //         dropdown : {
  //             classname : 'color-blue',
  //             enabled   : 0,         // show the dropdown immediately on focus
  //             position  : 'text',    // place the dropdown near the typed text
  //             closeOnSelect : false, // keep the dropdown open after selecting a suggestion
  //         },
  //         maxTags:4,
  //         placeholder: 'zzzz',
  //     });
  //
  // tagify
  //     .on('add', e => tagify[placeholder] = 'zz');


  //disable enter keypress at form
  $('.disabled-enter').on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();
      return false;
    }
  });

  function dotsAnimation() {
    let dots = $('.loading-dots span');
    let a = 0;
    let timerId = setInterval(function () {
      if ($('.loading-dots span.active').index() === dots.length - 1 || a === 0) {
        $('.loading-dots span').eq(0).addClass('active').siblings().removeClass('active');
        a++;
      } else {
        $('.loading-dots span.active').next().toggleClass('active').siblings().removeClass('active');
      }
    }, 500);

    setTimeout(() => {
      clearInterval(timerId);
    }, 8000);
  }


  // next card onclick
  let nextButtons = document.querySelectorAll('.type-submit.type-submit_type_next > *');
  for (button of nextButtons) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      $('.header__social-text').hide();
      let currentCard = this.closest('.registration__card');
      let nextCard = currentCard.nextSibling.nextSibling;
      if (nextCard.classList.contains('registration__card_type_loading')) {
        dotsAnimation();
        currentCard.classList.add('disabled');
        $(nextCard).fadeIn('slow').addClass('active');
        setTimeout(function () {
          let nextNextCard = nextCard.nextSibling.nextSibling;
          console.log(nextNextCard);
          nextCard.classList.remove('active');
          $(nextNextCard).fadeIn('slow').addClass('active');
          currentCard.parentNode.classList.add('next-area');
        }, 3000); // Привет, Джон
      }
      if (currentCard.parentNode.classList.contains('next-area')) {
        currentCard.parentNode.classList.add('last-area');
      }
      currentCard.classList.add('disabled');
      $(nextCard).fadeIn('slow').addClass('active');
      $('html,body').animate({
          scrollTop: $('.registration__quiz').offset().top - 40
        },
        '0');
    }, false);

  }


  //faq

  let faqButts = document.querySelectorAll('.faq__wrap ul li > a');
  for (let i = 0; i < faqButts.length; i++) {
    faqButts[i].addEventListener('click', function (e) {
      e.preventDefault();
      $(this).parents('li').parent().find('.active').find('.faq__hidden').slideUp();
      $(this).parents('li').find('.faq__hidden').slideToggle('slow').parent().toggleClass('active').siblings().removeClass('active');
    }, false);
  }

  // tokenfield focus
  let tokenfield = document.getElementById('tokenfield');
  tokenfield.onfocus = function () {
    $('.tags-list').addClass('active');
  };

  tokenfield.onblur = function () {
    $('.tags-list').removeClass('active');
  };
  ScrollReveal().reveal('.reveal');
});

$('#first-submit').on('click', function firstStepError() {
  var brand = $('#form__input--brand').val();
  var sphere = $('#form__input--sphere').val();
  var error = $('.form__error--first');
  var example = $('.form__example');
  var err_text = '';
  if (sphere == '' && brand == '') {
    err_text = '<p>Введите навзание вашего бренда для его проверки</p><p>Начните вводить сферу деятельности из предложенных вариантов выберите наиболее подходящую</p>';
    error.html(err_text);
    example.fadeOut(300);
    error.delay(300).fadeIn(300);
    $('.form__wrapper').addClass('active');
    return false;
  }
  if (brand == '' && sphere != '') {
    err_text = '<p>Введите навзание вашего бренда для его проверки</p>';
    error.html(err_text);
    example.fadeOut(300);
    error.delay(300).fadeIn(300);
    $('.form__wrapper').addClass('active');
    return false;
  }
  if (brand != '' && sphere == '') {
    err_text = '<p>Начните вводить сферу деятельности из предложенных вариантов выберите наиболее подходящую</p>';
    error.html(err_text);
    example.fadeOut(300);
    error.delay(300).fadeIn(300);
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
  var error = $('.form__error--second');
  var err_text = '';
  if (name == '' && tel == '') {
    err_text = '<p>Введите ваше имя, чтобы мы знали как к вам обращаться</p><p>Введите ваш телефон, чтобы мы с вами связаться</p>';
    error.html(err_text);
    example.fadeOut(300);
    error.delay(300).fadeIn(300);
    $('.form__wrapper').addClass('active');
    console.log('Сука работай!');
    return false;
  }
  if (name == '') {
    err_text = '<p>Введите ваше имя, чтобы мы знали как к вам обращаться</p>';
    error.html(err_text);
    example.fadeOut(300);
    error.delay(300).fadeIn(300);
    $('.form__wrapper').addClass('active');
    return false;
  }
  if (tel == '' || tel.indexOf('_') > 0) {
    err_text = '<p>Введите ваш телефон, чтобы мы с вами связаться</p>';
    error.html(err_text);
    example.fadeOut(300);
    error.delay(300).fadeIn(300);
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
$('input').focus(function () {
  $('.form__example').css('color', '#4C79C9');
});
$('input').blur(function () {
  $('.form__example').css('color', 'rgba(0, 0, 0, 0.4)');
});

$(document).ready(function () {
  $('.bootstrap-tagsinput input').focus(function () {
    $('.mobile__tags-list').addClass('active');
    $(this).attr('placeholder', '');
  });
  $('.mobile__tags-list li').click(function () {
    var text = $(this).text();
    var tag = $('<span class="tag label label-info"></span>');
    $(tag).text(text).append('<span data-role="remove" class="tags__remove"></span>').appendTo($('.bootstrap-tagsinput'));
  });
  $('.mobile__tags-list').click(function () {
    $(this).removeClass('active');
    $('.bootstrap-tagsinput input').css('height', '0');
  });
  $('.tags__remove').click(function () {
    $(this).unwrap();
  });

});