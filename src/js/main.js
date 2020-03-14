import { init as popupInit} from './popup.js';
import { init as formInit } from './form.js';
import { firstValid as firstform } from './form.js';
import { secondValid as secondform} from './form.js';

$(document).ready(function() {
  popupInit();
  formInit();
});
$('.form__first').on('mouseout', function () {
  firstform();
})
$('.form__second').on('mouseout', function () {
  secondform();
})
$('#first-submit').click(function () {
  $('.form__first').addClass('disable').fadeOut(300);
  $('.form__second').removeClass('disable').fadeIn(300);
});
$('#second-submit').on('click', function () {
  $('.form__second').addClass('disable').fadeOut(300);
  $('.form__third').removeClass('disable').fadeIn(300);
});