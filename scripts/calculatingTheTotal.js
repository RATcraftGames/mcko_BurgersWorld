import {
  initialCardsBurgers,
  initialCardsDrinks,
  initialCardsSalads,
  total,
  order,
  buttonTakeaway,
  buttonInTheHall,
  initialCoupons
} from "./constants.js";

let discount = 1;
let discount2 = 1;
const  discount21 = 167;
const discount22 = 167;
const discount23 = 166;
let nameDiscount = '';

buttonTakeaway.addEventListener('click', () => {
  discount = 0.95;
});

buttonInTheHall.addEventListener('click', () => {
  discount = 1;
});

export function calculatingTheTotal() {
  total.textContent = '0';
  let orderQuantityAll = 0;
  let numberPositions = 0;
  const allOrder = order.querySelectorAll('.order');

  allOrder.forEach((order) => {
    const orderName = order.querySelector('.order__name').textContent;
    const orderQuantity = Number(order.querySelector('.order__quantity').textContent);
    if (orderName === 'Гавайский бургер' ||
      orderName === 'Гавайский салат' ||
      orderName === 'Гавайский смузи') orderQuantityAll += orderQuantity;
    if (orderName === 'Гавайский бургер') numberPositions += 1;
    if (orderName === 'Гавайский салат') numberPositions += 1;
    if (orderName === 'Гавайский смузи') numberPositions += 1;
  });

  const checkCoupon = initialCoupons.find((coupon) => {
    if (checkDiscount(allOrder, coupon.name)) {nameDiscount = coupon.name; return nameDiscount;}
    else {nameDiscount = '';}
  })
  if (checkCoupon) {
    if (checkCoupon.name === 'aloha5500' && numberPositions === 1) {discount2 = 500; nameDiscount = 'aloha5500';}
    if (checkCoupon.name === 'aloha5500' && numberPositions === 2) {discount2 = 250; nameDiscount = 'aloha5500';}
    if (checkCoupon.name === 'aloha5500' && numberPositions === 3) {nameDiscount = 'aloha5500';}
    if (checkCoupon.name === 'aloha10') {discount2 = 0.9; nameDiscount = 'aloha10';}
    if (checkCoupon.name ==='eureka10') {discount2 = 0.9; nameDiscount = 'eureka10';}
    if (checkCoupon.name ==='aj56yt') {discount2 = 0.7; nameDiscount = 'AJ56YT';}
    if (checkCoupon.name === 'lovetea') {discount2 = 0.6; nameDiscount = 'LOVETEA';}
    if (checkCoupon.name === 'cf007') {discount2 = 1; nameDiscount = 'CF007';}
  }
  else {
    nameDiscount = '';
  }

  allOrder.forEach((order) => {
    const orderName = order.querySelector('.order__name').textContent;
    const orderQuantity = order.querySelector('.order__quantity')
    const orderQuantityValue = Number(orderQuantity.textContent);
    crawlingObjectElements(initialCardsBurgers, orderName, orderQuantityValue, orderQuantityAll, numberPositions, discount21);
    crawlingObjectElements(initialCardsDrinks, orderName, orderQuantityValue, orderQuantityAll, numberPositions, discount22);
    crawlingObjectElements(initialCardsSalads, orderName, orderQuantityValue, orderQuantityAll, numberPositions, discount23);
  });
  if (checkCoupon && (allOrder.length > 7)) total.textContent = String(Number(total.textContent) * 0.93);
  else if (allOrder.length > 6 && !checkCoupon) total.textContent = String(Number(total.textContent) * 0.93);

  fullSet(allOrder);

  total.textContent = String(Number(total.textContent).toFixed(2));
}

function crawlingObjectElements(object, orderName, orderQuantity, orderQuantityAll, numberPositions, discount213) {
  object.find((element) => {
    if (nameDiscount === 'aloha5500') {
      if (element.name === orderName &&
        (orderName === 'Гавайский бургер' ||
          orderName === 'Гавайский салат' ||
          orderName === 'Гавайский смузи') &&
        (orderQuantityAll >= 5)
      ) {
        if (numberPositions === 3)
          total.textContent = String(Number(total.textContent) + (element.price * orderQuantity) - discount213);
        else total.textContent = String(Number(total.textContent) + (element.price * orderQuantity) - discount2);
      }
      else if (element.name === orderName)
        total.textContent = String(Number(total.textContent) + (element.price * orderQuantity * discount));
    }
    else if (nameDiscount === 'aloha10') {
      if (element.name === orderName &&
        (orderName === 'Гавайский бургер' ||
          orderName === 'Гавайский салат' ||
          orderName === 'Гавайский смузи')
      ) total.textContent = String(Number(total.textContent) + (element.price * orderQuantity * discount * discount2));
      else if (element.name === orderName)
        total.textContent = String(Number(total.textContent) + (element.price * orderQuantity * discount));
    }
    else if (nameDiscount === 'eureka10') {
      if (element.name === orderName &&
        (orderName === 'Греческий бургер' ||
          orderName === 'Греческий салат' ||
          orderName === 'Греческий кофе')
      ) total.textContent = String(Number(total.textContent) + (element.price * orderQuantity * discount * discount2));
      else if (element.name === orderName)
        total.textContent = String(Number(total.textContent) + (element.price * orderQuantity * discount));
    }
    else if (nameDiscount === 'AJ56YT') {
      if (element.name === orderName &&
        (orderName === 'Гавайский смузи' ||
          orderName === 'Греческий кофе' ||
          orderName === 'Тайский синий чай' ||
          orderName === 'Зелёный чай' ||
          orderName === 'Чёрный чай' ||
          orderName === 'Молочный коктейль' ||
          orderName === 'Лимонад')
      ) total.textContent = String(Number(total.textContent) + (element.price * orderQuantity * discount * discount2));
      else if (element.name === orderName)
        total.textContent = String(Number(total.textContent) + (element.price * orderQuantity * discount));
    }
    else if (nameDiscount === 'LOVETEA') {
      if (element.name === orderName &&
        (orderName === 'Тайский синий чай' ||
          orderName === 'Зелёный чай' ||
          orderName === 'Чёрный чай')
      ) total.textContent = String(Number(total.textContent) + (element.price * orderQuantity * discount * discount2));
      else if (element.name === orderName)
        total.textContent = String(Number(total.textContent) + (element.price * orderQuantity * discount));
    }
    else if (nameDiscount === 'CF007') {
      if (element.name === orderName && orderName === 'Бургер от шефа' && orderQuantity > 2)
        total.textContent = String(Number(total.textContent) + (element.price * (orderQuantity - 1) * discount));
      else if (element.name === orderName)
        total.textContent = String(Number(total.textContent) + (element.price * orderQuantity * discount));
    }
    else if (element.name === orderName)
      total.textContent = String(Number(total.textContent) + (element.price * orderQuantity * discount));
  })
}


function checkDiscount(allOrder, name) {
  return Array.from(allOrder).some((order) => {
    const orderName = order.querySelector('.order__name').textContent;
    if (orderName === name) return true
  });
}

function fullSet(allOrder) {
  const fullSetArrayBurger = [];
  const fullSetArraySalad = [];
  const fullSetArrayDrink = [];
  allOrder.forEach((order) => {
    const orderName = order.querySelector('.order__name').textContent;
    const orderQuantity = order.querySelector('.order__quantity')
    const orderQuantityValue = Number(orderQuantity.textContent);
    if (orderName.toLowerCase().includes('бургер')) {
      initialCardsBurgers.find((obj) => {
        if (obj.name === orderName) fullSetArrayBurger.push({obj, orderQuantityValue});
      })
    }
    if (orderName.toLowerCase().includes('салат')) {
      initialCardsSalads.find((obj) => {
        if (obj.name === orderName) fullSetArraySalad.push({obj, orderQuantityValue});
      })
    }
    if (orderName.toLowerCase().includes('смузи') ||
      orderName.toLowerCase().includes('кофе') ||
      orderName.toLowerCase().includes('чай') ||
      orderName.toLowerCase().includes('коктейль') ||
      orderName.toLowerCase().includes('лимонад')) {
      initialCardsDrinks.find((obj) => {
        if (obj.name === orderName) fullSetArrayDrink.push({obj, orderQuantityValue});
      })
    }
  });

  function sortProducts(a, b) {
    if (a.obj.price > b.obj.price) {
      return 1;
    }
    if (a.obj.price < b.obj.price) {
      return -1;
    }
    return 0;
  }

  fullSetArrayBurger.sort(sortProducts);
  fullSetArraySalad.sort(sortProducts);
  fullSetArrayDrink.sort(sortProducts);

  while (fullSetArrayBurger.length > 0 && fullSetArraySalad.length > 0 && fullSetArrayDrink.length > 0){
    const burgerName =  fullSetArrayBurger[0].obj.name;
    let burgerPrice = 0;
    if (nameDiscount === 'aloha10' && burgerName === 'Гавайский бургер')
      burgerPrice = fullSetArrayBurger[0].obj.price * discount2;
    else if (nameDiscount === 'eureka10' && burgerName === 'Греческий бургер')
      burgerPrice = fullSetArrayBurger[0].obj.price * discount2;
    else burgerPrice = fullSetArrayBurger[0].obj.price
    const burgerQuantity = fullSetArrayBurger[0].orderQuantityValue;


    const saladName =  fullSetArraySalad[0].obj.name;
    let saladPrice = 0;
    if (nameDiscount === 'aloha10' && saladName === 'Гавайский салат')
      saladPrice = fullSetArraySalad[0].obj.price * discount2;
    else if (nameDiscount === 'eureka10' && saladName === 'Греческий салат')
      saladPrice = fullSetArraySalad[0].obj.price * discount2;
    else saladPrice = fullSetArraySalad[0].obj.price;
    const saladQuantity = fullSetArraySalad[0].orderQuantityValue;

    const drinkName =  fullSetArrayDrink[0].obj.name;
    let drinkPrice = 0;
    if (nameDiscount === 'aloha10' && drinkName === 'Гавайский смузи')
      drinkPrice = fullSetArrayDrink[0].obj.price * discount2;
    else if (nameDiscount === 'eureka10' && drinkName === 'Греческий кофе')
      drinkPrice = fullSetArrayDrink[0].obj.price * discount2;
    else if (nameDiscount === 'AJ56YT')
      drinkPrice = fullSetArrayDrink[0].obj.price * discount2;
    else if (nameDiscount === 'LOVETEA' && (drinkName === 'Тайский синий чай' ||
      drinkName === 'Зелёный чай' ||
      drinkName === 'Чёрный чай'))
      drinkPrice = fullSetArrayDrink[0].obj.price * discount2;
    else drinkPrice = fullSetArrayDrink[0].obj.price;
    const drinkQuantity = fullSetArrayDrink[0].orderQuantityValue;

    const sum = (burgerPrice + saladPrice + drinkPrice) * discount;

    total.textContent = String(Number(total.textContent) - sum  + sum * 0.85);
    if (burgerQuantity > 1) fullSetArrayBurger[0].orderQuantityValue -= 1;
    else fullSetArrayBurger.shift();
    if (saladQuantity > 1) fullSetArraySalad[0].orderQuantityValue -= 1;
    else fullSetArraySalad.shift();
    if (drinkQuantity > 1) fullSetArrayDrink[0].orderQuantityValue -= 1;
    else fullSetArrayDrink.shift();
  }
}
