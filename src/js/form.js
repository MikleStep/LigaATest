export const init = () => {
  var inputsTel = document.querySelectorAll('input[type="tel"]');

  Inputmask({
    "mask": "+380 (999) 999-99-99",
    showMaskOnHover: false
  }).mask(inputsTel);

};

// export const secondValid = () => {
//   var name = $('#form__input--name').val();
//   var tel = $('#form__input--tel').val();
//   if (name.length != 0 && tel.length > 17 && tel.indexOf('_') < 0) {
//     $('#second-submit').prop('disabled', false);
//   } else {
//     $('#second-submit').prop('disabled', true);
//   }
// };

