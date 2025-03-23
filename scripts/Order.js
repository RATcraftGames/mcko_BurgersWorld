import {calculatingTheTotal} from './calculatingTheTotal.js';
import {stateOfTheArrows} from "./stateOfTheArrows.js";

class Order {
  constructor(cardSelector) {
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    this._element = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.order')
      .cloneNode(true);
  }
}

export class OrderProduct extends Order {
  constructor(data, cardSelector) {
    super(cardSelector);
    this._name = data.name;
    this._quantity = data.quantity;
  }

  _setEventListeners() {
    this._element.querySelector('.order__delete-button').addEventListener('click', () => {
      this._deleteOrder();
    });
  }

  _deleteOrder() {
    const allProducts = document.querySelectorAll('.product__text_name');
    const productText = Array.from(allProducts).find((product) => {
      if (product.textContent === this._name){
        return true;
      }
    });
    const product = productText.closest('.product');
    product.classList.remove('product_add-to-order');
    product.querySelector('.product__button_added-to-order').classList.add('product__button_display_none');
    product.querySelector('.product__button_add-to-order').classList.remove('product__button_display_none');
    product.querySelector('.product__change').textContent = '1';
    this._element.querySelector('.order__delete-button').closest('.order').remove();
    stateOfTheArrows();
    calculatingTheTotal();
  }

  generateCard() {
    super._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.order__name').textContent = this._name;
    this._element.querySelector('.order__quantity').textContent = this._quantity;

    return this._element;
  }
}


export class OrderCoupon extends Order{
  constructor(data, cardSelector) {
    super(cardSelector);
    this._name = data.name;
    this._quantity = data.quantity;
  }

  _setEventListeners() {
    this._element.querySelector('.order__delete-button').addEventListener('click', () => {
      this._deleteOrder();
    });
  }

  _deleteOrder() {
    this._element.querySelector('.order__delete-button').closest('.order').remove();
    stateOfTheArrows();
    calculatingTheTotal();
  }

  generateCard() {
    super._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.order__name').textContent = this._name;
    this._element.querySelector('.order__quantity').textContent = this._quantity;
    return this._element;
  }
}
