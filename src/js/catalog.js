let equipmentFilters = [{
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

let catalogItems = [
  {
    id: 0,
    src: '../img/catalog/catalog-img-1.jpg',
    srcset: '../img/catalog/catalog-img-1.jpg, ../img/catalog/catalog-img-1@2x.jpg 2x, ../img/catalog/catalog-img-1@4x.jpg 4x',
    title: 'Эконом',
    size: false,
    area: '0.63',
    price: 100,
    empty: true,
    lounger: false,
    scratching: false,
    gameComplex: false,
    house: false,
  },
  {
    id: 1,
    src: '../img/catalog/catalog-img-2.jpg',
    srcset: '../img/catalog/catalog-img-2.jpg, ../img/catalog/catalog-img-2@2x.jpg 2x, ../img/catalog/catalog-img-2@4x.jpg 4x',
    title: 'Эконом плюс',
    size: '90х100х180',
    area: '0.90',
    price: 200,
    empty: false,
    lounger: true,
    scratching: true,
    gameComplex: false,
    house: false,
  },
  {
    id: 2,
    src: '../img/catalog/catalog-img-3.jpg',
    srcset: '../img/catalog/catalog-img-3.jpg, ../img/catalog/catalog-img-3@2x.jpg 2x, ../img/catalog/catalog-img-3@4x.jpg 4x',
    title: 'Комфорт',
    size: '100х125х180',
    area: '1.13',
    price: 250,
    empty: false,
    lounger: true,
    scratching: true,
    gameComplex: true,
    house: false,
  },
  {
    id: 3,
    src: '../img/catalog/catalog-img-4.jpg',
    srcset: '../img/catalog/catalog-img-4.jpg, ../img/catalog/catalog-img-4@2x.jpg 2x, ../img/catalog/catalog-img-4@4x.jpg 4x',
    title: 'Сьют',
    size: '125х125х180',
    area: '1.56',
    price: 350,
    empty: false,
    lounger: true,
    scratching: true,
    gameComplex: true,
    house: false,
  },
  {
    id: 4,
    src: '../img/catalog/catalog-img-5.jpg',
    srcset: '../img/catalog/catalog-img-5.jpg, ../img/catalog/catalog-img-5@2x.jpg 2x, ../img/catalog/catalog-img-5@4x.jpg 4x',
    title: 'Люкс',
    size: '160х160х180',
    area: '2.56',
    price: 500,
    empty: false,
    lounger: true,
    scratching: true,
    gameComplex: true,
    house: true,
  },
  {
    id: 5,
    src: '../img/catalog/catalog-img-6.jpg',
    srcset: '../img/catalog/catalog-img-6.jpg, ../img/catalog/catalog-img-6@2x.jpg 2x, ../img/catalog/catalog-img-6@4x.jpg 4x',
    title: 'Супер-Люкс',
    size: '180х160х180',
    area: '2.88',
    price: 600,
    empty: false,
    lounger: true,
    scratching: true,
    gameComplex: true,
    house: true,
  }
];

let catalog = document.querySelector('.catalog__wrapper');
let cardTemplate = document.querySelector('#catalog__template').content.querySelector('.catalog__template--card')

export function renderCard(item) {
  let template = cardTemplate.cloneNode(true);
  let card = template.querySelector('.card');
  let img = card.querySelector('.card__img');
  let title = card.querySelector('.card__title');
  let size = card.querySelector('.card__param.size');
  let area = card.querySelector('.card__param.area');
  let equipment = card.querySelector('.card__param.equipment');
  let price = card.querySelector('.card__param--price');
  

  img.setAttribute('src', item.src);
  img.setAttribute('srcset', item.srcset);
  title.textContent = item.title;
  if (item.size != false) {
    size.textContent = 'Размеры (ШхГхВ) - '
    item.size + ' см';
  }
  area.textContent = 'Площадь - ' + item.area + ' м2';
  price.textContent = item.price + '₽';
  if (item.empty === true) {
    equipment.innerHTML += '<img src="' + equipmentFilters[0].src + '" style="' + equipmentFilters[0].params + '" alt="' + equipmentFilters[0].title + '">'
  }
  if (item.lounger === true) {
    equipment.innerHTML += '<img src="' + equipmentFilters[1].src + '" style="' + equipmentFilters[1].params + '" alt="' + equipmentFilters[1].title + '">'
  }
  if (item.scratching === true) {
    equipment.innerHTML += '<img src="' + equipmentFilters[2].src + '" style="' + equipmentFilters[2].params + '" alt="' + equipmentFilters[2].title + '">'
  }
  if (item.gameComplex === true) {
    equipment.innerHTML += '<img src="' + equipmentFilters[3].src + '" style="' + equipmentFilters[3].params + '" alt="' + equipmentFilters[3].title + '">'
  }
  if (item.house === true) {
    equipment.innerHTML += '<img src="' + equipmentFilters[4].src + '" style="' + equipmentFilters[4].params + '" alt="' + equipmentFilters[4].title + '">'
  }
  template.dataset.price = item.price
  template.dataset.area = item.area

  return template
}

export function renderCatalog(array) {
  catalog.innerHTML = '';
  for (var i = 0; i < array.length; i++) {
    catalog.appendChild(renderCard(array[i]));
  }
}
renderCatalog(catalogItems);

var filter = document.querySelector('catalog__filter');
var mixer = mixitup(catalog, {
  selectors: {
    target: '.catalog__template--card' 
  },
  multifilter: {
    enable: true, // enable the multifilter extension for the mixer
    parseOn: "submit" // delay the filter operation until the user has made their selection and is ready to search
  },
  // controls: {
  //   toggleDefault: "all", // resetting all checkboxes in each category brings back all sessions
  //   toggleLogic: "or" // ability to combine results when ANY combination matches across all categories
  // },
  // data: {
  //   uidKey: 'id'
  // },
  // load: {
  //   dataset: items
  // },
  animation: {
    effects: 'fade scale(0.5)',
    duration: 400 
  }
});

export default catalogItems;
export var catalogArray;
