
import {init as filterInit} from "./filters";


var sortbutton = document.querySelector('.catalog__sort--button');
var sortModal = document.querySelector('.catalog__sort');
sortbutton.addEventListener('click', function () {
  sortModal.classList.toggle('active');
})

filterInit()