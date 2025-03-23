import {
  initialCardsBurgers,
  initialCardsSalads,
  initialCardsDrinks,
  homeScreen,
  total,
  order,
  intermediateScreen,
  orderArrowTop,
  orderArrowBottom,
  initialCoupons as inc
} from './constants.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {couponReadTheDescription} from './couponReadTheDescription.js'
import {OrderCoupon} from './Order.js';
import {submitCoupon} from "./submitCoupon.js";
import {calculatingTheTotal} from './calculatingTheTotal.js';

const startScreen = document.querySelector('.screen-start');
const intermediateScreenButtons = intermediateScreen.querySelectorAll('.screen-intermediate__button');
const cancelButton = homeScreen.querySelector('.screen-home__header-button');
const contentButtons = homeScreen.querySelectorAll('.screen-home__content-buttons');
const contentMenu = homeScreen.querySelectorAll('.screen-home__content-menu');

const formClasses = {
  formSelector: '.coupon',
  inputSelector: '.coupon__input',
  submitButtonSelector: '.coupon__button-submit',
  descriptionButtonSelector: '.coupon__button-description',
  inactiveButtonClass: 'coupon__button-submit_inactive',
  inputErrorClass: 'coupon__input_type_error',
  errorClass: 'coupon__input-error_active'
}

function openScreen(screen) {
  screen.classList.add('screen_opened');
}

function closeScreen(screen) {
  screen.classList.remove('screen_opened');
}

function handleClickOnScreen(evt) {
  if (evt.currentTarget.classList.contains('screen')) {
    closeScreen(evt.currentTarget);
  }
}

function addClassActive(button) {
  contentButtons.forEach((button) => {
    if (button.classList.contains('screen-home__content-buttons_active'))
      return button.classList.remove('screen-home__content-buttons_active');
  })
  button.classList.add('screen-home__content-buttons_active');
  contentMenu.forEach((screen) => {
    if (screen.classList.contains('screen-home__content-menu_display_flex'))
      return screen.classList.remove('screen-home__content-menu_display_flex');
  })
  homeScreen.querySelector(`.screen-home__${button.id}`).classList.add('screen-home__content-menu_display_flex');
}

function cancelFunction() {
  closeScreen(homeScreen);
  addClassActive(contentButtons[0]);
  deleteCard();
  clearTotal();
}

function initialCards(cards, screenHomeElement) {
  const screenHomeBurgers = document.querySelector(screenHomeElement);
  cards.forEach((item) => {
    const card = new Card(item, '.card-product');
    const cardElement = card.generateCard();
    screenHomeBurgers.append(cardElement);
  });
}

function initialCoupons() {
  const screenHomeCoupons = document.querySelector('.screen-home__coupons');
  const cardCoupon = document.querySelector('.card-coupon').content.querySelector('.coupon').cloneNode(true);
  screenHomeCoupons.append(cardCoupon);
  const formList = Array.from(document.querySelectorAll(formClasses.formSelector));
  formList.forEach((item) => {
    const form = new FormValidator(formClasses, item);
    form.enableValidation();
  });
  const couponButtonDescription = homeScreen.querySelector('.coupon__button-description');
  couponButtonDescription.addEventListener('click', couponReadTheDescription);
  const formSubmitCoupon = document.forms.coupon;
  formSubmitCoupon.addEventListener('submit', submitFormCoupon);
}

function deleteCard() {
  const products = homeScreen.querySelectorAll('.product');
  const coupon = homeScreen.querySelector('.coupon');
  const orders = homeScreen.querySelectorAll('.order');
  products.forEach((product) => {
    product.remove();
  })
  coupon.remove();
  orders.forEach((order) => {
    order.remove();
  })
}

function clearTotal() {
  total.textContent = '0';
}

function scrollDown() {
  const allOrder = order.querySelectorAll('.order');
  const key = searchKey(allOrder);

  Array.from(allOrder)[key].classList.add('order_display_none');
  Array.from(allOrder)[key + 4].classList.remove('order_display_none');
  if (orderArrowTop.classList.contains('screen-home__order-arrow_inactive')) {
    orderArrowTop.classList.remove('screen-home__order-arrow_inactive');
    orderArrowTop.disabled = false;
  }
  if (!Array.from(allOrder)[key + 5]) {
    orderArrowBottom.classList.add('screen-home__order-arrow_inactive');
    orderArrowBottom.disabled = true;
  }
}

function scrollUp() {
  const allOrder = order.querySelectorAll('.order');
  const key = searchKey(allOrder);

  Array.from(allOrder)[key + 3].classList.add('order_display_none');
  Array.from(allOrder)[key - 1].classList.remove('order_display_none');
  if (orderArrowBottom.classList.contains('screen-home__order-arrow_inactive')){
    orderArrowBottom.classList.remove('screen-home__order-arrow_inactive');
    orderArrowBottom.disabled = false;
  }
  if (!Array.from(allOrder)[key - 2]) {
    orderArrowTop.classList.add('screen-home__order-arrow_inactive');
    orderArrowTop.disabled = true;
  }
}

function searchKey(allOrder) {
  for (let i=0; i<allOrder.length; i++) {
    if (!Array.from(allOrder)[i].classList.contains('order_display_none')) {
      return  i;
    }
  }
}

function submitFormCoupon(evt){
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  submitCoupon();
  calculatingTheTotal();
}

startScreen.addEventListener('click', (evt) => {
  handleClickOnScreen(evt);
  openScreen(intermediateScreen);
});
intermediateScreenButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closeScreen(intermediateScreen);
    openScreen(homeScreen);
    initialCards(initialCardsBurgers, '.screen-home__burgers');
    initialCards(initialCardsSalads, '.screen-home__salads');
    initialCards(initialCardsDrinks, '.screen-home__drinks');
    initialCoupons();
  })
});

cancelButton.addEventListener('click', () => {
  cancelFunction();
  openScreen(startScreen);
});

contentButtons.forEach((button) => {
  button.addEventListener('click', () => {
    addClassActive(button);
  });
});

orderArrowBottom.addEventListener('click', scrollDown);
orderArrowTop.addEventListener('click', scrollUp);
