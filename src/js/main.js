import { init as popupInit} from './popup.js';
import { init as formInit } from './form.js';
import { firstValid as firstform } from './form.js';
import { secondValid as secondform} from './form.js';

$(document).ready(function() {
  popupInit();
  formInit();
});
$('.form__first').on('keyup', function () {
  firstform();
})
$('.form__second').on('keyup', function () {
  secondform();
})
$('#first-submit').click(function () {
  $('.form__first').fadeOut(300);
  $('.form__second').delay(300).fadeIn(300);
});
$('#second-submit').on('click', function () {
  $('.form__second').fadeOut(300);
  $('.form__third').delay(300).fadeIn(300);
});