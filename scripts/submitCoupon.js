import {homeScreen, initialCoupons, order} from "./constants.js";
import {OrderCoupon} from "./Order.js";
import {noCoupon} from './couponReadTheDescription.js'

export function submitCoupon() {
  const couponInput = homeScreen.querySelector('.coupon__input');
  const couponInputMessageP0 = homeScreen.querySelector('.coupon__input-error_p0');
  const checkingCoupon = initialCoupons.find((coupon) => {
    if (couponInput.value.toLowerCase() === coupon.name) return true;
  });

  if (checkingCoupon) {
    const allOrder = order.querySelectorAll('.order');
    const couponDouble = Array.from(allOrder).some((order) => {
      const orderName = order.querySelector('.order__name').textContent;
      return initialCoupons.some((coupon) => {
        if (coupon.name === orderName) return true;
      });
    });

    if (!couponDouble) {
      const coupon = new OrderCoupon(checkingCoupon, '.card-order-coupon');
      const cardElement = coupon.generateCard();
      order.prepend(cardElement);
      couponInput.classList.remove('coupon__input_type_error');
      couponInputMessageP0.classList.remove('coupon__input-error_active');
      for (let i = 0; i < 8; i++) {
        const p = homeScreen.querySelector(`.coupon__input-error_p${i}`);
        p.textContent = '';
        p.classList.toggle('coupon__input_type_message');
      }
    }
    else {
      noCoupon(`Возможно применить только один купон в заказе. Для 
      применения этого купона удалите старый купон из списка заказа.`);
    }
  }
  else {
    noCoupon('Извините, такого купона нет.');
  }
}
