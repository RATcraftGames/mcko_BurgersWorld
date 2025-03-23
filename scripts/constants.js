const homeScreen = document.querySelector('.screen-home');
const order = homeScreen.querySelector('.screen-home__order-content');
const total = homeScreen.querySelector('.screen-home__footer-total-price');
const intermediateScreen = document.querySelector('.screen-intermediate');
const buttonTakeaway = intermediateScreen.querySelector('.screen-intermediate__button-takeaway');
const buttonInTheHall = intermediateScreen.querySelector('.screen-intermediate__button-in-the-hall');
const orderArrowTop = homeScreen.querySelector('.screen-home__order-arrow_top');
const orderArrowBottom = homeScreen.querySelector('.screen-home__order-arrow_bottom');

const initialCardsBurgers = [
  {
    name: 'Гавайский бургер',
    price: 225
  },
  {
    name: 'Греческий бургер',
    price: 280
  },
  {
    name: 'Тайский бургер',
    price: 250
  },
  {
    name: 'Бургер от шефа',
    price: 350
  },
  {
    name: 'Чизбургер',
    price: 210
  },
  {
    name: 'Вегетарианский бургер',
    price: 185
  }
]
const initialCardsSalads = [
  {
    name: 'Гавайский салат',
    price: 220
  },
  {
    name: 'Греческий салат',
    price: 165
  },
  {
    name: 'Тайский салат',
    price: 180
  },
  {
    name: 'Салат «Цезарь»',
    price: 290
  },
  {
    name: 'Овощной салат',
    price: 150
  },
]

const initialCardsDrinks = [
  {
    name: 'Гавайский смузи',
    price: 190
  },
  {
    name: 'Греческий кофе',
    price: 105
  },
  {
    name: 'Тайский синий чай',
    price: 140
  },
  {
    name: 'Зелёный чай',
    price: 45
  },
  {
    name: 'Чёрный чай',
    price: 45
  },
  {
    name: 'Молочный коктейль',
    price: 130
  },
  {
    name: 'Лимонад',
    price: 80
  }
]

const initialCoupons = [
  {
    name: 'aloha5500',
    description: 'Купон aloha5500 даёт скидку 500 рублей\n' +
      'на заказ, содержащий не менее 5 блюд из\n' +
      'следующего списка:\n' +
      '- гавайский бургер,\n' +
      '- гавайский салат,\n' +
      '- гавайский смузи.\n\n' +
      'Возможно применить только один купон в заказе. При расчёте суммы заказа сначала применяется купон, а затем — акции.',
    quantity: 1
  },
  {
    name: 'aloha10',
    description: 'Купон aloha10 даёт скидку 10%\n' +
      'на все блюда из следующего списка:\n' +
      '- гавайский бургер,\n' +
      '- гавайский салат,\n' +
      '- гавайский смузи.\n\n\n' +
      'Возможно применить только один купон в заказе. При расчёте суммы заказа сначала применяется купон, а затем — акции.',
    quantity: 1
  },
  {
    name: 'eureka10',
    description: 'Купон eureka10 даёт скидку 10%\n' +
      'на все блюда из следующего списка:\n' +
      '- греческий бургер,\n' +
      '- греческий салат,\n' +
      '- греческий кофе.\n\n\n' +
      'Возможно применить только один купон в заказе. При расчёте суммы заказа сначала применяется купон, а затем — акции.',
    quantity: 1
  },
  {
    name: 'aj56yt',
    description: 'Купон aj56yt даёт скидку 30 % на все напитки.\n' +
      '\n\n\n\n\n\n' +
      'Возможно применить только один купон в заказе. При расчёте суммы заказа сначала применяется купон, а затем — акции.',
    quantity: 1
  },
  {
    name: 'lovetea',
    description: 'Купон lovetea даёт скидку 40%\n' +
      'на все блюда из следующего списка\n' +
      '- тайский синий чай,\n' +
      '- зелёный чай,\n' +
      '- чёрный чай.\n\n\n' +
      'Возможно применить только один купон в заказе. При расчёте суммы заказа сначала применяется купон, а затем — акции.',
    quantity: 1
  },
  {
    name: 'cf007',
    description: 'Купон cf007 при заказе 3 и более\n' +
      'бургеров от шефа делает скидку 100%\n' +
      'на один из этих бургеров.\n' +
      '\n\n\n\n' +
      'Возможно применить только один купон в заказе. При расчёте суммы заказа сначала применяется купон, а затем — акции.',
    quantity: 1
  }
]

export {
  initialCardsBurgers,
  initialCardsSalads,
  initialCardsDrinks,
  initialCoupons,
  homeScreen,
  total,
  order,
  intermediateScreen,
  buttonTakeaway,
  buttonInTheHall,
  orderArrowTop,
  orderArrowBottom
};
