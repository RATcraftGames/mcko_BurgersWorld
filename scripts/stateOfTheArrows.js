import {order as ord, orderArrowBottom, orderArrowTop} from "./constants.js";

export function stateOfTheArrows() {
  const allOrder = ord.querySelectorAll('.order');
  if (allOrder.length > 4) {
    orderArrowBottom.classList.remove('screen-home__order-arrow_inactive');
    orderArrowBottom.disabled = false;
    orderArrowTop.classList.add('screen-home__order-arrow_inactive');
    orderArrowTop.disabled = true;
    for (let i = 0; i < allOrder.length; i++) {
      if (i < 4) {
        if (Array.from(allOrder)[i].classList.contains('order_display_none'))
          Array.from(allOrder)[i].classList.remove('order_display_none');
      }
      if (i >= 4) {
        if (!Array.from(allOrder)[i].classList.contains('order_display_none'))
          Array.from(allOrder)[i].classList.add('order_display_none');
      }
    }
  }
  if (allOrder.length === 4) {
    orderArrowBottom.classList.add('screen-home__order-arrow_inactive');
    orderArrowBottom.disabled = true;
    orderArrowTop.classList.add('screen-home__order-arrow_inactive');
    orderArrowTop.disabled = true;
    for (let i = 0; i < 4; i++) {
      if (Array.from(allOrder)[i].classList.contains('order_display_none'))
        Array.from(allOrder)[i].classList.remove('order_display_none');
    }
  }
}
