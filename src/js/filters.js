import catalogItems from "./catalog";
import {
  renderCatalog
} from "./catalog";

var equipmentFilters = [
  {
    name: 'empty',
    title: 'Пустой номер',
    src: 'img/icon/sort_empty.svg',
    params: 'width: 16px; height: 16px'
  },
  {
    name: 'lounger',
    title: 'Лежак',
    src: 'img/icon/sort_lounger.svg',
    params: 'width: 16px; height: 12px'
  },
  {
    name: 'scratching',
    title: 'Когтеточка',
    src: 'img/icon/sort_scratching.svg',
    params: 'width: 14px, height: 16px'
  },
  {
    name: 'gameComplex',
    title: 'Игровой-комплекс',
    src: 'img/icon/sort_game_complex.svg',
    params: 'width: 16px; height: 16px'
  },
  {
    name: 'house',
    title: 'Домик',
    src: 'img/icon/sort_house.svg',
    params: 'width: 16px; height: 16px'
  }
];

var areaFilterWrapper = document.querySelector('.filters__area')

var getAreaFilter = function () {
  for (let i = 0; i < catalogItems.length; i++) {
    areaFilterWrapper.innerHTML += '<li><input name="area[]" class = "filter__chechbox filter__area--item" value = "' + catalogItems[i].area + '" type = "checkbox" id = "area_checkbox' + i + '"><label class = "checkbox-label" for = "area_checkbox' + i + '">' + catalogItems[i].area + ' м2' + '</label></li>'
  }
}

var equipmentFilterWrapper = document.querySelector('.filters__equipment');

var getEquipmentFilter = function () {
  for (let i = 0; i < equipmentFilters.length; i++) {
    equipmentFilterWrapper.innerHTML += '<li><input name="equipment[]" class = "filter__chechbox filter__equipment--item" value = "' + equipmentFilters[i].name + '" type = "checkbox" id = "equipment_checkbox' + i + '"><label class = "checkbox-label" for = "equipment_checkbox' + i + '">' + equipmentFilters[i].title + '</label></li>'
  }
}
var filterSubmit = document.querySelector('.filters__apply');
var filterReset = document.querySelector('.filters__discharge');
let filterCheckboxes = document.getElementsByClassName("filter__chechbox");
let filterWrapper = document.querySelector(".catalog__filter");

filterWrapper.addEventListener('click', function (event) {
  if (event.target.type === 'checkbox') {
    filterReset.style.opacity = '1';
    filterReset.style.zIndex = '10';
  }
}, false);

filterReset.addEventListener('click', function (e) {
  let filterFieldsMin = document.querySelector('.filters__price--field.min');
  let filterFieldsMax = document.querySelector('.filters__price--field.max');
  for (var i = 0; i < filterCheckboxes.length; ++i) {
    filterCheckboxes[i].checked = false;
    filterFieldsMin.value = '';
    filterFieldsMax.value = ''
    filterReset.style.opacity = '0';
    filterReset.style.zIndex = '-1';
  }
});

var form = document.forms.namedItem("fileinfo");
var minPrice;
var maxPrice
var areas;
var equipments;

form.addEventListener('submit', function (ev) {
  var Data = new FormData(form);
  minPrice = Data.get("priceMin")
  maxPrice = Data.get("priceMax")
  areas = Data.getAll("area[]")
  equipments = Data.getAll("equipment[]")
  ev.preventDefault();
  filterCatalog();
}, false);

var filterCatalog = function () {
  var catalogArray = catalogItems
  if (!!minPrice || !!maxPrice) {
    catalogArray = catalogArray.filter(item => (minPrice <= item.price && item.price <= maxPrice));
  }
  if (areas.length >= 1) {
    catalogArray = catalogArray.filter(e => areas.includes(e.area))
  }
  
  if (equipments.length >= 1) {
    catalogArray = catalogArray.filter(e => {
      let filter = true;
      equipments.forEach(element => {
        if (e[element] == false) {
          filter = false;   
        } 
      })
      return filter;
    })
  }
  


  renderCatalog(catalogArray)
  
  console.log(catalogArray);
}

export default equipmentFilters;

export const init = () => {
  getAreaFilter();
  getEquipmentFilter();
}

