import {homeScreen, initialCoupons} from "./constants.js";

export function couponReadTheDescription() {
    const couponInput = homeScreen.querySelector('.coupon__input');
    const couponInputMessageP0 = homeScreen.querySelector('.coupon__input-error_p0');
    const checkingCoupon = initialCoupons.find((coupon) => {
      if (couponInput.value.toLowerCase() === coupon.name) return true;
    });
    if (checkingCoupon) {
      const couponDescriptionAll = checkingCoupon.description.split('\n');
      couponInput.classList.remove('coupon__input_type_error');
      couponInputMessageP0.classList.remove('coupon__input-error_active');
      for (let i = 0; i < 8; i++) {
        const p = homeScreen.querySelector(`.coupon__input-error_p${i}`);
        p.textContent = couponDescriptionAll[i];
        p.classList.toggle('coupon__input_type_message');
      }
    }
    else {
      noCoupon('Извините, такого купона нет.');
  }
}

export function noCoupon(text) {
  const couponInput = homeScreen.querySelector('.coupon__input');
  const couponInputMessageP0 = homeScreen.querySelector('.coupon__input-error_p0');
  couponInputMessageP0.textContent = text;
  couponInput.classList.add('coupon__input_type_error');
  couponInputMessageP0.classList.add('coupon__input-error_active');
  couponInputMessageP0.classList.remove('coupon__input_type_message');
  for (let i = 1; i < 8; i++) {
    const p = homeScreen.querySelector(`.coupon__input-error_p${i}`);
    p.textContent = '';
    p.classList.remove('coupon__input_type_message');
  }
}

