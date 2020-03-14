export const init = () => {
  var inputsTel = document.querySelectorAll('input[type="tel"]');

  Inputmask({
    "mask": "+7 (999) 999-99-99",
    showMaskOnHover: false
  }).mask(inputsTel);

};
export const firstValid = () => {
  var brand = $('#form__input--brand').val();
  var sphere = $('#form__input--sphere').val();
  

  if (brand.length != 0 && sphere.length != 0) {
    $('#first-submit').prop('disabled', false);
  } else {
    $('#first-submit').prop('disabled', true);
  }
};

export const secondValid = () => {
  var name = $('#form__input--name').val();
  var tel = $('#form__input--tel').val();
  if (name.length != 0 && tel.length > 17 && tel.indexOf('_') < 0) {
    $('#second-submit').prop('disabled', false);
  } else {
    $('#second-submit').prop('disabled', true);
  }
};
