import { createSlice } from "@reduxjs/toolkit";
import { discount } from "../../utils/discount";
const cartData = localStorage.getItem("cart");
const cartArray = cartData ? JSON.parse(cartData) : [];
function allItems(data) { // render sản phẩm trong giỏ hàng bằng for loop
  let items = 0;
  for (let i = 0; i < data.length; i++) {
    items += data[i].quantity;
  }
  return items;
}
function calcuateTotal(data) { //tính tổng sản phẩm trong giỏ hàng bằng giá giảm * số lượng sản phẩm
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += discount(data[i].price, data[i].discount) * data[i].quantity;
  }
  return total;
}
const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart: cartArray.length > 0 ? cartArray : [], // nếu giỏ hàng có sản phẩm thì trả lại mảng, không thì trả lại mảng rỗng
    items: cartArray.length > 0 ? allItems(cartArray) : 0, // nếu có sản phẩm thì trả lại mảng, không thì trả lại 0
    total: cartArray.length > 0 ? calcuateTotal(cartArray) : 0, // nếu giỏ hàng có sản phẩm thì trả lại tổng, không thì trả lại 0
  },
  reducers: {
    addCart: (state, { payload }) => { // thêm vào giỏ hàng
      state.cart.push(payload);
      state.items += payload.quantity;
      state.total +=
        discount(payload.price, payload.discount) * payload.quantity;
    },
    incQuantity: (state, { payload }) => { // tằng thêm số lượng
      const find = state.cart.find((item) => item._id === payload);
      if (find) {
        find.quantity += 1;
        state.items += 1;
        state.total += discount(find.price, find.discount);
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decQuantity: (state, { payload }) => { // giảm đi số lượng
      const find = state.cart.find((item) => item._id === payload);
      if (find && find.quantity > 1) {
        find.quantity -= 1;
        state.items -= 1;
        state.total -= discount(find.price, find.discount);
        const index = state.cart.indexOf(find);
        state.cart[index] = find;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeItem: (state, { payload }) => { // xóa sản phẩm
      const find = state.cart.find((item) => item._id === payload);
      if (find) {
        const index = state.cart.indexOf(find);
        state.items -= find.quantity;
        state.total -= discount(find.price, find.discount) * find.quantity;
        state.cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    emptyCart: (state) => { // giỏ hàng trống
      state.cart = [];
      state.items = 0;
      state.total = 0;
    },
  },
});
export const { addCart, incQuantity, decQuantity, removeItem, emptyCart } =
  cartReducer.actions;
export default cartReducer.reducer;
