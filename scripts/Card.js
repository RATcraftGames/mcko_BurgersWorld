import {OrderProduct} from './Order.js';
import {calculatingTheTotal} from './calculatingTheTotal.js';
import {stateOfTheArrows} from './stateOfTheArrows.js';
import {order as ord} from './constants.js';

export class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._price = data.price;
  }

  _getTemplate() {
    this._element = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.product')
      .cloneNode(true);
  }

  _setEventListeners() {
    const elementNumberMenu = this._element.querySelector('.product__change');
    this._element.querySelector('.product__button').addEventListener('click', () => {
      this._handleTheAddToOrderButton();
    });
    this._element.querySelector('.product__button-change_plus').addEventListener('click', () => {
      this._clickingOnThePlusSign(elementNumberMenu);
    });
    this._element.querySelector('.product__button-change_minus').addEventListener('click', () => {
      this._clickingOnTheMinusSign(elementNumberMenu);
    });
  }

  _handleTheAddToOrderButton() {
    this._element.classList.add('product_add-to-order');
    this._element.querySelector('.product__button_add-to-order').classList.add('product__button_display_none');
    this._element.querySelector('.product__button_added-to-order').classList.remove('product__button_display_none');
    const name = this._name;
    const quantity = 1;
    const order = new OrderProduct({name, quantity}, '.card-order');
    const cardElement = order.generateCard();
    ord.prepend(cardElement);
    stateOfTheArrows();
    calculatingTheTotal();
  }

  _numberMenu() {return Number(this._element.querySelector('.product__change').textContent);}

  _clickingOnThePlusSign(elementNumberMenu) {
    let numberMenu = this._numberMenu();
    if (numberMenu < 9) {
      numberMenu += 1;
      elementNumberMenu.textContent = numberMenu;
      const orderNameAll = document.querySelectorAll('.order__name');
      orderNameAll.forEach((orderName) => {
        if (orderName.textContent === this._name) {
          const orderElement = orderName.closest('.order__text').querySelector('.order__quantity');
          let numberOrder = Number(orderElement.textContent);
          if (numberOrder < 9) {
            numberOrder += 1;
            orderElement.textContent = String(numberOrder);
          }
        }
      });
    }
    calculatingTheTotal();
  }

  _clickingOnTheMinusSign(elementNumberMenu) {
    let numberMenu = this._numberMenu();
    if (numberMenu > 0) {
      numberMenu -= 1;
      elementNumberMenu.textContent = numberMenu;
      const orderNameAll = document.querySelectorAll('.order__name');
      orderNameAll.forEach((orderName) => {
        if (orderName.textContent === this._name) {
          const orderElement = orderName.closest('.order__text').querySelector('.order__quantity');
          let numberOrder = Number(orderElement.textContent);
          if (numberOrder > 1) {
            numberOrder -= 1;
            orderElement.textContent = String(numberOrder);
          }
        }
      });
    }
    if (numberMenu === 0) {
      const allOrderText = ord.querySelectorAll('.order__name');
      const orderElement = Array.from(allOrderText).find((orderText) => {
        if (orderText.textContent === this._name) return true;
      })
      orderElement.closest('.order').remove();
      this._element.classList.remove('product_add-to-order');
      this._element.querySelector('.product__button_added-to-order').classList.add('product__button_display_none');
      this._element.querySelector('.product__button_add-to-order').classList.remove('product__button_display_none');
      this._element.querySelector('.product__change').textContent = '1';
    }
    calculatingTheTotal();
  }

  generateCard() {
    this._getTemplate();

    this._element.querySelector('.product__text_name').textContent = this._name;
    this._element.querySelector('.product__price').textContent = this._price;

    this._setEventListeners();

    return this._element;
  }
}
